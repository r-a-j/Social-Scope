import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HeroComponent } from '../hero/hero.component';
import { FeatureInfoComponent } from '../feature-info/feature-info.component';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeroComponent, HeaderComponent, FeatureInfoComponent, HowItWorksComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
