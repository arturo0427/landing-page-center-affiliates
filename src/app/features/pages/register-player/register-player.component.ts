import {
  Component,
  inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { SimpleRegisterPlayerFormComponent } from './components/forms/simple-register-player-form/simple-register-player-form.component';
import { CompleteRegisterPlayerFormComponent } from './components/forms/complete-register-player-form/complete-register-player-form.component';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-player',
  standalone: true,
  imports: [
    CommonModule,
    SimpleRegisterPlayerFormComponent,
    CompleteRegisterPlayerFormComponent,
  ],
  templateUrl: './register-player.component.html',
})
export class RegisterPlayerComponent implements AfterViewInit {
  public isFormValid: boolean = false;
  private formStatusSub?: Subscription;

  public currentForm: FormGroup | undefined = undefined;

  public activeTab = signal<'simple' | 'complete'>('simple');
  public visibleTab = signal<'simple' | 'complete'>('simple');
  @ViewChild('formWrapper', { static: false }) formWrapperRef!: ElementRef;
  @ViewChild('tabIndicator', { static: false }) tabIndicatorRef!: ElementRef;

  private router = inject(Router);

  ngAfterViewInit() {
    gsap.fromTo(
      this.formWrapperRef.nativeElement,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
  }

  onFormReady(form: FormGroup) {
    this.currentForm = form;
    this.isFormValid = form.valid;

    this.formStatusSub?.unsubscribe();

    this.formStatusSub = form.statusChanges.subscribe(() => {
      this.isFormValid = form.valid;
    });
  }

  onSubmit() {
    if (!this.currentForm) return;
    if (this.currentForm.valid) {
      const formData = this.currentForm.value;
      console.log('Enviar datos al backend:', formData);
    } else {
      this.currentForm.markAllAsTouched();
    }
  }

  onMoreInfo() {
    this.router.navigate(['/']);
  }

  switchTab(tab: 'simple' | 'complete') {
    if (tab === this.activeTab()) return;
    this.activeTab.set(tab);
    this.currentForm = undefined;
    this.isFormValid = false;

    const wrapper = this.formWrapperRef.nativeElement;

    gsap.to(wrapper, {
      opacity: 0,
      x: this.activeTab() === 'simple' ? -30 : 30,
      duration: 0.2,
      ease: 'power2.inOut',
      onComplete: () => {
        this.activeTab.set(tab);

        this.visibleTab.set(tab);
        this.currentForm = undefined;
        this.isFormValid = false;

        requestAnimationFrame(() => {
          const newWrapper = this.formWrapperRef.nativeElement;

          gsap.fromTo(
            newWrapper,
            { opacity: 0, x: tab === 'simple' ? 30 : -30 },
            { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
          );

          gsap.fromTo(
            newWrapper.querySelectorAll('.form-field, .form-actions'),
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, delay: 0.1 }
          );

          gsap.to(this.tabIndicatorRef.nativeElement, {
            x: tab === 'simple' ? '0%' : '100%',
            duration: 0.4,
            ease: 'power3.out',
          });
        });
      },
    });
  }

  ngOnDestroy(): void {
    this.formStatusSub?.unsubscribe();
  }
}
