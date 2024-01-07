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
}
