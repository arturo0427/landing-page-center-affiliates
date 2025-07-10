// import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'simple-register-player-form',
//   imports: [],
//   templateUrl: './simple-register-player-form.component.html',
// })
// export class SimpleRegisterPlayerFormComponent implements OnInit {
//   public simpleRegisterPlayerForm: FormGroup | undefined = undefined;

//   @Output() formReady = new EventEmitter<FormGroup>();

//   private formBuilder = inject(FormBuilder);

//   ngOnInit(): void {
//     this.simpleRegisterPlayerForm = this.initForm();
//   }

//   private initForm(): FormGroup {
//     const formInit = {
//       phone: ['', Validators.required],
//       password: ['', Validators.required],
//       confirmPassword: ['', Validators.required],
//     };

//     const formGroup = this.formBuilder.group(formInit);

//     return formGroup;
//   }
// }
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'simple-register-player-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './simple-register-player-form.component.html',
})
export class SimpleRegisterPlayerFormComponent implements OnInit {
  public simpleRegisterPlayerForm!: FormGroup;
  public hidePassword = true;

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
