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
}
