import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AVAILABLE_LANGUAGES } from '@core/helpers/ui/ui.constants';
import { LanguageCode } from '@core/interface/ui/language.interface';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public code: BehaviorSubject<LanguageCode>;

  constructor() {
    const storedLanguage =
      (localStorage.getItem('preferredLanguage') as LanguageCode) ||
      AVAILABLE_LANGUAGES.ES;

    this.code = new BehaviorSubject<LanguageCode>(storedLanguage);
  }

  public changeLanguage(newLang: LanguageCode): void {
    this.code.next(newLang);
    localStorage.setItem('preferredLanguage', newLang);
  }
}
