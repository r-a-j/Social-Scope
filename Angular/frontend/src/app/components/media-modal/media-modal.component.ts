import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { MediaGroupModel } from '../../models/media.group.model';
import { CommonModule } from '@angular/common';
import { ImageModel } from '../../models/image.model';
import { VideoModel } from '../../models/video.model';

const imports = [CommonModule];

@Component({
  selector: 'app-media-modal',
  standalone: true,
  imports: imports,
  templateUrl: './media-modal.component.html',
  styleUrl: './media-modal.component.scss'
})
export class MediaModalComponent {

  @Input() group!: MediaGroupModel;
  @Output() close = new EventEmitter<void>();

  expandedMedia: string | null = null;

  constructor(private elRef: ElementRef) { }

  onClose() {
    this.expandedMedia = null;
    this.close.emit();
  }

  expandImage(event: MouseEvent, image: ImageModel) {
    this.expandedMedia = image.url;
    const imgContainers = document.querySelectorAll('.img-c');
    imgContainers.forEach(container => {
      container.classList.remove('active', 'postactive');
    });

    const imgContainer = event.currentTarget as HTMLElement;
    imgContainer.classList.add('active');

    setTimeout(() => {
      imgContainer.classList.add('positioned');
    }, 0);
  }

  expandVideo(event: MouseEvent, video: VideoModel) {
    this.stopExpandedMedia();
    this.expandedMedia = video.url;

    const videoContainers = document.querySelectorAll('.img-c');
    videoContainers.forEach(container => {
      container.classList.remove('active', 'postactive');
    });

    const videoContainer = event.currentTarget as HTMLElement;
    videoContainer.classList.add('active');

    setTimeout(() => {
      videoContainer.classList.add('positioned');
      this.playExpandedVideo();
    }, 0);
  }

  closeExpanded() {
    this.stopExpandedMedia();
    this.expandedMedia = null;
  }

  isImage(mediaUrl: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(mediaUrl);
  }

  playExpandedVideo() {
    const videoElement = this.elRef.nativeElement.querySelector('video');
    if (videoElement) {
      videoElement.muted = true;
      videoElement.play();
    }
  }

  stopExpandedMedia() {
    const videoElement = this.elRef.nativeElement.querySelector('video');
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  }
}
