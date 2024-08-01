import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';

const imports = [
  RouterOutlet, 
  LandingComponent, 
  CommonModule,
  LoaderComponent,
  ScrollToTopComponent
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: imports,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public title: string = 'Social Scope';
  
  constructor(public router: Router) { }
}
