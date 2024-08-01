import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InstagramService } from '../../services/instagram.service';
import { InstagramMedia } from '../../models/instagram.media.model';

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
  public postUrl: string = '';
  public images: InstagramMedia[] = [];
  public videos: InstagramMedia[] = [];
  public selectedImage: InstagramMedia | null = null;
  public selectedVideo: InstagramMedia | null = null;

  constructor(private instagramService: InstagramService) { }

  public loadPost(): void {
    if (this.postUrl) {
      this.instagramService.extractMedia(this.postUrl).subscribe({
        next: data => {
          this.images = data.images;
          this.videos = data.videos;
          this.selectedImage = this.images.length > 0 ? this.images[0] : null;
          this.selectedVideo = this.videos.length > 0 ? this.videos[0] : null;
        },
        error: error => {
          console.error('Error fetching media:', error);
        },
        complete: () => {
          console.log('Media fetching completed.');
        }
      });
    } else {
      alert('Please enter a valid Instagram post URL.');
    }
  }

  public selectImage(image: InstagramMedia): void {
    this.selectedImage = image;
  }

  public selectVideo(video: InstagramMedia): void {
    this.selectedVideo = video;
  }
}
