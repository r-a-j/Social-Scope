import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss',
})
export class HowItWorksComponent {
  activeIndex: number = 0; // Index of the initially opened accordion item

  accordionItems = [
    {
      title: 'Empower Your Insights',
      content: `Harness the power of advanced analytics to understand and connect with communities globally. Our open-source tools provide deep insights into social media trends and behaviors, helping you make data-driven decisions.`,
    },
    {
      title: 'Why use this tool??',
      content: `Community driven and built by a community of passionate developers and data scientists. We are transparent and open. Our source code is freely available hence promoting transparency and collaboration. Designed for researchers, marketers, and influencers alike, our tools are accessible to all.`,
    },
    {
      title: 'Join Our Mission',
      content: `We believe in the power of open-source software to democratize access to technology. Join us in building a more connected and informed world.`,
    },
    {
      title: 'Get Involved',
      content: `Contribute to Our Code. Help us improve and expand our features.`,
    },
  ];

  toggleAccordion(index: number) {
    this.activeIndex = this.activeIndex === index ? -1 : index;
  }
}
