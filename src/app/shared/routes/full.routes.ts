import { Routes } from '@angular/router';
import { RegisterAgentComponent } from 'app/features/pages/register-agent/register-agent.component';
import { RegisterPlayerComponent } from 'app/features/pages/register-player/register-player.component';

export const full: Routes = [
  {
    path: 'register',
    children: [
      { path: 'player', component: RegisterPlayerComponent },
      { path: 'agent', component: RegisterAgentComponent },
    ],
  },
];
