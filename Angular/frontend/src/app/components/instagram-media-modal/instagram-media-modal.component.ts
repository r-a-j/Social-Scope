import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InstagramMediaWithType } from '../../models/instagram.media.model';

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

  onClose() {
    this.close.emit();
  }

  onGenerateAI() {
    alert(`Generating AI for prompt: ${this.aiPrompt}`);
    // Add your logic to handle the AI generation here
  }
}
