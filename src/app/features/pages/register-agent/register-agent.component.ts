import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterAgentFormComponent } from './components/forms/register-agent-form/register-agent-form.component';

@Component({
  selector: 'app-register-agent',
  imports: [CommonModule, TranslateModule, RegisterAgentFormComponent],
  templateUrl: './register-agent.component.html',
})
export class RegisterAgentComponent {
  public isFormValid: boolean = false;

  private router = inject(Router);

  onSubmit() {}

  onMoreInfo() {
    this.router.navigate(['/']);
  }
}
