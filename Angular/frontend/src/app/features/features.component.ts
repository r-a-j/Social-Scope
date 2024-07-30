import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { FeatureInfoComponent } from "../feature-info/feature-info.component";

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, FeatureInfoComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {

}
