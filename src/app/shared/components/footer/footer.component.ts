import { Component } from '@angular/core';
import { BackToTopComponent } from '../button/back-to-top/back-to-top.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [BackToTopComponent, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
