import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
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
  `,
  template: `
    <div class="container">
      <div class="create">
        <app-forum-post-form
          submitLabel="Create"
          [hasCancelButton]="true"
          (handleSubmit)="createPost($event)"
        ></app-forum-post-form>
      </div>

      @for (post of posts; track $index) {
      <div class="forum-post" (click)="goToPost(post.id)">
        <mat-card>
          <mat-card-header>
            <mat-card-title>{{ post.name }}</mat-card-title>
            <mat-card-subtitle>{{
              post.userEmail
            }}</mat-card-subtitle></mat-card-header
          >
          <mat-card-actions align="end"
            >Created: {{ post.createdOn }}</mat-card-actions
          >
        </mat-card>
      </div>
      }
    </div>
  `,
})
export class ForumPostsComponent {
  private postService = inject(ForumPostService);
  private router = inject(Router);

  public posts!: ForumPostInterface[];

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.postService.getAll().subscribe((response: ForumPostInterface[]) => {
      this.posts = response;
    });
  }

  goToPost(id: number) {
    this.router.navigate([FRONTEND.getForumPostById(id)]);
  }

  createPost(event: ForumPostCreateInterface) {
    this.postService.create(event).subscribe((response) => {
      this.posts = [...this.posts, response];
    });
  }
}
