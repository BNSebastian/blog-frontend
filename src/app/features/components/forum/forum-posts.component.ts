import { Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

import { FRONTEND } from '../../../shared/environments/frontend';
import {
  ForumPostCreateInterface,
  ForumPostInterface,
} from '../../models/forum';
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
  ],
  styles: `
    .container {
      width: 50%;
      height: 100vh;
      margin: auto;

      .forum-post {
        width: 100%;
        margin: 0 0 auto;
        padding-top: 0.5rem;

        &:hover {
          cursor: pointer;
        }
      }
      
      .create {
        margin-top: 1rem;
      }
    }

    .view-counter {
      display: flex;
    }
  `,
  template: `
    <div class="container-main bg-page-chat">
      <div class="container-secondary flex-column">
        <app-forum-post-form
          class="full-width"
          submitLabel="Create"
          [hasCancelButton]="true"
          (handleSubmit)="createPost($event)"
        ></app-forum-post-form>
        @for (post of posts; track $index) { @if (post.pinned) {
        <div class="full-width hover margin-top " (click)="goToPost(post.id)">
          <mat-card>
            <mat-card-header>
              <mat-card-title>{{ post.name }}</mat-card-title>
              <mat-card-subtitle
                >Created by {{ post.userEmail }} on:
                {{ post.createdOn }}</mat-card-subtitle
              ></mat-card-header
            >
            <mat-card-actions align="end">
              <div class="pin-post">
                <button mat-icon-button (click)="pinPost($event, post.id)">
                  <mat-icon>bookmark_remove</mat-icon>
                </button>
              </div>
              <div class="view-count">
                <button mat-icon-button>
                  <mat-icon>visibility</mat-icon>
                </button>
                <span>{{ post.viewerCount }}</span>
              </div>
            </mat-card-actions>
          </mat-card>
        </div>
        }} @for (post of posts; track $index) { @if (!post.pinned) {
        <div class="full-width hover margin-top" (click)="goToPost(post.id)">
          <mat-card>
            <mat-card-header>
              <mat-card-title>{{ post.name }}</mat-card-title>
              <mat-card-subtitle
                >Created by {{ post.userEmail }} on:
                {{ post.createdOn }}</mat-card-subtitle
              ></mat-card-header
            >
            <mat-card-actions align="end">
              <div class="pin-post">
                <button mat-icon-button (click)="pinPost($event, post.id)">
                  <mat-icon>bookmark_add</mat-icon>
                </button>
              </div>
              <div class="view-count">
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
    </div>
  `,
})
export class ForumPostsComponent {
  private forumPostService = inject(ForumPostService);
  private router = inject(Router);

  public posts!: ForumPostInterface[];

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.forumPostService
      .getAll()
      .subscribe((response: ForumPostInterface[]) => {
        this.posts = response;
        console.log(this.posts);
      });
  }

  goToPost(id: number) {
    this.router.navigate([FRONTEND.getForumPostById(id)]);
  }

  createPost(event: ForumPostCreateInterface) {
    this.forumPostService.create(event).subscribe((response) => {
      this.posts = [...this.posts, response];
    });
  }

  pinPost(event: Event, postId: number) {
    event.stopPropagation();

    this.forumPostService.pinPost(postId).subscribe(() => {
      this.loadData();
    });
  }
}
