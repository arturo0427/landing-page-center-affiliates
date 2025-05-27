import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'player-section',
  imports: [],
  templateUrl: './player-section.component.html',
})
export class PlayerSectionComponent {
  private viewportScroller = inject(ViewportScroller);
  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
