import { forkJoin, map } from 'rxjs';

import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

import { FRONTEND, frontendUrl } from '../../../shared/environments/frontend';
import { VideoInterface } from '../../models/video';
import { VideoService } from '../../services/video.service';
import { VideoPlayerComponent } from './video-player.component';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [
    VideoPlayerComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
  ],
  template: `
    <div class="container-primary bg-page-admin flex-row flex-center">
      <div class="width-70">
        <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let row">{{ row.name }}</td>
          </ng-container>

          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef>Description</th>
            <td mat-cell *matCellDef="let row" class="text-center">
              {{ row.description }}
            </td>
          </ng-container>

          <ng-container matColumnDef="edit" class="button">
            <th mat-header-cell *matHeaderCellDef>Edit</th>
            <td mat-cell *matCellDef="let row">
              <button
                (click)="editVideo(row.name)"
                mat-icon-button
                color="primary"
              >
                <mat-icon>edit</mat-icon>
              </button>
            </td>
          </ng-container>

          <ng-container matColumnDef="delete" class="button">
            <th mat-header-cell *matHeaderCellDef>Delete</th>
            <td mat-cell *matCellDef="let row">
              <button
                (click)="deleteVideo(row.name)"
                color="warn"
                mat-icon-button
              >
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </div>
    </div>
  `,
})
export class AdminVideoListComponent {
  /** properties
   **************************************/
  displayedColumns: string[] = ['name', 'description', 'edit', 'delete'];
  dataSource: { name: string; description: string }[] = [];

  /** services
   **************************************/
  private videoService = inject(VideoService);
  private router = inject(Router);

  /** states
   **************************************/
  ngOnInit(): void {
    this.loadData();
  }

  /** methods
   **************************************/
  // Load video data from the service
  loadData() {
    this.videoService.getAllVideoNames().subscribe((response: string[]) => {
      const observables = response.map((name) =>
        this.videoService.getVideoDescription(name)
      );

      forkJoin(observables).subscribe((descriptions: string[]) => {
        this.dataSource = response.map((name, index) => ({
          name,
          description: descriptions[index],
        }));
      });
    });
  }

  editVideo(name: string) {
    this.router.navigate([FRONTEND.manageVideo(name)]);
  }

  deleteVideo(name: string): void {
    this.videoService.deleteVideo(name).subscribe((response) => {
      this.loadData();
    });
  }
}
