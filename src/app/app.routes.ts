import { Routes } from '@angular/router';
import { MainComponent } from './features/main/main.component';
import { RegisterPlayerComponent } from './features/pages/register-player/register-player.component';
import { RegisterAgentComponent } from './features/pages/register-agent/register-agent.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'register',
    children: [
      { path: 'player', component: RegisterPlayerComponent },
      { path: 'agent', component: RegisterAgentComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
