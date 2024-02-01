import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BACKEND } from '../../shared/environments/backend';
import {
  ForumCommentCreateInterface,
  ForumCommentInterface,
} from '../models/forum';

@Injectable({
  providedIn: 'root',
})
export class ForumCommentService {
  private http = inject(HttpClient);

  create(
    requestBody: ForumCommentCreateInterface
  ): Observable<ForumCommentInterface> {
    return this.http
      .post<ForumCommentInterface>(BACKEND.createForumComment(), requestBody)
      .pipe(
        map((response: ForumCommentInterface) => {
          return response;
        })
      );
  }

  getAll(postId: number): Observable<ForumCommentInterface[]> {
    return this.http.get<ForumCommentInterface[]>(
      BACKEND.getAllForumComments(postId)
    );
  }

  getSize(postId: number): Observable<number> {
    return this.http.get<number>(BACKEND.getForumCommentSize(postId));
  }

  getPage(
    postId: number,
    pageIndex: number,
    pageSize: number
  ): Observable<ForumCommentInterface[]> {
    return this.http.get<ForumCommentInterface[]>(
      BACKEND.getForumCommentPage(postId, pageIndex, pageSize)
    );
  }

  like(
    requestBody: { userEmail: string },
    commentId: number
  ): Observable<number> {
    return this.http
      .post<number>(BACKEND.likeForumComment(commentId), requestBody)
      .pipe(
        map((response: number) => {
          console.log('liked comment');
          return response;
        })
      );
  }

  dislike(
    requestBody: { userEmail: string },
    commentId: number
  ): Observable<number> {
    return this.http
      .post<number>(BACKEND.dislikeForumComment(commentId), requestBody)
      .pipe(
        map((response: number) => {
          return response;
        })
      );
  }
}
