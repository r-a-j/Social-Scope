import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { FeaturesGridComponent } from '../features-grid/features-grid.component';

const imports = [
  FooterComponent, 
  HeaderComponent,
  FeaturesGridComponent
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
