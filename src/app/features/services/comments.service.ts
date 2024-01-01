import { map, Observable, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { backendUrl } from '../../shared/environments/backend';
import {
  CreateVideoCommentInterface,
  UpdateVideoCommentInterface,
  VideoCommentInterface,
} from '../models/video-comments';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private http = inject(HttpClient);
  private commentAddedSubject = new Subject<void>();
  commentAdded$ = this.commentAddedSubject.asObservable();

  getComments(request: string): Observable<VideoCommentInterface[]> {
    return this.http.get<VideoCommentInterface[]>(
      backendUrl.getAllComments + request
    );
  }

  createComment(
    request: CreateVideoCommentInterface
  ): Observable<VideoCommentInterface> {
    return this.http
      .post<VideoCommentInterface>(backendUrl.createComment, request)
      .pipe(
        map((response: VideoCommentInterface) => {
          return response;
        })
      );
  }

  updateComment(
    updatedComment: UpdateVideoCommentInterface
  ): Observable<VideoCommentInterface> {
    return this.http
      .patch<VideoCommentInterface>(backendUrl.createComment, updatedComment.id)
      .pipe(
        map((response: VideoCommentInterface) => {
          return response;
        })
      );
  }

  deleteComment(id: number): Observable<{}> {
    return this.http.delete(backendUrl.deleteComment + id);
  }

  notifyCommentAdded() {
    this.commentAddedSubject.next();
  }
}
