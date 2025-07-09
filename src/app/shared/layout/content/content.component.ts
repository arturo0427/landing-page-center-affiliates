import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FooterComponent } from 'app/shared/components/footer/footer.component';
import { NavbarComponent } from 'app/shared/components/navbar/navbar.component';

@Component({
  selector: 'app-content',
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  title = 'front-center-affiliates-angularV19';

  public router = inject(Router);
  private translate = inject(TranslateService);
  private viewportScroller = inject(ViewportScroller);

  constructor() {
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'es';
    this.translate.use(preferredLanguage);

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }
}
