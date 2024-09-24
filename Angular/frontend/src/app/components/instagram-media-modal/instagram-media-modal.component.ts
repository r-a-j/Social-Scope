import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InstagramMediaWithType } from '../../models/instagram.media.model';
import { NotificationService } from '../../services/notification.service';
import { InstagramService } from '../../services/instagram.service';

const imports = [
  CommonModule,
  FormsModule
];

@Component({
  selector: 'app-instagram-media-modal',
  standalone: true,
  imports: imports,
  templateUrl: './instagram-media-modal.component.html',
  styleUrl: './instagram-media-modal.component.scss'
})
export class InstagramMediaModalComponent {
  @Input() media: InstagramMediaWithType | null = null;
  @Output() close = new EventEmitter<void>();

  public aiPrompt: string = '';

  public processedImage: { src: string, thumb: string } | null = null;
  public errorMessage: string = '';

  constructor(private notificationService: NotificationService,
    private instagramService: InstagramService) { }

  public onClose(): void {
    this.close.emit();
  }

  public onGenerateAI(): void {
    if (!this.media || !this.media.src) {
      this.notificationService.error('No media selected.');
      return;
    }

    this.errorMessage = '';
    this.processedImage = null;

    this.instagramService.processImage(this.media.src).subscribe({
      next: (response) => {
        if (response.processed_images && response.processed_images.length > 0) {
          this.processedImage = response.processed_images[0];
          this.notificationService.success('AI image generated successfully.');
        } else {
          this.errorMessage = 'No processed images returned.';
          this.notificationService.error(this.errorMessage);
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.error || 'An error occurred while processing the image.';
        this.notificationService.error(this.errorMessage);
      }
    });
  }
}
