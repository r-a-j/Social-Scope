import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

const imports = [
  RouterModule, 
  CommonModule
];

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: imports,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  public currentYear!: number;
  public currentUrl: string = '';
  public isLandingPage: boolean = false;

  constructor(private router: Router) { }

  public ngOnInit(): void {
    this.initializeCurrentYear();
    this.trackRouteChanges();
  }

  private initializeCurrentYear(): void {
    this.currentYear = new Date().getFullYear();
  }

  private trackRouteChanges(): void {
    this.currentUrl = this.router.url;

    if (this.currentUrl == '/home') {
      this.isLandingPage = true;
    }
  }
}
