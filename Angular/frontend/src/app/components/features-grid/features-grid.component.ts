import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';

const imports = [
  RouterModule,
  CommonModule,
  ScrollToTopComponent
];

@Component({
  selector: 'app-features-grid',
  standalone: true,
  imports: imports,
  templateUrl: './features-grid.component.html',
  styleUrl: './features-grid.component.scss'
})
export class FeaturesGridComponent implements OnInit {
  features = [
    { name: 'Instagram Gen AI', route: '/instagram-analysis' },
    { name: 'Sentiment Analysis', route: '/instagram-analysis' },
    { name: 'Image Recognition', route: '/instagram-analysis' },
    { name: 'Content Trend Analysis', route: '/instagram-analysis' },
    { name: 'User Engagement Prediction', route: '/instagram-analysis' },
    { name: 'Hashtag Analysis', route: '/instagram-analysis' },
    { name: 'Recommender System', route: '/instagram-analysis' },
    { name: 'Collect Instagram Data', route: '/instagram-analysis' },
    { name: 'Exploratory Data Analysis', route: '/instagram-analysis' },
    { name: 'Visualize Data', route: '/instagram-analysis' },
  ];

  constructor(
    private router: Router,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private document: Document
  ) { }

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollToTop();
    }
  }

  public scrollToTop(): void {
    this.renderer.setProperty(this.document.documentElement, 'scrollTop', 0);
    this.renderer.setProperty(this.document.body, 'scrollTop', 0);
  }

  public navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
