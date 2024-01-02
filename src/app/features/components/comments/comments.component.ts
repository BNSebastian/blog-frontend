import { Component, inject, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

import { CustomCookieService } from '../../../core/services/custom-cookie.service';
import {
    ActiveCommentInterface, CreateVideoCommentInterface, UpdateVideoCommentInterface,
    VideoCommentInterface
} from '../../models/video-comments';
import { CommentsService } from '../../services/comments.service';
import { CommentFormComponent } from './comment-form.component';
import { CommentComponent } from './comment.component';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommentComponent, CommentFormComponent, MatExpansionModule],
  styles: [
    `
      // .comments-container {
      //   background-color: black;
      // }

      .create-comment {
        width: 50vw;
        margin: auto;
        margin-top: 1rem;
        margin-bottom: 1rem;
      }

      .comments-list {
        width: 50vw;
        margin: auto;
        padding-bottom: 1rem;
      }
    `,
  ],
  template: `<!-- start of HTML -->
    <div class="comments-container">
      <div class="create-comment">
        <mat-accordion>
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title> Write a new comment</mat-panel-title>
            </mat-expansion-panel-header>
            <!-- add comment -->
            <app-comment-form
              submitLabel="Write"
              (handleSubmit)="createRootComment($event)"
            ></app-comment-form>
          </mat-expansion-panel>
        </mat-accordion>
      </div>

      <!-- list of comments -->
      <div class="comments-list">
        @for (entry of comments; track $index) { @if (entry.parentId === null) {
        <app-comment
          [comment]="entry"
          [replies]="getReplies(entry.id)"
          [currentUserId]="currentUserId"
          [activeComment]="activeComment"
          (setActiveComment)="setActiveComment($event)"
          (addReply)="addReply($event)"
          (updateComment)="updateComment($event)"
          (deleteComment)="deleteComment($event)"
        ></app-comment>
        } }
      </div>
    </div>
    <!-- end of HTML -->`,
})
export class CommentsComponent {
  @Input() public videoName!: string;

  public currentUserId!: number;
  public comments: VideoCommentInterface[] = [];
  public activeComment: ActiveCommentInterface | null = null;

  private commentsService = inject(CommentsService);
  private cookieService = inject(CustomCookieService);

  ngOnInit(): void {
    this.loadData();
    // get current user id
    this.currentUserId = Number(this.cookieService.getUserId());
  }

  loadData() {
    this.commentsService
      .getComments(this.videoName)
      .subscribe((apiData: VideoCommentInterface[]) => {
        this.comments = apiData;
      });
  }

  createRootComment(event: string) {
    const newComment: CreateVideoCommentInterface = {
      parentId: null,
      videoName: this.videoName,
      userEmail: this.cookieService.getUserEmail(),
      content: event,
    };

    this.commentsService.createComment(newComment).subscribe((response) => {
      // rerender the array to update the comments
      this.comments = [...this.comments, response];
      this.activeComment = null;
    });
  }

  addReply(event: any) {
    const reply: CreateVideoCommentInterface = {
      parentId: event.parentId,
      videoName: this.videoName,
      userEmail: this.cookieService.getUserEmail(),
      content: event.content,
    };
    this.commentsService.createComment(reply).subscribe((response) => {
      // rerender the array to update the comments
      this.comments = [...this.comments, response];
      this.activeComment = null;
    });
  }

  updateComment(request: UpdateVideoCommentInterface) {
    const updatedComment: UpdateVideoCommentInterface = {
      id: request.id,
      content: request.content,
    };

    this.commentsService.updateComment(updatedComment).subscribe((response) => {
      this.comments = this.comments.map((comment) => {
        if (comment.id === request.id) {
          return response;
        }
        return comment;
      });
      this.activeComment = null;
    });
  }

  getReplies(commentId: number): VideoCommentInterface[] {
    return this.comments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdOn).getMilliseconds() -
          new Date(b.createdOn).getMilliseconds()
      );
  }

  deleteComment(commentId: number): void {
    const delayTime = 150;
    setTimeout(() => {
      this.commentsService.deleteComment(commentId).subscribe();
    }, delayTime);
    this.comments = this.comments.filter((comment) => comment.id !== commentId);
  }

  setActiveComment(activeComment: ActiveCommentInterface | null): void {
    this.activeComment = activeComment;
  }
}
