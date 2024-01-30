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
      <div class="margin-auto flex-row flex-wrap">
        @for (item of videoNames; track $index) {
        <mat-card
          (click)="playVideo(item)"
          class="bg-secondary width-30 margin-sm hover"
        >
          <mat-card-header>
            <mat-card-title-group>
              <mat-card-title>{{ item }}</mat-card-title>
              <mat-card-subtitle
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
                saepe vitae. Cumque distinctio esse ipsa maxime vitae, soluta
                ullam consectetur similique. At corrupti exercitationem sint qui
                id similique est vero! Lorem ipsum dolor sit amet. Lorem ipsum,
                dolor sit amet consectetur adipisicing elit. Consectetur maxime
                doloremque cumque soluta ex saepe impedit laborum maiores
                voluptatibus. Velit minima laudantium optio expedita omnis neque
                vitae provident blanditiis quisquam.</mat-card-subtitle
              >
            </mat-card-title-group>
          </mat-card-header>
          <mat-card-content>
            <video
              class="width-100"
              style="max-width: 100%"
              [src]="getVideoThumbnail(item)"
            ></video>
          </mat-card-content>
        </mat-card>
        }
      </div>
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
