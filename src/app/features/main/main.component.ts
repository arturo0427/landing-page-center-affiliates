import { Component } from '@angular/core';
import { HomeSectionComponent } from '../home-section/home-section.component';
import { PlayerSectionComponent } from '../player-section/player-section.component';

@Component({
  selector: 'main',
  imports: [HomeSectionComponent, PlayerSectionComponent],
  templateUrl: './main.component.html',
})
export class MainComponent {}
