import { Component } from '@angular/core';
import { HomeSectionComponent } from '../home-section/home-section.component';
import { PlayerSectionComponent } from '../player-section/player-section.component';
import { BenefitsSectionComponent } from '../benefits-section/benefits-section.component';
import { PlayNowSectionComponent } from '../play-now-section/play-now-section.component';

import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

@Component({
  selector: 'main',
  imports: [
    HomeSectionComponent,
    PlayerSectionComponent,
    PlayNowSectionComponent,
    BenefitsSectionComponent,
  ],
  templateUrl: './main.component.html',
})
export class MainComponent {
  ngAfterViewInit(): void {
    this.progressBar();
  }

  private progressBar(): void {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      const bar = document.getElementById('progressBar');
      if (bar) {
        bar.style.width = `${progress}%`;
      }
    });
  }
}
