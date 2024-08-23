import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { FeatureInfoComponent } from '../feature-info/feature-info.component';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';
import { TechnologyStackComponent } from '../technology-stack/technology-stack.component';

const imports = [
  HeroComponent,
  FeatureInfoComponent, 
  HowItWorksComponent, 
  TechnologyStackComponent
];

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: imports,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
