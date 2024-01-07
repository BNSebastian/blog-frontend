import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { CustomCookieService } from '../../../core/services/custom-cookie.service';
import { ForumCommentInterface } from '../../models/forum';
import { ForumCommentService } from '../../services/forum-comment.service';

@Component({
  selector: 'app-forum-comment',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatButtonModule],
  styles: `
    .container {
      margin-bottom: 0.5rem;
      .actions {
        display: flex;
        justify-content: space-between;
      }
    }
  `,
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>{{ forumComment.userEmail }}</mat-card-header>
        <mat-card-content>{{ forumComment.content }}</mat-card-content>
        <mat-card-actions class="actions">
          <div>
            <button
              mat-icon-button
              color="primary"
              (click)="like(forumComment.id)"
            >
              <mat-icon> thumb_up </mat-icon>
            </button>
            <span>{{ forumComment.likes }}</span>
          </div>
          <div>
            <button
              mat-icon-button
              color="warn"
              (click)="dislike(forumComment.id)"
            >
              <mat-icon> thumb_down </mat-icon>
            </button>
            <span>{{ forumComment.dislikes }}</span>
          </div>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
})
export class ForumCommentComponent {
  @Input()
  public forumComment!: ForumCommentInterface;

  private forumCommentService = inject(ForumCommentService);
  private cookieService = inject(CustomCookieService);

  like(commentId: number) {
    this.forumCommentService
      .like({ userEmail: this.cookieService.getUserEmail() }, commentId)
      .subscribe((response) => {
        this.forumComment.likes = response;
      });
  }

  dislike(commentId: number) {
    this.forumCommentService
      .dislike({ userEmail: this.cookieService.getUserEmail() }, commentId)
      .subscribe((response) => {
        this.forumComment.dislikes = response;
      });
  }
}
