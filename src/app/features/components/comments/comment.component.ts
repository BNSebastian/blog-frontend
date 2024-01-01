import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  ActiveCommentInterface,
  ActiveCommentTypeEnum,
  CreateVideoCommentInterface,
  UpdateVideoCommentInterface,
  VideoCommentInterface,
} from '../../models/video-comments';
import { CommentFormComponent } from './comment-form.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommentFormComponent],
  styles: ``,
  template: ` <!-- start of HTML -->
    <div class="comment">
      <div class="comment-image-container">
        <img src="" />
      </div>
      <div class="comment-right-parth">
        <div class="comment-content">
          <div class="comment-author">
            {{ comment.userEmail }}
          </div>
        </div>
        @if (!isEditing) {
        <div class="comment-text">
          {{ comment.content }}
        </div>
        } @if (isEditing()) {
        <app-comment-form
          submitLabel="update"
          [hasCancelButton]="true"
          [initialText]="comment.content"
          (handleSubmit)="
            updateComment.emit({ id: comment.id, content: $event })
          "
          (handleCancel)="setActiveComment.emit(null)"
        ></app-comment-form
        >}

        <div class="edit-comment-actions">
          @if (canReply) {
          <div
            class="comment-actions"
            (click)="
              setActiveComment.emit({
                id: comment.id,
                type: activeCommentType.replying
              })
            "
          >
            Reply
          </div>
          } @if (canEdit) {
          <div
            class="comment-actions"
            (click)="
              setActiveComment.emit({
                id: comment.id,
                type: activeCommentType.editing
              })
            "
          >
            Edit
          </div>
          } @if (canDelete) {
          <div class="comment-actions" (click)="deleteComment.emit(comment.id)">
            Delete
          </div>
          }
        </div>

        @if(isReplying()){
        <app-comment-form
          submitLabel="reply"
          (handleSubmit)="
            addComment.emit({ parentId: comment.id, content: $event })
          "
        ></app-comment-form>
        } @if(replies.length > 0) {
        <div class="replies">
          @for (reply of replies; track $index) {
          <app-comment
            [comment]="reply"
            (setActiveComment)="setActiveComment.emit($event)"
            [activeComment]="activeComment"
            (addComment)="addComment.emit($event)"
            (updateComment)="updateComment.emit($event)"
            [parentId]="comment.id"
            [replies]="[]"
            [currentUserId]="currentUserId"
            (deleteComment)="deleteComment.emit($event)"
          ></app-comment
          >}
        </div>
        }
      </div>
    </div>
    <!-- end of HTML -->`,
})
export class CommentComponent implements OnInit {
  @Input()
  comment!: VideoCommentInterface;

  @Input()
  replies!: VideoCommentInterface[];

  @Input()
  currentUserId!: number;

  @Input()
  activeComment!: ActiveCommentInterface | null;

  @Input()
  parentId: number | null = null;

  public outputFromForm: string = '';

  // null for the cancel button
  @Output()
  setActiveComment = new EventEmitter<ActiveCommentInterface | null>();

  @Output()
  addComment = new EventEmitter<{ parentId: number; content: string }>();

  @Output()
  updateComment = new EventEmitter<UpdateVideoCommentInterface>();

  @Output()
  deleteComment = new EventEmitter<number>();

  canReply: boolean = false;

  canEdit: boolean = false;

  canDelete: boolean = false;

  activeCommentType = ActiveCommentTypeEnum;

  replyId: number | null = null;

  ngOnInit(): void {
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
}
