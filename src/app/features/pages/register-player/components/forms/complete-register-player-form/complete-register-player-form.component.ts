import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'complete-register-player-form',
  imports: [],
  templateUrl: './complete-register-player-form.component.html',
  styleUrl: './complete-register-player-form.component.scss',
})
export class CompleteRegisterPlayerFormComponent implements OnInit {
  public completeRegisterPlayerForm: FormGroup | undefined = undefined;

  @Output() formReady = new EventEmitter<FormGroup>();

  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.completeRegisterPlayerForm = this.initForm();
  }

  private initForm(): FormGroup {
    const formInit = {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dni: ['', Validators.required],
      email: [''],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    };

    const formGroup = this.formBuilder.group(formInit);

    return formGroup;
  }
}
