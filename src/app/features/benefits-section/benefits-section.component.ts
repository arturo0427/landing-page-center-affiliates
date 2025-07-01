import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BENEFITS } from '@core/helpers/ui/ui.constants';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'benefits-section',
  imports: [TranslateModule],
  templateUrl: './benefits-section.component.html',
})
export class BenefitsSectionComponent {
  public BENEFITS = BENEFITS;

  private viewportScroller = inject(ViewportScroller);

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
