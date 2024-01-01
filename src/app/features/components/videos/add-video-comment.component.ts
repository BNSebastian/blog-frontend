import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { CustomCookieService } from '../../../core/services/custom-cookie.service';
import {
  CreateVideoCommentInterface,
  VideoCommentRequest,
} from '../../models/video-comments';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-add-video-comment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `@if (!createComment) {
    <div
      class="bg-blue-400 text-center hover:cursor-pointer w-full max-w-3xl mx-auto px-4 py-1 rounded-md md:px-6 mt-2 active:translate-y-1 transition-all"
      (click)="toggleCommentCreation()"
    >
      create comment
    </div>
    } @else {
    <div class="max-w-3xl text-center w-full mx-auto">
      <form [formGroup]="form">
        <textarea
          formControlName="content"
          id=""
          cols="30"
          rows="10"
          class="w-full border border-blue-800 rounded-md bg-blue-50 mt-3"
        ></textarea>
      </form>

      <div
        class="bg-blue-400 text-center hover:cursor-pointer w-full max-w-3xl mx-auto px-4 py-1 rounded-md md:px-6 mt-1 active:-translate-y-1 transition-all"
        (click)="onSubmit()"
      >
        post comment
      </div>
    </div>
    }`,
})
export class AddVideoCommentComponent {
  @Input() public videoName!: string;
  public form!: FormGroup;
  public createComment: boolean = false;

  private formBuilder = inject(FormBuilder);
  private cookieService = inject(CustomCookieService);
  private videoService = inject(VideoService);

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      userEmail: new FormControl(this.cookieService.getUserEmail()),
      videoName: new FormControl(this.videoName),
      content: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const comment: CreateVideoCommentInterface = {
        parentId: null,
        userEmail: this.form.value.userEmail,
        videoName: this.form.value.videoName,
        content: this.form.value.content,
      };

      this.videoService.createVideoComment(comment).subscribe(
        (response) => {
          console.log('Response body:', response);
          this.toggleCommentCreation();
          setTimeout(() => {
            this.videoService.notifyCommentAdded();
          }, 500);
        },
        (error) => {
          console.log(comment);
          console.log('API error:', error);
        }
      );
    }
  }

  toggleCommentCreation() {
    const delayTime = 150;
    setTimeout(() => {
      this.createComment = !this.createComment;
    }, delayTime);
  }
}
