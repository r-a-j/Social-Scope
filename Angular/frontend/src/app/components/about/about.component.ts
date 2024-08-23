import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';

const imports = [
  RouterModule,
  CommonModule,
  ScrollToTopComponent    
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
