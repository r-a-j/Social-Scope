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
  selector: 'app-sentiment-analysis',
  standalone: true,
  imports: imports,
  templateUrl: './sentiment-analysis.component.html',
  styleUrl: './sentiment-analysis.component.scss'
})
export class SentimentAnalysisComponent {

}
