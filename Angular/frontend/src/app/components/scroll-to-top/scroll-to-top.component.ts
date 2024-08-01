import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

const imports = [CommonModule];

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: imports,
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss'
})
export class ScrollToTopComponent {
  public isVisible: boolean = false;

  @HostListener('window:scroll', [])
  public onWindowScroll(): void {
    this.isVisible = window.scrollY > 100;
  }

  public scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
