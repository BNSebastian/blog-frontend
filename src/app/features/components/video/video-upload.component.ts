import { CommonModule } from '@angular/common';
import {
  HttpEvent,
  HttpEventType,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { defaultUrlMatcher, Router } from '@angular/router';

import { frontendUrl } from '../../../shared/environments/frontend';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-video-upload',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatProgressBarModule],
  styles: `
    .container {
      height: 100vh;
      width: 50%;
      margin: auto;
    }
  `,
  template: `<!-- start of HTML -->
    <div class="container">
      <mat-card>
        <mat-card-header
          ><mat-card-title
            ><strong>Upload video</strong></mat-card-title
          ></mat-card-header
        >
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
        <mat-card-actions>
          @if (fileStatus.status === 'progress') {
          <mat-progress-bar
            mode="determinate"
            value="{{ fileStatus.percent }}"
          ></mat-progress-bar>
          } @if (fileStatus.status === 'done') {<span
            >Files uploaded successfully</span
          >
          }
        </mat-card-actions>
      </mat-card>
    </div>
    <!-- end of HTML -->`,
})
export class VideoUploadComponent {
  public filenames: string[] = [];
  public fileStatus = { status: '', requestType: '', percent: 0 };

  private videoService = inject(VideoService);

  public onUploadFiles(files: File[]): void {
    for (const file of files) {
      const formData = new FormData();
      formData.append('files', file, file.name);

      this.videoService.uploadVideo(formData).subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            // Calculate progress for individual files and update their status separately
            const percent = Math.round((100 * event.loaded) / event.total);
            console.log(`File ${file.name} is ${percent}% uploaded.`);
            // Here you might want to update a progress object or emit an event
            // to update the UI for this particular file
          } else if (event instanceof HttpResponse) {
            console.log(`File ${file.name} is completely uploaded!`);
            // Handle completion for individual files if needed
          }
        },
        (err) => console.error(err)
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

  private reportProgress(httpEvent: HttpEvent<string[]>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading');
        break;

      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading');
        break;

      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;

      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          // download logic not implemented
        }
        this.fileStatus.status = 'done';
        break;

      default:
        console.log(httpEvent);
    }
  }

  updateStatus(loaded: number, total: number, requestType: string) {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round((loaded / total) * 100);
  }
}
