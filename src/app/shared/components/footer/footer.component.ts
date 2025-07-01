import { Component } from '@angular/core';
import { BackToTopComponent } from '../button/back-to-top/back-to-top.component';

@Component({
  selector: 'app-footer',
  imports: [BackToTopComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
