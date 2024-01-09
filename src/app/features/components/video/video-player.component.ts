import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

import { BACKEND } from '../../../shared/environments/backend';
import { VideoService } from '../../services/video.service';
import { CommentsComponent } from './video-comments.component';

@Component({
  standalone: true,
  imports: [CommentsComponent, MatCardModule],
  selector: 'app-videoplayer',
  styles: `
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
    .description {
      width: 50vw;
      margin-top: 1rem;
      margin-left: auto;
      margin-right: auto;
    }
  `,
  template: `<div class="video-container">
      <video class="videoplayer" controls>
        <source src="{{ videoUrl }}" type="video/mp4" />
      </video>
    </div>

    <mat-card class="description">
      <mat-card-content>{{ videoDescription }}</mat-card-content>
    </mat-card>

    <app-comments [videoName]="videoName"></app-comments> `,
})
export class VideoPlayerComponent {
  /** SERVICES
   **************************************/
  private activatedRoute = inject(ActivatedRoute);
  private videoService = inject(VideoService);

  /** PROPERTIES
   **************************************/
  public videoName: any;
  public videoDescription: string = '';
  public videoUrl: string;

  constructor() {
    this.videoName = this.activatedRoute.snapshot.paramMap.get('name');
    this.videoUrl = BACKEND.playVideo(this.videoName);
    this.videoService
      .getVideoDescription(this.videoName)
      .subscribe((response) => {
        this.videoDescription = response;
      });
  }
}
