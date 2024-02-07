import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BACKEND, backendUrl } from '../../shared/environments/backend';
import { ForumPostCreateInterface, ForumPostInterface } from '../models/forum';

@Injectable({
  providedIn: 'root',
})
export class ForumPostService {
  private http = inject(HttpClient);

  getAll(): Observable<ForumPostInterface[]> {
    return this.http.get<ForumPostInterface[]>(BACKEND.getAllForumPosts());
  }

  getSize(): Observable<number> {
    return this.http.get<number>(BACKEND.getForumPostsSize());
  }

  getPage(
    pageIndex: number,
    pageSize: number
  ): Observable<ForumPostInterface[]> {
    return this.http.get<ForumPostInterface[]>(
      BACKEND.getForumPostPage(pageIndex, pageSize)
    );
  }

  getById(id: number): Observable<ForumPostInterface> {
    return this.http.get<ForumPostInterface>(BACKEND.getForumPostById(id));
  }

  create(
    requestBody: ForumPostCreateInterface
  ): Observable<ForumPostInterface> {
    return this.http
      .post<ForumPostInterface>(BACKEND.createForumPost(), requestBody)
      .pipe(
        map((response: ForumPostInterface) => {
          return response;
        })
      );
  }

  incrementPostViewCount(
    userEmail: string,
    postId: number
  ): Observable<number> {
    return this.http
      .post<number>(BACKEND.incrementPostViewCount(postId), userEmail)
      .pipe(
        map((response: number) => {
          return response;
        })
      );
  }

  getPostViewCount(postId: number): Observable<number> {
    return this.http.get<number>(BACKEND.getPostViewCount(postId));
  }

  pinPost(postId: number): Observable<any> {
    return this.http.post<any>(BACKEND.pinForumPost(postId), postId).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
