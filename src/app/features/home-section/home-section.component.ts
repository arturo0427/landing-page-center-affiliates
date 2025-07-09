import { ViewportScroller } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { OPTIONS_REGISTER } from '@core/helpers/global/global.constant';
import { AnimationService } from '@core/services/ui/animation.service';
import { TranslateModule } from '@ngx-translate/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'home-section',
  imports: [TranslateModule],
  templateUrl: './home-section.component.html',
})
export class HomeSectionComponent implements AfterViewInit, OnDestroy {
  private readonly WORLD_WIDTH = 4;
  private readonly WORLD_HEIGHT = 5;
  public readonly OPTIONS_REGISTER = OPTIONS_REGISTER;

  private scene!: THREE.Scene;
  private animationId!: number;
  private model3D!: THREE.Object3D;
  private clock = new THREE.Clock();
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private mouse = { x: 0, y: 0 };

  @ViewChild('mainBaner') mainBaner!: ElementRef;
  @ViewChild('backgroundImage') backgroundImage!: ElementRef;
  @ViewChild('threeContainer', { static: true }) threeContainer!: ElementRef;

  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);
  private animationService = inject(AnimationService);

  ngAfterViewInit(): void {
    this.initThree();
    this.animate();
    this.bindEvents();
    this.fadeInElements();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.onWindowResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    this.renderer.dispose();
  }

  public onClick(option_register: string): void {
    if (!option_register) return;

    switch (option_register) {
      case OPTIONS_REGISTER.PLAYER:
        this.router.navigate(['/register/' + OPTIONS_REGISTER.PLAYER]);

        break;
      case OPTIONS_REGISTER.AGENT:
        this.router.navigate(['/register/' + OPTIONS_REGISTER.AGENT]);
        break;
    }
  }

  private bindEvents(): void {
    window.addEventListener('resize', this.onWindowResize);
    window.addEventListener('mousemove', this.onMouseMove);
  }

  private fadeInElements(): void {
    this.animationService.fadeIn(this.backgroundImage.nativeElement, 0, 3);
    this.animationService.fadeIn(this.mainBaner.nativeElement, 0.5, 3);
    this.animationService.fadeIn(this.threeContainer.nativeElement, 1, 3);
  }

  private initThree(): void {
    const width = this.threeContainer.nativeElement.clientWidth;
    const height = this.threeContainer.nativeElement.clientHeight;
    const aspect = width / height;
    const isPortrait = height > width;

    this.scene = new THREE.Scene();
    this.scene.background = null;

    this.camera = new THREE.PerspectiveCamera(
      isPortrait ? 60 : 75,
      aspect,
      0.1,
      1000
    );
    this.camera.position.set(0, this.WORLD_HEIGHT / 3, this.WORLD_HEIGHT);
    this.camera.lookAt(0, this.WORLD_HEIGHT * 0.5, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.threeContainer.nativeElement.appendChild(this.renderer.domElement);

    this.addLights();
    this.loadModel();
  }

  private addLights(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(-2, 3, 4);
    directionalLight.target.position.set(0, 0, 0);

    this.scene.add(ambientLight);
    this.scene.add(directionalLight);
    this.scene.add(directionalLight.target);
  }

  private loadModel(): void {
    const loader = new GLTFLoader();

    loader.load(
      'assets/object-3d/ball/uploads_files_2798297_Football.gltf',
      (gltf) => {
        this.model3D = gltf.scene;
        this.model3D.scale.set(0.3, 0.3, 0.3);

        const box = new THREE.Box3().setFromObject(this.model3D);
        const center = new THREE.Vector3();
        box.getCenter(center);

        this.model3D.position.sub(center);
        this.model3D.position.z = 1.5;

        const directionalLight = this.scene.getObjectByProperty(
          'type',
          'DirectionalLight'
        ) as THREE.DirectionalLight;

        if (directionalLight) {
          directionalLight.target.position.copy(center);
        }

        this.scene.add(this.model3D);
      }
    );
  }

  private animate = (): void => {
    const elapsedTime = this.clock.getElapsedTime();
    this.animationId = requestAnimationFrame(this.animate);

    if (this.model3D) {
      const x = Math.sin(elapsedTime * 0.1) * (this.WORLD_WIDTH / 2 - 0.5);
      const y = Math.abs(Math.sin(elapsedTime * 2)) * (this.WORLD_HEIGHT / 4);

      this.model3D.position.set(x, y, this.model3D.position.z);
      this.model3D.rotation.y = elapsedTime * 2;
      this.model3D.rotation.x = Math.sin(elapsedTime * 0.3) * 0.5;
    }

    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  };

  private onMouseMove = (event: MouseEvent): void => {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  private onWindowResize = (): void => {
    const width = this.threeContainer.nativeElement.clientWidth;
    const height = this.threeContainer.nativeElement.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };
}
