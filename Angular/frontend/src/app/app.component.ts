import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { CommonModule } from '@angular/common';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

const imports = [
  RouterOutlet,
  LandingComponent,
  CommonModule,
  ScrollToTopComponent,
  NgxSpinnerModule,
  HeaderComponent,
  FooterComponent
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
