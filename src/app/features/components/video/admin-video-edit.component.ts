import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

import { FRONTEND } from '../../../shared/environments/frontend';
import { VideoInterface } from '../../models/video';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-admin-video-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="container-primary bg-page-admin flex-row flex-center">
      @if (!isLoading) {
      <form [formGroup]="formData" class="form">
        <mat-card>
          <mat-card-header>
            <mat-card-title><strong>Edit video</strong></mat-card-title>
          </mat-card-header>

          <mat-card-content>
            <mat-form-field class="width-100" floatLabel="always">
              <mat-label>name</mat-label>
              <input matInput formControlName="name" />
            </mat-form-field>

            <mat-form-field class="width-100" floatLabel="always">
              <mat-label>description</mat-label>
              <input matInput formControlName="description" />
            </mat-form-field>
          </mat-card-content>

          <mat-card-actions>
            <button
              (click)="onSubmit()"
              mat-raised-button
              color="primary"
              class="width-100"
            >
              Update video
            </button>
          </mat-card-actions>
        </mat-card>
      </form>
      } @else { <mat-spinner class="spinner"></mat-spinner>}
    </div>
  `,
})
export class AdminVideoEditComponent {
  formData!: FormGroup;
  videoName!: string | null;
  videoDescription!: string;
  isLoading: boolean = false;
  private router = inject(Router);

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit() {
    this.videoName = this.getVideoName();
    if (this.videoName) {
      this.getVideoDescription(this.videoName);
    }
    this.createForm();
  }

  private createForm() {
    this.formData = this.formBuilder.group({
      name: new FormControl({ value: '', disabled: false }),
      description: new FormControl({ value: '', disabled: false }),
    });
  }

  getVideoName(): string | null {
    return this.activatedRoute.snapshot.paramMap.get('name');
  }

  getVideoDescription(name: string): void {
    this.videoService.getVideoDescription(name).subscribe(
      (description: string) => {
        this.videoDescription = description;
        this.updateFormValues();
      },
      (error) => {
        console.error('Error fetching video description:', error);
      }
    );
  }

  updateFormValues() {
    this.formData.patchValue({
      name: this.videoName,
      description: this.videoDescription,
    });
  }

  onSubmit() {
    if (this.formData.valid) {
      this.isLoading = true;
      const formData = this.formData.value;
      this.videoService
        .setVideoDescription(formData.name, formData.description)
        .subscribe((response: string) => {
          console.log(response);
        });
    }
    const delayTime = 2000;
    setTimeout(() => {
      this.router.navigate([FRONTEND.manageVideos()]);
    }, delayTime);
  }
}
