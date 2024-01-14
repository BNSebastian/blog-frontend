import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { CustomCookieService } from '../../../core/services/custom-cookie.service';
import { UserService } from '../../../core/services/user.service';
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
    .profile-image {
      width: 3rem; /* Adjust the width as per your requirement */
      height: 3rem; /* Adjust the height as per your requirement */
      border-radius: 10%; /* Creates a circular profile image */
      object-fit: cover; /* Ensures the image covers the entire container */
    }
  `,
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <div mat-card-avatar>
            @if (userProfileImage) {
            <img [src]="userProfileImage" class="profile-image" alt="saved" />
            } @else {
            <img src="../../../../assets/profile_image.png" />
            }
          </div>
          <mat-card-title>{{ forumComment.userEmail }}</mat-card-title>
        </mat-card-header>
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
  public userProfileImage: any;
  private forumCommentService = inject(ForumCommentService);
  private cookieService = inject(CustomCookieService);
  private userService = inject(UserService);
  private sanitizer = inject(DomSanitizer);

  ngOnInit() {
    this.getProfileImage(this.forumComment.userEmail);
  }

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
}
