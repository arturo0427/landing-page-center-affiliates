import { Injectable } from '@angular/core';
import { DeviceType } from '@core/interface/ui/device.interface';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Subscription,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private readonly _deviceType$ = new BehaviorSubject<DeviceType>(
    this.getDeviceType(window.innerWidth)
  );
  public readonly deviceType$ = this._deviceType$.asObservable();

  private resizeSubscription: Subscription;

  constructor() {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(
        debounceTime(200),
        map(() => this.getDeviceType(window.innerWidth)),
        distinctUntilChanged()
      )
      .subscribe((type) => this._deviceType$.next(type));
  }

  private getDeviceType(width: number): DeviceType {
    if (width <= 767) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
  }

  get isMobile(): boolean {
    return this._deviceType$.value === 'mobile';
  }

  get isTablet(): boolean {
    return this._deviceType$.value === 'tablet';
  }

  get isDesktop(): boolean {
    return this._deviceType$.value === 'desktop';
  }
}
