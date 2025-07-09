import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // title = 'front-center-affiliates-angularV19';
  // public router = inject(Router);
  // private translate = inject(TranslateService);
  // private viewportScroller = inject(ViewportScroller);
  // constructor() {
  //   const preferredLanguage = localStorage.getItem('preferredLanguage') || 'es';
  //   this.translate.use(preferredLanguage);
  //   this.router.events.subscribe((event: Event) => {
  //     if (event instanceof NavigationEnd) {
  //       // Scroll to the top after each navigation end
  //       this.viewportScroller.scrollToPosition([0, 0]);
  //     }
  //   });
  // }
}
