import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'complete-register-player-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './complete-register-player-form.component.html',
})
export class CompleteRegisterPlayerFormComponent implements OnInit {
  public completeRegisterPlayerForm!: FormGroup;
  public hidePassword = true;

  @Output() formReady = new EventEmitter<FormGroup>();
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.completeRegisterPlayerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dni: ['', Validators.required],
      email: [''],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      referralCode: ['', Validators.required],
    });

    this.formReady.emit(this.completeRegisterPlayerForm);
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
