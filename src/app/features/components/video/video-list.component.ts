import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

import { frontendUrl } from '../../../shared/environments/frontend';
import { VideoService } from '../../services/video.service';
import { VideoPlayerComponent } from './video-player.component';

@Component({
  standalone: true,
  imports: [VideoPlayerComponent, MatCardModule],
  selector: 'app-videos',
  styles: [
    `
      .container {
        height: 100vh;
        margin: 1rem;
        display: flex;
      }

      .example-card {
        width: 15rem;
        height: 10rem;
        margin: 1rem;
      }
    `,
  ],
  template: `
    <div class="container">
      @for (item of videoNames; track $index) {
      <mat-card class="example-card">
        <mat-card-header>
          <mat-card-title>{{ item }}</mat-card-title>
        </mat-card-header>
        <mat-card-actions>
          <button mat-button (click)="playVideo(item)">Play</button>
        </mat-card-actions>
      </mat-card>
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

  playVideo(name: string) {
    this.router.navigate([`${frontendUrl.videos}/${name}`]);
  }
}
