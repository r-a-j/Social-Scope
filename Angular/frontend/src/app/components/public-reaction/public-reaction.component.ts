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
  selector: 'app-public-reaction',
  standalone: true,
  imports: imports,
  templateUrl: './public-reaction.component.html',
  styleUrl: './public-reaction.component.scss'
})
export class PublicReactionComponent {

}
