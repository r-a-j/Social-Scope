import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FeaturesGridComponent } from '../features-grid/features-grid.component';

const imports = [
  HeaderComponent,
  FooterComponent,
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
