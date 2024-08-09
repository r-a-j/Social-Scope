import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

const imports = [
  RouterModule,
  CommonModule,
  ScrollToTopComponent,
  HeaderComponent,
  FooterComponent,
];

@Component({
  selector: 'app-about',
  standalone: true,
  imports: imports,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
