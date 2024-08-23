import { Component } from '@angular/core';
import { FeaturesGridComponent } from '../features-grid/features-grid.component';

const imports = [FeaturesGridComponent];

@Component({
  selector: 'app-features',
  standalone: true,
  imports: imports,
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {

}
