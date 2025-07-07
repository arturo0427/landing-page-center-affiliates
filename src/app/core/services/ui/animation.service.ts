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

  bindCursorToElement(
    container: HTMLElement,
    point: HTMLElement,
    radius = 40,
    duration = 0.2
  ) {
    if (!container || !point) return;

    const quickX = gsap.quickTo(point, 'x', { duration, ease: 'power2.out' });
    const quickY = gsap.quickTo(point, 'y', { duration, ease: 'power2.out' });

    container.addEventListener('mouseenter', () => {
      gsap.to(point, { opacity: 1, duration: 0.3 });
    });

    container.addEventListener('mouseleave', () => {
      gsap.to(point, { opacity: 0, duration: 0.3 });
    });

    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - radius;
      const y = e.clientY - rect.top - radius;

      quickX(x);
      quickY(y);
    });

    container.addEventListener('click', () => {
      this.animateClick(point);
    });
  }

  private animateClick(el: HTMLElement): void {
    gsap.fromTo(
      el,
      { scale: 1 },
      {
        scale: 1.4,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
      }
    );
  }
}
