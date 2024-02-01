import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router, RouterLink } from '@angular/router';

import { FRONTEND } from '../../../shared/environments/frontend';
import { ForumPostCreateInterface, ForumPostInterface } from '../../models/forum';
import { ForumPostService } from '../../services/forum-post.service';
import { ForumPostFormComponent } from './forum-post-form.component';
import { ForumPostComponent } from './forum-post.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    ForumPostComponent,
    ForumPostFormComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    RouterLink,
    MatPaginatorModule,
  ],
  template: `
    <div class="container-primary bg-page-chat">
      <br />
      <!-- create post -->
      <div class="width-70 margin-bottom-sm margin-auto">
        <app-forum-post-form
          submitLabel="Create"
          [hasCancelButton]="true"
          (handleSubmit)="createPost($event)"
        ></app-forum-post-form>
      </div>
      <mat-paginator
        class="width-70 margin-auto margin-bottom-xsm"
        [length]="length"
        [pageSize]="pageSize"
        [showFirstLastButtons]="true"
        [pageSizeOptions]="pageSizeOptions"
        [pageIndex]="pageIndex"
        (page)="handlePageEvent($event)"
        aria-label="Select page"
      >
      </mat-paginator>
      <!-- posts -->
      <div class="width-70 margin-auto">
        <!-- pinned posts list -->
        @for (post of posts; track $index) { @if (post.pinned) {
        <div (click)="goToPost(post.id)" class="margin-bottom-xsm hover">
          <mat-card>
            <mat-card-header>
              <mat-card-title>{{ post.name }}</mat-card-title>
              <mat-card-subtitle
                >Created by {{ post.userEmail }} on:
                {{ post.createdOn }}</mat-card-subtitle
              ></mat-card-header
            >
            <mat-card-actions align="end">
              <div>
                <button mat-icon-button (click)="pinPost($event, post.id)">
                  <mat-icon>bookmark_remove</mat-icon>
                </button>
              </div>
              <div>
                <button mat-icon-button>
                  <mat-icon>visibility</mat-icon>
                </button>
                <span>{{ post.viewerCount }}</span>
              </div>
            </mat-card-actions>
          </mat-card>
        </div>
        }}
        <!-- unpinned posts list -->
        @for (post of posts; track $index) { @if (!post.pinned) {
        <div (click)="goToPost(post.id)" class="margin-bottom-xsm hover">
          <mat-card>
            <mat-card-header>
              <mat-card-title>{{ post.name }}</mat-card-title>
              <mat-card-subtitle
                >Created by {{ post.userEmail }} on:
                {{ post.createdOn }}</mat-card-subtitle
              ></mat-card-header
            >
            <mat-card-actions align="end">
              <div>
                <button mat-icon-button (click)="pinPost($event, post.id)">
                  <mat-icon>bookmark_add</mat-icon>
                </button>
              </div>
              <div>
                <button mat-icon-button>
                  <mat-icon>visibility</mat-icon>
                </button>
                <span>{{ post.viewerCount }}</span>
              </div>
            </mat-card-actions>
          </mat-card>
        </div>
        } }
      </div>
      <br />
    </div>
  `,
})
export class ForumPostsComponent {
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

  getSize() {
    this.forumPostService.getSize().subscribe((response) => {
      this.length = response;
    });
  }

  getPage() {
    this.forumPostService
      .getPage(this.pageIndex, this.pageSize)
      .subscribe((response) => {
        this.posts = response;
      });
  }

  /* PROPERTIES
   ********************************************/
  public posts!: ForumPostInterface[];

  /* SERVICES
   ********************************************/
  private forumPostService = inject(ForumPostService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getSize();
    this.getPage();
  }

  goToPost(id: number) {
    this.router.navigate([FRONTEND.getForumPostById(id)]);
  }

  createPost(event: ForumPostCreateInterface) {
    this.forumPostService.create(event).subscribe((response) => {
      this.posts = [...this.posts, response];
      this.getPage();
    });
  }

  pinPost(event: Event, postId: number) {
    event.stopPropagation();

    this.forumPostService.pinPost(postId).subscribe(() => {
      this.getPage();
    });
  }
}
