import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  postUrl: string = '';
  images: { src: string, thumb?: string }[] = [
    { src: 'https://images.unsplash.com/photo-1537886079430-486164575c54?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4c747db3353a34b312d05786f47930d3&auto=format&fit=crop&w=600&q=60' },
    { src: 'https://images.unsplash.com/photo-1537886194634-e6b923f92ff1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9eb2726071e58c1b0a430a75b1047525&auto=format&fit=crop&w=600&q=60' },
    { src: 'https://images.unsplash.com/photo-1537886243959-0b504cf58aa2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1171ce40e6e68e663c3399a67a915913&auto=format&fit=crop&w=600&q=60' },
    { src: 'https://images.unsplash.com/photo-1537886492139-052c27acbfee?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=664282a4bd8b8a69cc860420214df3e7&auto=format&fit=crop&w=600&q=60' },
    { src: 'https://images.unsplash.com/photo-1537886464786-8a0d500b0da6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=49984d393482456ea5484c3482cc52a9&auto=format&fit=crop&w=600&q=60' }
  ];
  
  videos: { src: string, thumb?: string }[] = [
    { 
      src: 'https://videos.pexels.com/video-files/20759098/20759098-hd_1080_1920_30fps.mp4',
      thumb: 'https://images.unsplash.com/photo-1537886079430-486164575c54?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4c747db3353a34b312d05786f47930d3&auto=format&fit=crop&w=600&q=60' 
    },
    { 
      src: 'https://videos.pexels.com/video-files/27278853/12109682_1080_1922_30fps.mp4',
      thumb: 'https://images.unsplash.com/photo-1537886079430-486164575c54?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4c747db3353a34b312d05786f47930d3&auto=format&fit=crop&w=600&q=60'  
    },
    { 
      src: 'https://videos.pexels.com/video-files/20337849/20337849-uhd_1440_2560_24fps.mp4',
      thumb: 'https://images.unsplash.com/photo-1537886079430-486164575c54?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4c747db3353a34b312d05786f47930d3&auto=format&fit=crop&w=600&q=60'  
    },
    { 
      src: 'https://videos.pexels.com/video-files/27333464/12120016_1440_2560_30fps.mp4',
      thumb: 'https://images.unsplash.com/photo-1537886079430-486164575c54?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4c747db3353a34b312d05786f47930d3&auto=format&fit=crop&w=600&q=60'  
    },
    { 
      src: 'https://videos.pexels.com/video-files/26738506/11997977_1440_2560_30fps.mp4',
      thumb: 'https://images.pexels.com/videos/26738506/pexels-photo-26738506.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop&dpr=1'  
    }
  ];

  loadPost() {
    // Add logic to load post data
    console.log('Loading post for URL:', this.postUrl);
  }
}
