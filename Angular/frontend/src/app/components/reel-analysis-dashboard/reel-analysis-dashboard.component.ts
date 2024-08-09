import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

const imports = [
  HeaderComponent,
  FooterComponent,
  CommonModule,
  FormsModule  
];

@Component({
  selector: 'app-reel-analysis-dashboard',
  standalone: true,
  imports: imports,
  templateUrl: './reel-analysis-dashboard.component.html',
  styleUrl: './reel-analysis-dashboard.component.scss'
})
export class ReelAnalysisDashboardComponent {

}
