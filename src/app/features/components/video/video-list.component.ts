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
    <div class="container-main bg-page-chat">
      <div class="width-70">
        <!-- <table mat-table [dataSource]="videoNames" class="mat-elevation-z8">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let element">{{ element }}</td>
          </ng-container>

          <ng-container matColumnDef="play">
            <th mat-header-cell *matHeaderCellDef>Play</th>
            <td mat-cell *matCellDef="let element">
              <button
                (click)="playVideo(element)"
                mat-raised-button
                color="primary"
              >
                Play video
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table> -->
        @for (item of videoNames; track $index) {
        <mat-card class="width-50" (click)="playVideo(item)">
          <mat-card-header>
            <mat-card-title>{{ item }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <video
              style="max-width: 400px"
              [src]="getVideoSource(item)"
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
  displayedColumns: string[] = ['name', 'play'];
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.videoService.getAllVideoNames().subscribe((apiData: string[]) => {
      this.videoNames = apiData;
    });
  }

  getVideoSource(name: string) {
    console.log(BACKEND.playVideo(name));
    return BACKEND.playVideo(name);
  }

  playVideo(name: string) {
    this.router.navigate([`${frontendUrl.videos}/${name}`]);
  }
}
