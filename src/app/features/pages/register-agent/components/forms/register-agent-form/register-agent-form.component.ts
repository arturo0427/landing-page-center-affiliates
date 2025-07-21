import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'register-agent-form',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './register-agent-form.component.html',
  styleUrl: './register-agent-form.component.scss',
})
export class RegisterAgentFormComponent {
  public hidePassword: boolean = true;
  public registerAgentForm!: FormGroup;

  @Output() formReady = new EventEmitter<FormGroup>();

  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.registerAgentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      referralCode: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      email: [''],
    });

    this.formReady.emit(this.registerAgentForm);
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
