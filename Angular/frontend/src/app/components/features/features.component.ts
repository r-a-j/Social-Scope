import { Component } from '@angular/core';
import { FeatureInfoComponent } from '../feature-info/feature-info.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

const imports = [
  FooterComponent, 
  HeaderComponent, 
  FeatureInfoComponent
];

@Component({
  selector: 'app-features',
  standalone: true,
  imports: imports,
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {

}
