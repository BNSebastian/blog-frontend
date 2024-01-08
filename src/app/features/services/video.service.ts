import { map, Observable, Subject } from 'rxjs';

import { HttpClient, HttpEvent } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BACKEND, backendUrl } from '../../shared/environments/backend';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private http = inject(HttpClient);

  // httpEvent needed for the progress display
  // saveVideo(requestBody: FormData): Observable<HttpEvent<any>> {
  //   return this.http.post<any>(BACKEND.saveVideo(), requestBody, {
  //     reportProgress: true,
  //     observe: 'events',
  //   });
  // }

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

  getVideoByName(name: string): Observable<any> {
    return this.http.get<any>(BACKEND.getVideoByName(name));
  }
}
