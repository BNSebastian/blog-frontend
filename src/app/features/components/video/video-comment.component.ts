import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { UserService } from '../../../core/services/user.service';
import {
  ActiveCommentInterface,
  ActiveCommentTypeEnum,
  CreateVideoCommentInterface,
  UpdateVideoCommentInterface,
  VideoCommentInterface,
} from '../../models/video-comment';
import { CommentsService } from '../../services/video-comment.service';
import { CommentFormComponent } from './video-comment-form.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommentFormComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: ` <!-- start of HTML -->
    <div class="">
      @if (comment.parentId == null) { }
      <mat-card class="margin-bottom-xsm">
        <mat-card-header>
          <div mat-card-avatar>
            @if (userProfileImage) {
            <img [src]="userProfileImage" class="profile-image" alt="saved" />
            } @else {
            <img src="../../../../assets/profile_image.png" />
            }
          </div>
          <mat-card-title>{{ comment.userEmail }}</mat-card-title>
          @if (parentName) {
          <mat-card-subtitle>Replying to: {{ parentName }}</mat-card-subtitle>
          }
        </mat-card-header>

        <mat-card-content>
          @if (!isEditing()) {
          {{ comment.content }}
          } @if (isEditing()) {
          <app-comment-form
            submitLabel="update"
            [hasCancelButton]="true"
            [initialText]="comment.content"
            (handleSubmit)="
              updateComment.emit({ id: comment.id, content: $event })
            "
            (handleCancel)="setActiveComment.emit(null)"
          >
          </app-comment-form>
          }
        </mat-card-content>

        <mat-card-actions align="end">
          @if (canReply) {
          <button
            mat-icon-button
            color="primary"
            (click)="
              setActiveComment.emit({
                id: comment.id,
                type: activeCommentType.replying
              })
            "
          >
            <mat-icon>reply</mat-icon>
          </button>
          } @if (canEdit) {
          <button
            mat-icon-button
            color="primary"
            (click)="
              setActiveComment.emit({
                id: comment.id,
                type: activeCommentType.editing
              })
            "
          >
            <mat-icon>edit</mat-icon>
          </button>
          } @if (canDelete) {
          <button
            mat-icon-button
            color="warn"
            (click)="deleteComment.emit(comment.id)"
          >
            <mat-icon>delete</mat-icon>
          </button>
          }
        </mat-card-actions>
      </mat-card>

      @if (isReplying() && comment.parentId === null) {
      <mat-card class="margin-bottom-xsm">
        <mat-card-content>
          <app-comment-form
            submitLabel="reply"
            (handleSubmit)="
              addReply.emit({
                parentId: comment.id,
                content: $event
              })
            "
            [hasCancelButton]="true"
            (handleCancel)="this.activeComment = null"
          >
          </app-comment-form>
        </mat-card-content>
      </mat-card>
      } @if (isReplying() && comment.parentId !== null) {
      <mat-card class="margin-bottom-xsm">
        <mat-card-content>
          <app-comment-form
            submitLabel="reply"
            (handleSubmit)="
              addReply.emit({
                parentId: comment.parentId,
                content: $event
              })
            "
            [hasCancelButton]="true"
            (handleCancel)="this.activeComment = null"
          >
          </app-comment-form>
        </mat-card-content>
      </mat-card>
      } @if (replies.length > 0) { @for (reply of replies; track $index) {
      <div class="margin-left-md margin-top-xsm">
        <app-comment
          [comment]="reply"
          [replies]="getReplies(reply.id)"
          [currentUserId]="currentUserId"
          [parentId]="comment.id"
          (setActiveComment)="setActiveComment.emit($event)"
          [activeComment]="activeComment"
          (addReply)="addReply.emit($event)"
          (updateComment)="updateComment.emit($event)"
          (deleteComment)="deleteComment.emit($event)"
        >
        </app-comment>
      </div>
      } }
    </div>

    <!-- end of HTML -->`,
})
export class CommentComponent implements OnInit {
  private videoCommentService = inject(CommentsService);
  private userService = inject(UserService);
  private sanitizer = inject(DomSanitizer);

  @Input() comment!: VideoCommentInterface;
  @Input() replies!: VideoCommentInterface[];
  @Input() currentUserId!: number;
  @Input() activeComment!: ActiveCommentInterface | null;
  @Input() parentId: number | null = null;

  // null for the cancel button
  @Output() setActiveComment =
    new EventEmitter<ActiveCommentInterface | null>();
  @Output() addReply = new EventEmitter<{
    parentId: number;
    content: string;
  }>();
  @Output() updateComment = new EventEmitter<UpdateVideoCommentInterface>();
  @Output() deleteComment = new EventEmitter<number>();

  canReply: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;

  activeCommentType = ActiveCommentTypeEnum;
  replyId: number | null = null;
  userProfileImage: any;
  parentName: string | null = null;

  outputFromForm: string = '';
  comments: VideoCommentInterface[] = [];

  ngOnInit(): void {
    this.getParentName();
    this.getProfileImage(this.comment.userEmail);
    const fiveMinutes = 300000; // 5 minutes
    const timePassed =
      new Date().getMilliseconds() -
        new Date(this.comment.createdOn).getMilliseconds() >
      fiveMinutes;

    this.canReply = Boolean(this.currentUserId);
    this.canEdit = this.currentUserId === this.currentUserId && !timePassed;
    this.canDelete =
      this.currentUserId === this.currentUserId &&
      !timePassed &&
      this.replies.length === 0;

    this.replyId = this.comment.parentId
      ? this.comment.parentId
      : this.comment.id;
  }

  isReplying(): boolean {
    if (!this.activeComment) {
      return false;
    }

    return (
      this.activeComment.id === this.comment.id &&
      this.activeComment.type === this.activeCommentType.replying
    );
  }

  isEditing(): boolean {
    if (!this.activeComment) return false;

    return (
      this.activeComment.id === this.comment.id &&
      this.activeComment.type === this.activeCommentType.editing
    );
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

  getProfileImage(userEmail: string) {
    this.userService.getUserProfileImage(userEmail).subscribe(
      (response: ArrayBuffer) => {
        const blob = new Blob([response], { type: 'image/png' });
        const imageUrl = URL.createObjectURL(blob);
        this.userProfileImage = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
      },
      (error) => {
        console.error('Error fetching user profile image:', error);
      }
    );
  }

  getParentName() {
    if (this.comment.parentId !== null) {
      this.videoCommentService
        .getComment(this.comment.parentId)
        .subscribe((response: VideoCommentInterface) => {
          this.parentName = response.userEmail;
        });
    }
  }
}
