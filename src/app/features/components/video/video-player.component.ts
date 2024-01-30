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
  template: `<div class="bg-page-chat">
    <div class="width-70 margin-auto">
      <div class="video-container">
        <video class="videoplayer" controls>
          <source src="{{ videoUrl }}" type="video/mp4" />
        </video>
      </div>
      <mat-card-content>{{ videoDescription }}</mat-card-content>
      <app-comments [videoName]="videoName"></app-comments>
    </div>
  </div>`,
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
