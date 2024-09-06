import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InstagramService } from '../../services/instagram.service';
import { InstagramMediaWithType } from '../../models/instagram.media.model';
import { InstagramMediaModalComponent } from '../instagram-media-modal/instagram-media-modal.component';
import { NotificationService } from '../../services/notification.service';
import { FormValidationService } from '../../services/validation.service';

const imports = [
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
  public mediaList: InstagramMediaWithType[] = [];
  public selectedMedia: InstagramMediaWithType | null = null;
  public showModal: boolean = false;
  public modalMedia: InstagramMediaWithType | null = null;

  constructor(
    private instagramService: InstagramService,
    private notificationService: NotificationService,
    private formValidationService: FormValidationService
  ) { }

  public loadPost(): void {
    if (this.formValidationService.isValidInstagramUrl(this.postUrl)) {
      this.instagramService.extractMedia(this.postUrl).subscribe({
        next: data => {
          const videoBaseNames = data.videos.map((video: InstagramMediaWithType) =>
            video.src.substring(video.src.lastIndexOf('/') + 1, video.src.lastIndexOf('.'))
          );

          const filteredImages = data.images.filter((image: InstagramMediaWithType) => {
            const imageBaseName = image.src.substring(image.src.lastIndexOf('/') + 1, image.src.lastIndexOf('.'));
            return !videoBaseNames.includes(imageBaseName);
          });

          this.mediaList = [
            ...filteredImages.map((image: InstagramMediaWithType) => ({ ...image, type: 'image' as const })),
            ...data.videos.map((video: InstagramMediaWithType) => ({ ...video, type: 'video' as const }))
          ];

          this.selectedMedia = this.mediaList.length > 0 ? this.mediaList[0] : null;
        },
        error: error => {
          this.notificationService.error(error.message);
        },
        complete: () => { }
      });
    } else {
      this.notificationService.error('Please provide a valid Instagram post or reel URL.');
    }
  }

  public selectMedia(media: InstagramMediaWithType): void {
    this.selectedMedia = media;
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
