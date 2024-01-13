import { map, Observable, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BACKEND, backendUrl } from '../../shared/environments/backend';
import {
  CreateVideoCommentInterface,
  UpdateVideoCommentInterface,
  VideoCommentInterface,
} from '../models/video-comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private http = inject(HttpClient);
  private commentAddedSubject = new Subject<void>();
  commentAdded$ = this.commentAddedSubject.asObservable();

  getComments(request: string): Observable<VideoCommentInterface[]> {
    return this.http.get<VideoCommentInterface[]>(
      BACKEND.getAllVideoComments(request)
    );
  }

  getComment(commentId: number): Observable<VideoCommentInterface> {
    return this.http.get<VideoCommentInterface>(
      BACKEND.getVideoComment(commentId)
    );
  }

  createComment(
    request: CreateVideoCommentInterface
  ): Observable<VideoCommentInterface> {
    return this.http
      .post<VideoCommentInterface>(BACKEND.createVideoComment(), request)
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
      .patch<VideoCommentInterface>(
        BACKEND.updateVideoComment(),
        updatedComment
      )
      .pipe(
        map((response: VideoCommentInterface) => {
          return response;
        })
      );
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(BACKEND.deleteVideoComment(id));
  }

  notifyCommentAdded() {
    this.commentAddedSubject.next();
  }
}
