import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { VideoStatusInterface } from '../../models/video';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-video-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    NgIf,
    NgFor,
  ],
  template: `<!-- start of HTML -->
    <div class="container bg-page-admin">
      <mat-card class="card">
        <mat-card-header>
          <mat-card-title>Upload videos</mat-card-title>
          <mat-card-subtitle
            >Once uploaded, the videos will have the same name as the file
            names.</mat-card-subtitle
          >
          <mat-card-subtitle
            >The video name, description and other details can be modified
            anytime.</mat-card-subtitle
          >
        </mat-card-header>

        <mat-card-content>
          <button type="button" mat-raised-button (click)="fileInput.click()">
            Choose files
          </button>
          <input
            hidden
            #fileInput
            type="file"
            name="files"
            multiple
            (change)="onUploadFiles($any($event.target).files)"
            class="form-control"
          />
        </mat-card-content>
        <div class="progress-bar">
          @for(entry of fileStatus; track $index) {
          <div class="upload">
            <div class="file-name">
              {{ entry.filename }}
              @if (entry.status === 'done') {
              <span>: uploaded successfully!</span>
              }
            </div>
            <div class="file-status">
              @if(entry.status === 'progress') {
              <div>
                <mat-progress-bar
                  mode="determinate"
                  value="{{ entry.percent }}"
                ></mat-progress-bar>
              </div>
              }
            </div>
            <mat-divider></mat-divider>
          </div>
          }
        </div>
      </mat-card>
    </div>
    <!-- end of HTML -->`,
})
export class VideoUploadComponent {
  public fileStatus: VideoStatusInterface[] = [];

  private videoService = inject(VideoService);

  public onUploadFiles(files: File[]): void {
    for (const file of files) {
      const formData = new FormData();
      formData.append('files', file, file.name);

      // Initialize the status for this file
      const fileStatus: VideoStatusInterface = {
        filename: file.name,
        status: 'pending',
        requestType: 'Uploading',
        percent: 0,
      };

      // Add status to the array
      this.fileStatus.push(fileStatus);

      this.videoService.uploadVideo(formData).subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            // Calculate progress for individual files and update their status separately
            const percent = Math.round((100 * event.loaded) / event.total);
            // Update the status in the map for this file
            this.updateStatusInArray(
              file.name,
              'progress',
              'Uploading',
              percent
            );
          } else if (event instanceof HttpResponse) {
            // Update status to 'done' when the file upload is complete
            this.updateStatusInArray(file.name, 'done', 'Uploading', 100);
          }
        },
        (err) => console.error(err)
      );
    }
  }

  private updateStatusInArray(
    filename: string,
    status: string,
    requestType: string,
    percent: number
  ): void {
    const fileIndex = this.fileStatus.findIndex(
      (file) => file.filename === filename
    );
    if (fileIndex !== -1) {
      this.fileStatus[fileIndex].status = status;
      this.fileStatus[fileIndex].requestType = requestType;
      this.fileStatus[fileIndex].percent = percent;

      console.log(
        `File ${filename}: Status - ${status}, Progress - ${percent}%`
      );
    }
  }

  // public onUploadFiles(files: File[]): void {
  //   const formData = new FormData();

  //   for (const file of files) {
  //     formData.append('files', file, file.name);
  //   }

  //   this.videoService.uploadVideo(formData).subscribe(
  //     (event) => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         if (event.total) {
  //           this.fileStatus.status = 'progress';
  //           this.fileStatus.percent = Math.round(
  //             (100 * event.loaded) / event.total
  //           );
  //           console.log(`File is ${this.fileStatus.percent}% uploaded.`);
  //         } else {
  //           console.log('Total file size is unknown.');
  //           // Handle this case as needed (e.g., show a different message or handle the progress differently)
  //         }
  //       } else if (event instanceof HttpResponse) {
  //         console.log('File is completely uploaded!');
  //         console.log(event.body);
  //         this.fileStatus.status = 'done';
  //       }
  //     },
  //     (err) => console.error(err)
  //   );
  // }

  // public onUploadFiles(files: File[]): void {
  //   const formData = new FormData();

  //   for (const file of files) {
  //     formData.append('files', file, file.name);
  //   }

  //   this.videoService.uploadVideo(formData).subscribe(
  //     (event) => {
  //       this.reportProgress(event);
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error);
  //     }
  //   );
  // }

  // private reportProgress(httpEvent: HttpEvent<string[]>): void {
  //   switch (httpEvent.type) {
  //     case HttpEventType.UploadProgress:
  //       this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading');
  //       break;

  //     case HttpEventType.DownloadProgress:
  //       this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading');
  //       break;

  //     case HttpEventType.ResponseHeader:
  //       console.log('Header returned', httpEvent);
  //       break;

  //     case HttpEventType.Response:
  //       if (httpEvent.body instanceof Array) {
  //         for (const filename of httpEvent.body) {
  //           this.filenames.unshift(filename);
  //         }
  //       } else {
  //         // download logic not implemented
  //       }
  //       this.fileStatus.status = 'done';
  //       break;

  //     default:
  //       console.log(httpEvent);
  //   }
  // }

  // updateStatus(loaded: number, total: number, requestType: string) {
  //   this.fileStatus.status = 'progress';
  //   this.fileStatus.requestType = requestType;
  //   this.fileStatus.percent = Math.round((loaded / total) * 100);
  // }
}
