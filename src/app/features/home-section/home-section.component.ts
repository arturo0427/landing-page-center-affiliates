import { ViewportScroller } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { AnimationService } from '@core/services/animation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'home-section',
  imports: [TranslateModule],
  templateUrl: './home-section.component.html',
})
export class HomeSectionComponent implements AfterViewInit {
  private viewportScroller = inject(ViewportScroller);
  private animationService = inject(AnimationService);

  @ViewChild('mainBaner') mainBaner!: ElementRef;
  ngAfterViewInit(): void {
    // this.animationService.gsapDevTools();
    this.animationService.fadeIn(this.mainBaner.nativeElement, 0, 2);
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
