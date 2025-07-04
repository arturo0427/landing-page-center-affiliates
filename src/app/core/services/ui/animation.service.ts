import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { GSDevTools } from 'gsap/GSDevTools';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  gsapDevTools() {
    gsap.registerPlugin(GSDevTools);
    GSDevTools.create();
  }

  fadeIn(element: Element, delay = 0, duration = 1) {
    gsap.fromTo(
      element,
      { opacity: 0 },
      { opacity: 1, duration, delay, ease: 'power2.out' }
    );
  }

  trackCursorPoint(className = '.point', duration = 0.2) {
    const point = document.querySelector(className) as HTMLElement;
    if (!point) return;

    const quickX = gsap.quickTo(point, 'x', { duration, ease: 'power2.out' });
    const quickY = gsap.quickTo(point, 'y', { duration, ease: 'power2.out' });

    document.addEventListener('mousemove', (e) => {
      quickX(e.clientX);
      quickY(e.clientY);
    });
  }
}
