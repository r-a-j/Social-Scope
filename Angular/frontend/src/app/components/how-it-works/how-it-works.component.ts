import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

const imports = [
  CommonModule,
  RouterModule
];

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: imports,
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss',
})
export class HowItWorksComponent {
  activeIndex: number = 0; // Index of the initially opened accordion item

  accordionItems = [
    {
      title: 'Empower Your Insights',
      content: `Harness the power of advanced analytics to understand and connect with communities globally. This open-source tool provides deep insights into social media trends and behaviors, helping you make data-driven decisions.`,
    },
    {
      title: 'Why use this tool?',
      content: `Built by a passionate software developer and data scientist. The source code is freely available hence promoting transparency and collaboration. Designed for researchers, marketers, and influencers. This tool is accessible to all.`,
    },
    {
      title: 'Join the mission',
      content: `I believe in the power of open-source software to democratize access to technology. Join me in building a more connected and informed world.`,
    },
    {
      title: 'Get Involved',
      content: `Contribute to the Code. Help improve and expand the features.`,
    },
  ];

  public toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? -1 : index;
  }
}
