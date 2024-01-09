import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

import { FRONTEND, frontendUrl } from '../../../shared/environments/frontend';
import { VideoService } from '../../services/video.service';
import { VideoPlayerComponent } from './video-player.component';

@Component({
  standalone: true,
  imports: [VideoPlayerComponent, MatCardModule],
  selector: 'app-videos',
  styles: [
    `
      .grid-container {
        height: 100vh;
        margin: 1rem;
        display: grid;
        grid-template-columns: repeat(
          auto-fill,
          minmax(200px, 1fr)
        ); /* Creates columns with minimum width of 200px */
        gap: 10px; /* Spacing between grid items */

        .grid-item {
          text-align: center;
          /* Optional: Define styles for each grid item */
        }
      }
    `,
  ],
  template: `
    <div class="grid-container">
      @for (item of videoNames; track $index) {
      <mat-card class="grid-item">
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

  // ngOnDestroy() {
  //   this.router.navigate([FRONTEND.getHome()]);
  // }

  loadData() {
    this.videoService.getAllVideoNames().subscribe((apiData: string[]) => {
      this.videoNames = apiData;
    });
  }

  playVideo(name: string) {
    this.router.navigate([`${frontendUrl.videos}/${name}`]);
  }
}
