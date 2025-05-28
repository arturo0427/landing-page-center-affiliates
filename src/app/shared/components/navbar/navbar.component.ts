import { CommonModule, NgClass, ViewportScroller } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LANGUAGE_TO_FLAG_MAP,
  LANGUAGES,
  LanguageType,
  NAVBAR_SECTIONS,
} from '@core/helpers/ui/ui.constants';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [
    //Modules
    CommonModule,
    TranslateModule,
    NgbDropdownModule,

    NgClass,
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public LANGUAGES_LIST = LANGUAGES;
  public NAVBAR_SECTIONS = NAVBAR_SECTIONS;
  public LANGUAGE_TO_FLAG_MAP = LANGUAGE_TO_FLAG_MAP;

  public translate = inject(TranslateService);
  private viewportScroller = inject(ViewportScroller);

  // Navbar Sticky
  isSticky: boolean = false;
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (scrollPosition >= 50) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  classApplied = false;
  toggleClass() {
    this.classApplied = !this.classApplied;
  }

  changeLanguage(language: LanguageType): void {
    this.translate.use(language.code);
    // this.store.dispatch(change({ language: language.code }));
    localStorage.setItem('preferredLanguage', language.code);
  }
}
