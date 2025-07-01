import { Component } from '@angular/core';
import { HomeSectionComponent } from '../home-section/home-section.component';
import { PlayerSectionComponent } from '../player-section/player-section.component';
import { BenefitsSectionComponent } from '../benefits-section/benefits-section.component';
import { PlayNowSectionComponent } from '../play-now-section/play-now-section.component';

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
export class MainComponent {}
