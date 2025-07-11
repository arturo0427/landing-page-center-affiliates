import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { AnimationService } from '@core/services/ui/animation.service';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
@Component({
  selector: 'play-now-section',
  imports: [TranslateModule],
  templateUrl: './play-now-section.component.html',
})
export class PlayNowSectionComponent implements AfterViewInit {
  @ViewChild('play-now') playNow!: ElementRef;
  @ViewChild('point', { static: true }) pointRef!: ElementRef;
  @ViewChild('threeDice', { static: true }) threeDice!: ElementRef;

  private scene!: THREE.Scene;
  private animationId!: number;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;

  private mouse = { x: 0, y: 0 };
  private targetMouse = { x: 0, y: 0 };

  private diceHeights: number[] = [];
  private diceGroups: THREE.Group[] = [];
  private progressAnimation: boolean = false;

  private readonly diceFaceRotations: any = {
    1: { x: 0, y: 0 },
    2: { x: -Math.PI / 2, y: 0 },
    3: { x: 0, y: Math.PI / 2 },
    4: { x: 0, y: -Math.PI / 2 },
    5: { x: Math.PI / 2, y: 0 },
    6: { x: Math.PI, y: 0 },
  };

  private readonly initialPositions = [
    new THREE.Vector3(2, 0, 2),
    new THREE.Vector3(1.2, 0, 1.5),
  ];

  private animationService = inject(AnimationService);

  ngAfterViewInit(): void {
    this.initThree();
    this.animate();
    this.bindEvents();
  }

  private bindEvents(): void {
    this.threeDice.nativeElement.addEventListener('click', this.onClick);
    this.threeDice.nativeElement.addEventListener(
      'mousemove',
      this.onMouseMove
    );
    window.addEventListener('resize', this.onWindowResize);

    const pointEl = this.pointRef.nativeElement;
    const container = document.getElementById('play-now');
    this.animationService.bindCursorToElement(container!, pointEl);
  }

  private initThree(): void {
    const width = this.threeDice.nativeElement.clientWidth;
    const height = this.threeDice.nativeElement.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.background = null;

    this.camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    this.camera.position.set(-3.2, 6.6, 3.2);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(width, height);
    this.threeDice.nativeElement.appendChild(this.renderer.domElement);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.setupLights();
    this.setupFloor();
    this.loadDiceModels();
  }

  private setupLights(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(-1, 4, -5);
    directionalLight.target.position.set(0, 0, 0);
    directionalLight.castShadow = true;

    this.scene.add(directionalLight);
    this.scene.add(directionalLight.target);
  }

  private setupFloor(): void {
    const loader = new THREE.TextureLoader();
    const maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();

    const colorMap = loader.load(
      'assets/textures/table/Fabric037_1K-JPG_Color.jpg'
    );
    colorMap.colorSpace = THREE.SRGBColorSpace;
    colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
    colorMap.repeat.set(4, 4);
    colorMap.anisotropy = maxAnisotropy;

    const normalMap = loader.load(
      'assets/textures/table/Fabric037_1K-JPG_NormalGL.jpg'
    );
    const roughnessMap = loader.load(
      'assets/textures/table/Fabric037_1K-JPG_Roughness.jpg'
    );
    const aoMap = loader.load(
      'assets/textures/table/Fabric037_1K-JPG_AmbientOcclusion.jpg'
    );

    [normalMap, roughnessMap].forEach((map) => {
      map.wrapS = map.wrapT = THREE.RepeatWrapping;
      map.repeat.set(4, 4);
      map.anisotropy = maxAnisotropy;
    });

    const material = new THREE.MeshStandardMaterial({
      map: colorMap,
      normalMap,
      roughnessMap,
      aoMap,
      roughness: 1,
      metalness: 0,
    });

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), material);
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;

    this.scene.add(floor);
  }

  private loadDiceModels(): void {
    const loader = new GLTFLoader();

    loader.load('assets/object-3d/dice/scene.gltf', (gltf) => {
      this.initialPositions.forEach((position, i) => {
        const model = gltf.scene.clone(true);
        model.scale.set(0.3, 0.3, 0.3);

        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center);

        model.traverse((child) => {
          if (child instanceof THREE.Mesh) child.castShadow = true;
        });

        const height = box.max.y - box.min.y;
        this.diceHeights.push(height);

        const group = new THREE.Group();
        group.add(model);
        group.position.copy(position);
        group.position.y = height / 2;

        if (i === 1) {
          group.rotation.y = Math.PI / 4;
          group.rotation.x = Math.PI;
        }

        this.scene.add(group);
        this.diceGroups.push(group);
      });
    });
  }

  private animate = (): void => {
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.1;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.1;

    const baseX = -3.2;
    const baseY = 6.6;
    const targetX = this.mouse.x * 0.4;
    const targetY = this.mouse.y * 0.3;

    this.camera.position.x += (baseX + targetX - this.camera.position.x) * 0.05;
    this.camera.position.y += (baseY + targetY - this.camera.position.y) * 0.05;
    this.camera.lookAt(-1.5, 0, 0);

    this.renderer.render(this.scene, this.camera);
    this.animationId = requestAnimationFrame(this.animate);
  };

  private onMouseMove = (event: MouseEvent): void => {
    const bounds = this.threeDice.nativeElement.getBoundingClientRect();
    this.targetMouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    this.targetMouse.y =
      -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
  };

  private onClick = (): void => {
    if (this.progressAnimation) return;
    this.progressAnimation = true;

    this.diceGroups.forEach((group, i) => {
      const tl = gsap.timeline();
      group.rotation.set(0, 0, 0);

      const targetFace = Math.ceil(Math.random() * 6);
      const faceRot = this.diceFaceRotations[targetFace];

      const randSpinX = Math.PI * 4 + faceRot.x;
      const randSpinY = Math.PI * 4 + faceRot.y;

      tl.to(group.position, { duration: 0.3, y: 1, ease: 'power1.out' });

      tl.to(
        group.rotation,
        { duration: 0.8, x: randSpinX, y: randSpinY, ease: 'power2.out' },
        '<'
      );

      tl.to(group.position, {
        duration: 0.4,
        y: this.diceHeights[i] / 2,
        ease: 'bounce.out',
        onComplete: (() => {
          this.progressAnimation = false;
        }).bind(this),
      });
    });
  };

  private onWindowResize = (): void => {
    const width = this.threeDice.nativeElement.clientWidth;
    const height = this.threeDice.nativeElement.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  public startGame(): void {
    console.log('Game started!');
  }
}
