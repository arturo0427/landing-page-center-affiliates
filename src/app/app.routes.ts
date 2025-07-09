import { Routes } from '@angular/router';
import { ContentComponent } from './shared/layout/content/content.component';
import { FullComponent } from './shared/layout/full/full.component';
import { content } from './shared/routes/content.routes';
import { full } from './shared/routes/full.routes';

export const routes: Routes = [
  { path: '', component: ContentComponent, children: content },
  { path: '', component: FullComponent, children: full },
  { path: '**', redirectTo: '' },
];
