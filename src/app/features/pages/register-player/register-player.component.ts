// import { CommonModule } from '@angular/common';
// import { Component, inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { SimpleRegisterPlayerFormComponent } from './components/forms/simple-register-player-form/simple-register-player-form.component';
// import { CompleteRegisterPlayerFormComponent } from './components/forms/complete-register-player-form/complete-register-player-form.component';

// @Component({
//   selector: 'app-register-player',
//   imports: [
//     //Modules
//     CommonModule,

//     //Components
//     SimpleRegisterPlayerFormComponent,
//     CompleteRegisterPlayerFormComponent,
//   ],
//   templateUrl: './register-player.component.html',
// })
// export class RegisterPlayerComponent implements OnInit {
//   ngOnInit(): void {}
// }

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
  activeTab = signal<'simple' | 'complete'>('simple');
  @ViewChild('formWrapper', { static: false }) formWrapperRef!: ElementRef;
  @ViewChild('tabIndicator', { static: false }) tabIndicatorRef!: ElementRef;

  ngAfterViewInit() {
    gsap.fromTo(
      this.formWrapperRef.nativeElement,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
  }

  switchTab(tab: 'simple' | 'complete') {
    const wrapper = this.formWrapperRef.nativeElement;

    gsap.to(wrapper, {
      opacity: 0,
      x: this.activeTab() === 'simple' ? -30 : 30,
      duration: 0.2,
      ease: 'power2.inOut',
      onComplete: () => {
        this.activeTab.set(tab);

        gsap.fromTo(
          wrapper,
          { opacity: 0, x: tab === 'simple' ? 30 : -30 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
        );

        gsap.fromTo(
          wrapper.querySelectorAll('.form-field'),
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, delay: 0.1 }
        );

        gsap.to(this.tabIndicatorRef.nativeElement, {
          x: tab === 'simple' ? '0%' : '100%',
          duration: 0.4,
          ease: 'power3.out',
        });
      },
    });
  }
}
