import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const imports = [
  HeaderComponent,
  FooterComponent,
  CommonModule,
  FormsModule
];

@Component({
  selector: 'app-instagram-analysis',
  standalone: true,
  imports: imports,
  templateUrl: './instagram-analysis.component.html',
  styleUrl: './instagram-analysis.component.scss'
})
export class InstagramAnalysisComponent {
  postUrl: string = '';
  images = [
    { id: 1, src: 'https://picsum.photos/id/1015/600/400.jpg', thumb: 'https://picsum.photos/id/1015/150/100.jpg' },
    { id: 2, src: 'https://picsum.photos/id/1039/600/400.jpg', thumb: 'https://picsum.photos/id/1039/150/100.jpg' },
    { id: 3, src: 'https://picsum.photos/id/1057/600/400.jpg', thumb: 'https://picsum.photos/id/1057/150/100.jpg' },
    { id: 4, src: 'https://picsum.photos/id/1057/600/400.jpg', thumb: 'https://picsum.photos/id/1057/150/100.jpg' },
    { id: 5, src: 'https://picsum.photos/id/1057/600/400.jpg', thumb: 'https://picsum.photos/id/1057/150/100.jpg' },
    { id: 6, src: 'https://picsum.photos/id/1057/600/400.jpg', thumb: 'https://picsum.photos/id/1057/150/100.jpg' },
    { id: 7, src: 'https://picsum.photos/id/1057/600/400.jpg', thumb: 'https://picsum.photos/id/1057/150/100.jpg' },
    { id: 8, src: 'https://picsum.photos/id/1057/600/400.jpg', thumb: 'https://picsum.photos/id/1057/150/100.jpg' },
    { id: 9, src: 'https://picsum.photos/id/106/600/400.jpg', thumb: 'https://picsum.photos/id/106/150/100.jpg' }
  ];

  loadPost() {
    // Add logic to load post data
    console.log('Loading post for URL:', this.postUrl);
  }
}
