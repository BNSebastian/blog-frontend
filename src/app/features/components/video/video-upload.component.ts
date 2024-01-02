import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

import { frontendUrl } from '../../../shared/environments/frontend';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-video-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<div>
    <div>
      <form
        enctype="multipart/form-data"
        [formGroup]="form"
        (ngSubmit)="uploadVideo()"
      >
        <div>
          <label for="name">Video name</label>
          <input formControlName="name" type="text" />
        </div>

        <div>
          <label for="file">File path</label>
          <input
            formControlName="video"
            type="file"
            (change)="onFileSelected($event)"
          />
        </div>

        <div>
          <button type="submit">Upload</button>
        </div>

        <div>
          <button (click)="cancel()">Cancel</button>
        </div>
      </form>
    </div>
  </div>`,
})
export class VideoUploadComponent {
  @Output() public cancelEvent = new EventEmitter();
  public form!: FormGroup;

  private videoService = inject(VideoService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', {
        nonNullable: true,
      }),
      video: new FormControl(null),
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.form.patchValue({
        video: file,
      });
      this.form.get('video')?.updateValueAndValidity();
    }
  }
  uploadVideo() {
    if (this.form.valid) {
      const formData = new FormData();
      const file: File | null = this.form.get('video')!.value;

      if (file) {
        formData.append('file', file, file.name);
        formData.append('name', this.form.get('name')!.value);

        this.videoService.uploadVideo(formData).subscribe(
          (response) => {
            console.log('File uploaded successfully!', response);
            this.cancel();
          },
          (error) => {
            console.error('Error uploading file:', error);
            this.notFound();
          }
        );
      } else {
        console.error('No file selected.');
      }
    }
  }

  cancel() {
    this.cancelEvent.emit(false);
    this.router.navigateByUrl(frontendUrl.home);
  }

  notFound() {
    this.cancelEvent.emit(false);
    this.router.navigateByUrl('/404');
  }
}
