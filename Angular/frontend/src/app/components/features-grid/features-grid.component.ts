import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';

const imports = [
  RouterModule,
  CommonModule
];

@Component({
  selector: 'app-features-grid',
  standalone: true,
  imports: imports,
  templateUrl: './features-grid.component.html',
  styleUrl: './features-grid.component.scss'
})
export class FeaturesGridComponent {
  features = [
    { name: 'Instagram Analysis', route: '/instagram-analysis', isHot: false },
    { name: 'Comparison of multiple distributions', route: '/feature2', isHot: false },
    { name: 'RAG Analysis', route: '/feature3', isHot: false },
    { name: 'LLM Decoding', route: '/feature4', isHot: false }, // Example of a "hot" feature
    { name: 'Feature 5', route: '/feature5', isHot: false },
    { name: 'Feature 1', route: '/feature1', isHot: false },
    { name: 'Feature 2', route: '/feature2', isHot: false },
    { name: 'Feature 3', route: '/feature3', isHot: false }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
