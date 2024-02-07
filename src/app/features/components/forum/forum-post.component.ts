import { Component, inject, Input, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

import { CustomCookieService } from '../../../core/services/custom-cookie.service';
import {
    ForumCommentCreateInterface, ForumCommentInterface, ForumPostInterface
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
    MatPaginatorModule,
  ],
  template: `
    <div class="container-primary bg-page-chat">
      <br />
      <!-- create post form -->
      <div class="width-70 margin-auto margin-bottom-sm">
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
      <!-- post list -->
      <mat-paginator
        class="width-70 margin-x-auto margin-bottom-xsm"
        [length]="length"
        [pageSize]="pageSize"
        [showFirstLastButtons]="true"
        [pageSizeOptions]="pageSizeOptions"
        [pageIndex]="pageIndex"
        (page)="handlePageEvent($event)"
        aria-label="Select page"
      >
      </mat-paginator>
      <div class="width-70 margin-x-auto">
        @for (comment of comments; track $index) {
        <app-forum-comment [forumComment]="comment"></app-forum-comment>
        }
      </div>
      <br />
    </div>
  `,
})
export class ForumPostComponent {
  /* PAGINATOR
   ********************************************/
  public length = 50;
  public pageIndex = 0;
  public pageSizeOptions = [5, 10, 25, 50];
  public pageSize = this.pageSizeOptions[0];

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getPage();
  }

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
        this.getSize();
        this.getPage();
        this.incrementViewCount(
          this.post.id,
          this.cookieService.getUserEmail()
        );
      });
  }

  getSize() {
    this.commentService.getSize(this.post.id).subscribe((response) => {
      this.length = response;
    });
  }

  getPage() {
    this.commentService
      .getPage(this.post.id, this.pageIndex, this.pageSize)
      .subscribe((response) => {
        this.comments = response;
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
      this.getSize();
      this.getPage();
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
