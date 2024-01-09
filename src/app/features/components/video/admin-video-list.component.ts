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
  styles: `
    .container {
      height: 100vh;
      width: 50vw;
      margin-top: 3rem;
      margin-left: auto;
      margin-right: auto;
      .button {
        width: 15%;
      }
    }
  `,
  template: `
    <div class="container">
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let name">{{ name }}</td>
        </ng-container>

        <ng-container matColumnDef="edit" class="button">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let name">
            <button (click)="editVideo(name)" mat-icon-button color="primary">
              <mat-icon>edit</mat-icon>
            </button>
          </td>
        </ng-container>

        <ng-container matColumnDef="delete" class="button">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let name">
            <button (click)="deleteVideo(name)" color="warn" mat-icon-button>
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `,
})
export class AdminVideoListComponent {
  /** properties
   **************************************/
  displayedColumns: string[] = ['name', 'edit', 'delete'];
  dataSource!: string[];

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
  loadData() {
    this.videoService.getAllVideoNames().subscribe((apiData: string[]) => {
      this.dataSource = apiData;
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
