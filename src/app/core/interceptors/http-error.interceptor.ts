import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrNotificationService } from '@core/services/ui/toastr-notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private _notificationService: ToastrNotificationService,
    private _translateService: TranslateService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = this._translateService.instant('words.unknownError');

        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        this._notificationService.showNotification({
          type: 'error',
          title: 'Error',
          message: errorMessage,
        });

        const errorMessageTranslated =
          this._notificationService.getMessageTest(errorMessage);

        return throwError(() => new Error(errorMessageTranslated));
      })
    );
  }
}
export const ERROR_INTERCEPTOR_PROVIDERS = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
