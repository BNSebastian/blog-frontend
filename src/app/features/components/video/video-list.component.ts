import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

import { BACKEND } from '../../../shared/environments/backend';
import { FRONTEND, frontendUrl } from '../../../shared/environments/frontend';
import { VideoService } from '../../services/video.service';
import { VideoPlayerComponent } from './video-player.component';

@Component({
  standalone: true,
  imports: [
    VideoPlayerComponent,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
  ],
  selector: 'app-videos',
  template: `
    <div class="container-primary bg-page-chat">
      <br />
      <!-- <div class="grid">
        @for (item of videoNames; track $index) {
        <mat-card class="margin-right-sm" (click)="playVideo(item)">
          <mat-card-header>
            <mat-card-title>{{ item }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <video
              style="max-width: 400px"
              [src]="getVideoThumbnail(item)"
            ></video>
          </mat-card-content>
        </mat-card>
        }
      </div> -->

      @for (item of videoNames; track $index) {
      <div
        (click)="playVideo(item)"
        class="bg-secondary width-30 margin-bottom-sm"
        style="height: 400px;"
      >
        <!-- title -->
        <div>
          {{ item }}
        </div>
        <!-- thumbnail -->
        <div>
          <video class="width-100" [src]="getVideoThumbnail(item)"></video>
        </div>
        <!-- description -->
        <div
          style="white-space: normal; /* Allows the text to wrap to the next line if there's enough space */
  overflow: hidden; /* Hides any content that overflows the container */
  text-overflow: ellipsis; /* Displays an ellipsis (...) to indicate truncated text */
  max-width: 300px; /* You can set a maximum width to control the truncation */
  max-height: 80px; /* Set a maximum height to control when text starts to truncate */
  border: 1px solid #ccc; /* Just for demonstration purposes, you can adjust or remove this */
  padding: 10px; /* Add padding to the container */white-space: nowrap; overflow: hidden; text-overflow: ellipsis; word-wrap: break-word;"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis natus
          ad exercitationem, inventore molestias assumenda deserunt quos aut et
          atque esse, neque itaque tenetur. Animi beatae sapiente quam delectus
          vitae. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
          aliquam, saepe esse animi quae nostrum totam quam iste alias et veniam
          aliquid illo cumque quo enim, sed optio nesciunt doloribus!
        </div>
      </div>
      }
    </div>
  `,
})
export class VideoComponent {
  private videoService = inject(VideoService);
  private router = inject(Router);

  public videoNames!: string[];

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.videoService.getAllVideoNames().subscribe((apiData: string[]) => {
      this.videoNames = apiData;
    });
  }

  getVideoThumbnail(name: string) {
    return BACKEND.playVideo(name) + '#t=3';
  }

  playVideo(name: string) {
    this.router.navigate([`${frontendUrl.videos}/${name}`]);
  }
}
