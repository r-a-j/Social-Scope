import { Component } from '@angular/core';
import { PostModel } from '../../models/post.model';
import { ImageModel } from '../../models/image.model';
import { VideoModel } from '../../models/video.model';
import { UserModel } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { MediaGroupModel } from '../../models/media.group.model';
import { MediaModalComponent } from '../media-modal/media-modal.component';

const imports = [
  CommonModule,
  MediaModalComponent
];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: imports,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  userName: string;
  userEmail: string;
  posts: PostModel[] = [];
  images: ImageModel[] = [];
  videos: VideoModel[] = [];
  groupedMedia: MediaGroupModel[] = [];

  selectedGroup: MediaGroupModel | null = null;

  constructor() {
    // Example User Data
    const user: UserModel = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      isDeleted: false,
      isAdmin: false,
      createdOn: new Date(),
      updatedOn: new Date(),
    };

    this.userName = `${user.firstName} ${user.lastName}`;
    this.userEmail = user.email;

    // Example Posts
    this.posts = [
      {
        id: 1,
        description: 'This is my first post',
        shortCode: 'xyz123',
        isVideo: false,
        commentsDisabled: false,
        commentsDisabledForViewer: false,
        location: 'New York',
        viewerCanReshare: true,
        isAd: false,
        caption: 'Lovely day!',
        likeCount: 120,
        postUsername: user.firstName,
        postUserFullName: this.userName,
        createdOn: new Date(),
        downloadedOn: new Date()
      }
      // Add more posts as needed
    ];

    // Example Images
    this.images = [
      {
        id: 1,
        url: 'assets/sample-images/2024-08-12_22-47-20_UTC_1.jpg',
        postId: 1,
      },
      {
        id: 2,
        url: 'assets/sample-images/2024-08-12_22-47-20_UTC_8.jpg',
        postId: 1,
      }
      // Add more images as needed
    ];

    // Example Videos
    this.videos = [
      {
        id: 1,
        url: 'assets/sample-videos/2024-08-24_14-58-16_UTC.mp4',
        postId: 1,
      }
      // Add more videos as needed
    ];

    this.groupMediaByDate();
  }

  groupMediaByDate() {
    const mediaMap = new Map<string, MediaGroupModel>();

    this.posts.forEach(post => {
      const dateKey = post.createdOn.toDateString();
      if (!mediaMap.has(dateKey)) {
        mediaMap.set(dateKey, {
          date: post.createdOn,
          images: [],
          videos: []
        });
      }
      const mediaGroup = mediaMap.get(dateKey);
      if (mediaGroup) {
        mediaGroup.images.push(...this.images.filter(img => img.postId === post.id));
        mediaGroup.videos.push(...this.videos.filter(vid => vid.postId === post.id));
      }
    });

    this.groupedMedia = Array.from(mediaMap.values());
  }

  // Function to open the modal
  openMediaModal(group: MediaGroupModel) {
    this.selectedGroup = group;
  }

  // Function to close the modal
  closeMediaModal() {
    this.selectedGroup = null;
  }
}
