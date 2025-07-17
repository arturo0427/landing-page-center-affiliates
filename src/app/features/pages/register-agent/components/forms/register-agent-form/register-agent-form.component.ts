import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'register-agent-form',
  imports: [],
  templateUrl: './register-agent-form.component.html',
  styleUrl: './register-agent-form.component.scss',
})
export class RegisterAgentFormComponent {
  public hidePassword: boolean = true;
  public registerAgentForm!: FormGroup;

  @Output() formReady = new EventEmitter<FormGroup>();

  private formBuilder = inject(FormBuilder);
}
