import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { backendUrl } from '../../../shared/environments/backend';
import { CommentsComponent } from './video-comments.component';

@Component({
  standalone: true,
  imports: [
    CommentsComponent,
  ],
  selector: 'app-videoplayer',
  styles: [
    `
      .video-container {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: black;

        .videoplayer {
          margin: 1rem;
          border-radius: 1rem;
        }
      }
    `,
  ],
  template: `<div class="video-container">
      <video class="videoplayer" controls>
        <source src="{{ videoUrl }}" type="video/mp4" />
      </video>
    </div>

    <app-comments [videoName]="pathVariable"></app-comments>
    <!-- <app-add-video-comment [videoName]="pathVariable"></app-add-video-comment>
<app-video-comments [videoName]="pathVariable"></app-video-comments> --> `,
})
export class VideoPlayerComponent {
  private activatedRoute = inject(ActivatedRoute);
  public pathVariable: any;
  public videoUrl: string;

  constructor() {
    this.pathVariable = this.activatedRoute.snapshot.paramMap.get('name');
    this.videoUrl = backendUrl.getVideoByName + this.pathVariable;
  }
}
