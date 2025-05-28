import { Injectable } from '@angular/core';
import { DEFAULT_INDIVIDUAL_TOASTR_CONFIG } from '@core/helpers/ui/ui.constants';
import { ApiMessage } from '@core/interface/api/api-response.interface';
import { ToastrNotification } from '@core/interface/ui/notification.interface';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class ToastrNotificationService {
  constructor(
    private _toastrService: ToastrService,
    private _translateService: TranslateService,
    private _lang: LanguageService
  ) {}

  public showNotification(notification: ToastrNotification): void {
    const { type, message, title, config } = notification;
    const titleText = title ? this._translateService.instant(title) : '';
    const messageText = this.getMessageTest(message);
    const configFormatted = { ...DEFAULT_INDIVIDUAL_TOASTR_CONFIG, ...config };
    this._toastrService[type](messageText, titleText, configFormatted);
  }

  public getMessageTest(message: ApiMessage): string {
    let messageFormatted = '';

    if (typeof message === 'string') {
      messageFormatted = message;
    }

    if (typeof message === 'object') {
      const language = this._lang.code.value;
      const messageText = message[language] || '';
      messageFormatted = messageText;
    }

    return messageFormatted;
  }
}
