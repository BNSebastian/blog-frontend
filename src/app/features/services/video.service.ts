import { catchError, map, Observable, Subject, throwError } from 'rxjs';

import { HttpClient, HttpEvent } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BACKEND, backendUrl } from '../../shared/environments/backend';
import { VideoInterface } from '../models/video';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private http = inject(HttpClient);

  // httpEvent needed for the progress display
  uploadVideo(requestBody: FormData): Observable<HttpEvent<any>> {
    return this.http.post<any>(BACKEND.uploadVideo(), requestBody, {
      reportProgress: true,
      observe: 'events',
    });
  }

  getAllVideoNames(): Observable<string[]> {
    return this.http.get<string[]>(BACKEND.getAllVideoNames());
  }

  getAllVideos(): Observable<VideoInterface[]> {
    return this.http.get<VideoInterface[]>(BACKEND.getAllVideos());
  }

  getVideoByName(name: string): Observable<VideoInterface> {
    return this.http.get<VideoInterface>(BACKEND.getVideoByName(name));
  }

  setVideoDescription(name: string, description: string): Observable<string> {
    return this.http
      .post<any>(BACKEND.setVideoDescription(name), description)
      .pipe(
        catchError((error) => {
          console.error('Error in setVideoDescription:', error);

          // Log the response content for investigation
          console.log('Response content:', error.error.text);

          // Rethrow the error to propagate it to the subscriber
          throw error;
        }),
        map((response: string) => {
          return response;
        })
      );
  }

  getVideoDescription(videoName: string): Observable<string> {
    return this.http.get(BACKEND.getVideoDescription(videoName), {
      responseType: 'text',
    });
  }

  deleteVideo(name: string): Observable<void> {
    return this.http.delete<void>(BACKEND.deleteVideo(name));
  }
}
