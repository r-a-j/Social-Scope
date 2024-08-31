import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { MediaGroupModel } from '../../models/media.group.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-modal.component.html',
  styleUrls: ['./media-modal.component.scss']
})
export class MediaModalComponent {
  @Input() group!: MediaGroupModel;
  @Output() close = new EventEmitter<void>();

  expandedMedia: string | null = null;
  currentIndex: number = 0;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  onClose() {
    this.expandedMedia = null;
    this.close.emit();
  }

  expandMedia(index: number) {
    this.stopExpandedMedia();
    const media = this.group.images.concat(this.group.videos)[index];
    this.currentIndex = index;
    this.expandedMedia = media.url;
    this.playExpandedVideo();
  }

  closeExpanded() {
    this.stopExpandedMedia();
    this.expandedMedia = null;
  }

  nextMedia(event: MouseEvent) {
    event.stopPropagation();
    const totalMedia = this.group.images.length + this.group.videos.length;
    this.currentIndex = (this.currentIndex + 1) % totalMedia;
    this.expandMedia(this.currentIndex);
  }

  previousMedia(event: MouseEvent) {
    event.stopPropagation();
    const totalMedia = this.group.images.length + this.group.videos.length;
    this.currentIndex = (this.currentIndex - 1 + totalMedia) % totalMedia;
    this.expandMedia(this.currentIndex);
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

  onDragStart(event: DragEvent) {
    event.dataTransfer?.setDragImage(new Image(), 0, 0);
  }

  onDragEnd(event: DragEvent) {
    if (event.offsetX > 100) {
      this.nextMedia(new MouseEvent('click'));
    } else if (event.offsetX < -100) {
      this.previousMedia(new MouseEvent('click'));
    }
  }
}
