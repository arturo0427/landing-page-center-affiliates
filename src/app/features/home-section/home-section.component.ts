import { ViewportScroller } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { AnimationService } from '@core/services/ui/animation.service';
import { TranslateModule } from '@ngx-translate/core';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Ejemplo de importación en tu componente

@Component({
  selector: 'home-section',
  imports: [TranslateModule],
  templateUrl: './home-section.component.html',
})
export class HomeSectionComponent implements AfterViewInit {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animationId!: number;
  private controls!: OrbitControls;
  private model3D!: THREE.Object3D;
  private mouse = { x: 0, y: 0 };
  private clock: THREE.Clock = new THREE.Clock();

  @ViewChild('mainBaner') mainBaner!: ElementRef;
  @ViewChild('threeContainer', { static: true }) threeContainer!: ElementRef;

  private viewportScroller = inject(ViewportScroller);
  private animationService = inject(AnimationService);

  ngAfterViewInit(): void {
    // this.animationService.gsapDevTools();
    this.initThree();
    this.animate();
    window.addEventListener('resize', this.onWindowResize);
    window.addEventListener('mousemove', this.onMouseMove);
    this.animationService.fadeIn(this.mainBaner.nativeElement, 0, 2);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.onWindowResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    this.renderer.dispose();
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  private initThree(): void {
    const width = this.threeContainer.nativeElement.clientWidth;
    const height = this.threeContainer.nativeElement.clientHeight;

    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0xeeeeee);
    this.scene.background = null;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 2.5, 5);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.threeContainer.nativeElement.appendChild(this.renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(-2, 3, 4);
    directionalLight.target.position.set(0, 0, 0);
    this.scene.add(directionalLight);
    this.scene.add(directionalLight.target);

    // const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
    // this.scene.add(helper);

    const size = 5;
    const divisions = 15;
    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.loadGLTF();
  }

  private loadGLTF(): void {
    const loader = new GLTFLoader();
    loader.load(
      'assets/object-3d/ball/uploads_files_2798297_Football.gltf',
      (gltf) => {
        this.model3D = gltf.scene;
        this.scene.add(this.model3D);

        this.model3D.scale.set(0.3, 0.3, 0.3);

        const box = new THREE.Box3().setFromObject(this.model3D);
        const center = new THREE.Vector3();
        box.getCenter(center);

        this.model3D.position.sub(center);
        this.model3D.position.z = 1;

        const directionalLight = this.scene.getObjectByProperty(
          'type',
          'DirectionalLight'
        ) as THREE.DirectionalLight;

        if (directionalLight) {
          directionalLight.target.position.copy(center);
        }
      }
    );
  }

  private animate = (): void => {
    const elapsedTime = this.clock.getElapsedTime();
    this.animationId = requestAnimationFrame(this.animate);
    // this.controls.update();

    if (this.model3D) {
      const x = Math.sin(elapsedTime * 0.5) * 2.5;
      const y = Math.abs(Math.sin(elapsedTime * 3)) * 1;

      this.model3D.position.set(x, y, this.model3D.position.z);

      this.model3D.rotation.y = elapsedTime * 3;
      this.model3D.rotation.x = Math.sin(elapsedTime * 0.5) * 0.5;
    }

    this.camera.updateProjectionMatrix();

    this.renderer.render(this.scene, this.camera);
  };

  private onMouseMove = (event: MouseEvent): void => {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  private onWindowResize = (): void => {
    this.camera.aspect =
      this.threeContainer.nativeElement.clientWidth /
      this.threeContainer.nativeElement.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.threeContainer.nativeElement.clientWidth,
      this.threeContainer.nativeElement.clientHeight
    );
  };
}
