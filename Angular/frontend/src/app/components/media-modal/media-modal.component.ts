import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  onClose() {
    this.expandedMedia = null;
    this.close.emit();
  }

  expandImage(image: ImageModel) {
    this.expandedMedia = image.url;
  }

  expandVideo(video: VideoModel) {
    this.expandedMedia = video.url;
  }
}
