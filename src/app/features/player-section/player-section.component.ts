import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'player-section',
  imports: [TranslateModule],
  templateUrl: './player-section.component.html',
})
export class PlayerSectionComponent {
  private readonly viewportScroller = inject(ViewportScroller);

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
