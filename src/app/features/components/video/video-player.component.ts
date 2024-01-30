import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

import { BACKEND } from '../../../shared/environments/backend';
import { VideoService } from '../../services/video.service';
import { CommentsComponent } from './video-comments.component';

@Component({
  standalone: true,
  imports: [
    CommentsComponent,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
  ],
  selector: 'app-videoplayer',
  template: `
    <div class="container-primary bg-page-chat">
      <br />
      <div class="width-70 margin-auto">
        <!-- video -->
        <div class="margin-bottom-sm width-100">
          <video class="border-rounded-sm" controls>
            <source src="{{ videoUrl }}" type="video/mp4" />
          </video>
        </div>
        <!-- video description -->
        <div class="margin-bottom-sm">
          <mat-accordion>
            <mat-expansion-panel
              (opened)="panelOpenState = true"
              (closed)="panelOpenState = false"
            >
              <mat-expansion-panel-header>
                <mat-panel-title> Video description </mat-panel-title>
                <mat-panel-description class="flex-row flex-end">
                  <mat-icon>info</mat-icon>
                </mat-panel-description>
              </mat-expansion-panel-header>
              <p>{{ videoDescription }}</p>
            </mat-expansion-panel>
          </mat-accordion>
        </div>

        <!-- comments -->
        <app-comments [videoName]="videoName"></app-comments>
      </div>
      <br />
    </div>
  `,
})
export class VideoPlayerComponent {
  /** PROPERTIES
   **************************************/
  public videoName: any;
  public videoDescription: string = '';
  public videoUrl: string;
  public panelOpenState = false;

  /** SERVICES
   **************************************/
  private activatedRoute = inject(ActivatedRoute);
  private videoService = inject(VideoService);

  constructor() {
    this.videoName = this.activatedRoute.snapshot.paramMap.get('name');
    this.videoUrl = BACKEND.playVideo(this.videoName);
    this.videoService
      .getVideoDescription(this.videoName)
      .subscribe((response) => {
        this.videoDescription = response;
      });
  }
}
