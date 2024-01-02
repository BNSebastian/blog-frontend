import { map, Observable, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { backendUrl } from '../../shared/environments/backend';
import { CreateVideoCommentInterface, VideoCommentInterface } from '../models/video-comment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private http = inject(HttpClient);
  private commentAddedSubject = new Subject<void>();
  commentAdded$ = this.commentAddedSubject.asObservable();

  getAllVideoNames(): Observable<string[]> {
    return this.http.get<string[]>(backendUrl.getAllVideoNames);
  }

  getVideoByName(name: string): Observable<any> {
    return this.http.get<any>(backendUrl.getVideoByName + name);
  }

  uploadVideo(data: FormData): Observable<any> {
    return this.http.post<any>(backendUrl.saveVideo, data);
  }

  getVideoComments(name: string): Observable<VideoCommentInterface[]> {
    return this.http.get<VideoCommentInterface[]>(
      backendUrl.getAllComments + name
    );
  }

  createVideoComment(
    videoComment: CreateVideoCommentInterface
  ): Observable<VideoCommentInterface> {
    return this.http
      .post<VideoCommentInterface>(backendUrl.createComment, videoComment)
      .pipe(
        map((response: VideoCommentInterface) => {
          return response;
        })
      );
  }

  notifyCommentAdded() {
    this.commentAddedSubject.next();
  }
}
