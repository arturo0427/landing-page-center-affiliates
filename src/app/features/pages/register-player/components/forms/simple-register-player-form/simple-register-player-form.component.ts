import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'simple-register-player-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './simple-register-player-form.component.html',
})
export class SimpleRegisterPlayerFormComponent implements OnInit {
  public hidePassword: boolean = true;
  public simpleRegisterPlayerForm!: FormGroup;

  @Output() formReady = new EventEmitter<FormGroup>();

  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.simpleRegisterPlayerForm = this.formBuilder.group({
      phone: ['', Validators.required],
      password: ['', Validators.required],
      referralCode: [''],
    });

    this.formReady.emit(this.simpleRegisterPlayerForm);
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
