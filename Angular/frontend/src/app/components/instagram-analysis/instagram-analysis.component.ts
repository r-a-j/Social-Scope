import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InstagramService } from '../../services/instagram.service';
import { InstagramMedia, InstagramMediaWithType } from '../../models/instagram.media.model';
import { InstagramMediaModalComponent } from '../instagram-media-modal/instagram-media-modal.component';

const imports = [
  HeaderComponent,
  FooterComponent,
  CommonModule,
  FormsModule,
  InstagramMediaModalComponent
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
  public images: InstagramMediaWithType[] = [];
  public videos: InstagramMediaWithType[] = [];
  public selectedImage: InstagramMediaWithType | null = null;
  public selectedVideo: InstagramMediaWithType | null = null;
  public showModal: boolean = false;
  public modalMedia: InstagramMediaWithType | null = null;

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

  public selectImage(image: InstagramMediaWithType): void {
    this.selectedImage = image;
  }

  public selectVideo(video: InstagramMediaWithType): void {
    this.selectedVideo = video;
  }

  public openModal(media: InstagramMediaWithType): void {
    this.modalMedia = media;
    this.showModal = true;
  }

  public closeModal(): void {
    this.showModal = false;
    this.modalMedia = null;
  }
}
