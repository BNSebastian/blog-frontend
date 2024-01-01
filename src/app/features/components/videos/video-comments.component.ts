import { Component, inject, Input, TemplateRef } from '@angular/core';

import { CustomCookieService } from '../../../core/services/custom-cookie.service';
import { VideoCommentInterface } from '../../models/video-comments';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-video-comments',
  standalone: true,
  imports: [],
  template: `<div class="w-full max-w-6xl mx-auto px-4 md:px-6 ">
    <div
      class="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16"
    >
      <div class="w-full max-w-3xl mx-auto">
        <div class="-my-6">
          @for (item of videoComments; track $index) {
          <!-- Item #1 -->
          <div class="relative pl-8 sm:pl-32 py-6 group">
            <!-- Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) -->
            <div
              class="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5"
            >
              <time
                class="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full"
                >{{ item.createdOn }}</time
              >
              <div class="text-lg italic font-bold text-slate-900">
                {{ item.userEmail }}
              </div>
            </div>
            <!-- Content -->
            <div class="text-slate-500">
              {{ item.content }}
            </div>
            @if(item.userEmail == this.userEmail) {
            <div
              class="bg-blue-400 text-center hover:cursor-pointer w-full max-w-3xl mx-auto px-4 py-1 rounded-md md:px-6 mt-1 active:-translate-y-1 transition-all"
              (click)="toggleCommentEditing(item.id)"
            >
              edit
            </div>
            }
          </div>
          }
        </div>
      </div>
    </div>
  </div>`,
})
export class VideoCommentsComponent {
  private videoService = inject(VideoService);

  private cookieService = inject(CustomCookieService);

  @Input()
  public videoName!: string;

  public userEmail!: string;

  public videoComments!: VideoCommentInterface[];

  public editingComment: boolean = false;

  public commentToBeEdited!: number;

  ngOnInit(): void {
    this.loadData();
    this.videoService.commentAdded$.subscribe(() => {
      this.loadData(); // Reload data when a comment is added
    });
    this.userEmail = this.cookieService.getUserEmail();
  }

  loadData() {
    this.videoService
      .getVideoComments(this.videoName)
      .subscribe((apiData: VideoCommentInterface[]) => {
        this.videoComments = apiData;
      });
  }

  toggleCommentEditing(id: number) {
    const delayTime = 150;
    setTimeout(() => {
      this.editingComment = !this.editingComment;
      this.commentToBeEdited = id;
    }, delayTime);
    console.log(this.editingComment);
  }
}
