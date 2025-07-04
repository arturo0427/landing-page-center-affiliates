import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { AnimationService } from '@core/services/ui/animation.service';
@Component({
  selector: 'play-now-section',
  imports: [TranslateModule],
  templateUrl: './play-now-section.component.html',
})
export class PlayNowSectionComponent implements AfterViewInit {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animationId!: number;
  private controls!: OrbitControls;
  private model3D!: THREE.Object3D;
  private mouse = { x: 0, y: 0 };
  private group: THREE.Group = new THREE.Group();
  private clock: THREE.Clock = new THREE.Clock();
  private diceGroups: THREE.Group[] = [];
  private progressAnimation = false;
  private initialPositions = [
    new THREE.Vector3(2, 0, 2),
    new THREE.Vector3(1.2, 0, 1.5),
  ];
  private diceHeights: number[] = [];
  public diceFaceRotations: any = {
    1: { x: 0, y: 0 },
    2: { x: -Math.PI / 2, y: 0 },
    3: { x: 0, y: Math.PI / 2 },
    4: { x: 0, y: -Math.PI / 2 },
    5: { x: Math.PI / 2, y: 0 },
    6: { x: Math.PI, y: 0 },
  };

  @ViewChild('play-now') playNow!: ElementRef;
  @ViewChild('threeDice', { static: true }) threeDice!: ElementRef;
  @ViewChild('point', { static: true }) pointRef!: ElementRef;

  private animationService = inject(AnimationService);

  ngAfterViewInit(): void {
    // this.animationService.gsapDevTools();
    this.initThree();
    this.animate();
    this.threeDice.nativeElement.addEventListener('click', this.onClick, false);
    window.addEventListener('resize', this.onWindowResize);

    this.animationService.trackCursorPoint('.point');
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

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(-1, 4, -5);
    this.camera.lookAt(0, 0, 0);
    directionalLight.target.position.set(0, 0, 0);
    directionalLight.castShadow = true;

    this.scene.add(directionalLight);
    this.scene.add(directionalLight.target);

    //TEXTURE TABLE
    const loader = new THREE.TextureLoader();

    const colorMap = loader.load(
      'assets/textures/table/Fabric037_1K-JPG_Color.jpg'
    );

    colorMap.colorSpace = THREE.SRGBColorSpace;

    const normalMap = loader.load(
      'assets/textures/table/Fabric037_1K-JPG_NormalGL.jpg'
    );

    const roughnessMap = loader.load(
      'assets/textures/table/Fabric037_1K-JPG_Roughness.jpg'
    );

    const aoMap = loader.load(
      'assets/textures/table/Fabric037_1K-JPG_AmbientOcclusion.jpg'
    );

    [colorMap, normalMap, roughnessMap].forEach((map) => {
      map.wrapS = map.wrapT = THREE.RepeatWrapping;
      map.repeat.set(4, 4);
      map.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
    });

    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({
      map: colorMap,
      normalMap: normalMap,
      roughnessMap: roughnessMap,
      aoMap: aoMap,
      roughness: 1,
      metalness: 0,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);

    const maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();
    colorMap.anisotropy = maxAnisotropy;
    normalMap.anisotropy = maxAnisotropy;
    roughnessMap.anisotropy = maxAnisotropy;
    floor.receiveShadow = true;

    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;

    this.scene.add(floor);

    this.loadGLTF();
  }

  private loadGLTF(): void {
    const loader = new GLTFLoader();

    loader.load('assets/object-3d/dice/scene.gltf', (gltf) => {
      for (let i = 0; i < this.initialPositions.length; i++) {
        const model = gltf.scene.clone(true);
        model.scale.set(0.3, 0.3, 0.3);

        // Centrar el dado
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center);

        // Clonar materiales individualmente
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
          }
        });

        // Calcular altura para colocar sobre el piso
        const height = box.max.y - box.min.y;
        this.diceHeights.push(height);

        const group = new THREE.Group();
        group.add(model);

        group.position.copy(this.initialPositions[i]);
        group.position.y = height / 2;

        // Aplica rotación diferente al segundo dado
        if (i === 1) {
          group.rotation.y = Math.PI / 4;
          group.rotation.x = Math.PI;
        }

        this.scene.add(group);
        this.diceGroups.push(group);
      }
    });
  }

  private animate = (): void => {
    const elapsedTime = this.clock.getElapsedTime();
    // this.controls.update();

    // this.group.rotation.x = elapsedTime * 0.5;
    // this.group.rotation.y = elapsedTime;

    this.renderer.render(this.scene, this.camera);
    this.animationId = requestAnimationFrame(this.animate);
  };

  private onClick = (_event: MouseEvent): void => {
    if (this.progressAnimation) return;
    this.progressAnimation = true;

    this.diceGroups.forEach((group, i) => {
      const tl = gsap.timeline();
      group.rotation.set(0, 0, 0);
      // Elección aleatoria de cara (1 a 6)
      const targetFace = Math.ceil(Math.random() * 6);
      const faceRot = this.diceFaceRotations[targetFace];

      // Añade giros extra (efecto "roll") + el ángulo necesario
      const randSpinX = Math.PI * 4 + faceRot.x;
      const randSpinY = Math.PI * 4 + faceRot.y;

      tl.to(group.position, {
        duration: 0.3,
        y: 1,
        ease: 'power1.out',
      });

      tl.to(
        group.rotation,
        {
          duration: 0.8,
          x: randSpinX,
          y: randSpinY,
          ease: 'power2.out',
        },
        '<'
      );

      tl.to(group.position, {
        duration: 0.4,
        y: this.diceHeights[i] / 2,
        ease: 'bounce.out',
        onComplete: () => {
          this.progressAnimation = false;
        },
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

  public startGame() {
    // Implement the logic to start the game
    console.log('Game started!');
  }
}
