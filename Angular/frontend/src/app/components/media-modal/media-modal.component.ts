import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MediaGroupModel } from '../../models/media.group.model';
import { CommonModule } from '@angular/common';

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

  onClose() {
    this.close.emit(); // Emit the close event
  }
}
