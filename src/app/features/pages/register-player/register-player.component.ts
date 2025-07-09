import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SimpleRegisterPlayerFormComponent } from './components/forms/simple-register-player-form/simple-register-player-form.component';
import { CompleteRegisterPlayerFormComponent } from './components/forms/complete-register-player-form/complete-register-player-form.component';

@Component({
  selector: 'app-register-player',
  imports: [
    //Modules
    CommonModule,

    //Components
    SimpleRegisterPlayerFormComponent,
    CompleteRegisterPlayerFormComponent,
  ],
  templateUrl: './register-player.component.html',
})
export class RegisterPlayerComponent implements OnInit {
  ngOnInit(): void {}
}
