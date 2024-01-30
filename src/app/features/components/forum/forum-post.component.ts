import { Component, inject, Input, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';

import { CustomCookieService } from '../../../core/services/custom-cookie.service';
import {
  ForumCommentCreateInterface,
  ForumCommentInterface,
  ForumPostInterface,
} from '../../models/forum';
import { ForumCommentService } from '../../services/forum-comment.service';
import { ForumPostService } from '../../services/forum-post.service';
import { ForumCommentFormComponent } from './forum-comment-form.component';
import { ForumCommentComponent } from './forum-comment.component';

@Component({
  selector: 'app-forum-post',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatCardModule,
    ForumCommentComponent,
    ForumCommentFormComponent,
  ],
  template: `
    <div class="container">
      <div class="create">
        <mat-accordion #accordion>
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title> Write a new comment</mat-panel-title>
            </mat-expansion-panel-header>
            <!-- add comment -->
            <app-forum-comment-form
              submitLabel="Create"
              [hasCancelButton]="true"
              (handleSubmit)="createComment($event)"
              (handleCancel)="closeCreationPanel()"
            ></app-forum-comment-form>
          </mat-expansion-panel>
        </mat-accordion>
      </div>

      @for (comment of comments; track $index) {
      <app-forum-comment [forumComment]="comment"></app-forum-comment>
      }
    </div>
  `,
})
export class ForumPostComponent {
  public post!: ForumPostInterface;
  public comments!: ForumCommentInterface[];

  @ViewChild(MatAccordion)
  public accordion!: MatAccordion;

  private activatedRoute = inject(ActivatedRoute);
  private postService = inject(ForumPostService);
  private commentService = inject(ForumCommentService);
  private cookieService = inject(CustomCookieService);

  ngOnInit(): void {
    const postId: number = Number(
      this.activatedRoute.snapshot.paramMap.get('id')
    );

    this.postService
      .getById(postId)
      .subscribe((response: ForumPostInterface) => {
        this.post = response;
        this.loadComments(postId);
        this.incrementViewCount(
          this.post.id,
          this.cookieService.getUserEmail()
        );
      });
  }

  loadComments(postId: number) {
    this.commentService
      .getAll(this.post.id)
      .subscribe((response: ForumCommentInterface[]) => {
        this.comments = response;
      });
  }

  createComment(event: string) {
    // generate input
    const requestBody: ForumCommentCreateInterface = {
      postId: this.post.id,
      content: event,
      userEmail: this.cookieService.getUserEmail(),
    };

    // make request
    this.commentService.create(requestBody).subscribe((response) => {
      this.comments = [...this.comments, response];
    });
  }

  closeCreationPanel() {
    if (this.accordion) {
      this.accordion.closeAll();
    }
  }

  incrementViewCount(postId: number, userEmail: string) {
    this.postService
      .incrementPostViewCount(userEmail, postId)
      .subscribe((response) => {
        return response;
      });
  }
}
