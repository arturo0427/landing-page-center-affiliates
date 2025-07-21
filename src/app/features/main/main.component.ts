import { Component, ViewChild } from '@angular/core';
import { HomeSectionComponent } from '../home-section/home-section.component';
import { PlayerSectionComponent } from '../player-section/player-section.component';
import { BenefitsSectionComponent } from '../benefits-section/benefits-section.component';
import { PlayNowSectionComponent } from '../play-now-section/play-now-section.component';

import Lenis from 'lenis';
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
  private lenis!: Lenis;
  private lenisRafId!: number;

  @ViewChild(HomeSectionComponent) homeSection!: HomeSectionComponent;
  @ViewChild(PlayNowSectionComponent) playNowSection!: PlayNowSectionComponent;

  ngAfterViewInit(): void {
    this.initLenis();
    this.progressBar();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.lenisRafId);
    this.lenis.destroy();
  }

  private initLenis(): void {
    const isMobile = window.innerWidth < 768;
    this.lenis = new Lenis({
      duration: isMobile ? 0.6 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => {
      this.lenis.raf(time);

      this.homeSection?.renderFrame(time);
      this.playNowSection?.renderFrame(time);

      this.lenisRafId = requestAnimationFrame(raf);
    };

    this.lenisRafId = requestAnimationFrame(raf);
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
