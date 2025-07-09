import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-player',
  imports: [],
  templateUrl: './register-player.component.html',
})
export class RegisterPlayerComponent implements OnInit {
  public simpleRegisterPlayerForm: FormGroup | undefined = undefined;
  public completeRegisterPlayerForm: FormGroup | undefined = undefined;

  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {}
}
