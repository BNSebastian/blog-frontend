import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BACKEND } from '../../shared/environments/backend';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  getUserProfileImage(userEmail: string): Observable<any> {
    return this.http.get(BACKEND.getUserProfileImage(userEmail));
  }

  setUserProfileImage(userId: number, file: FormData): Observable<boolean> {
    return this.http.post<any>(BACKEND.setUserProfileImage(userId), file).pipe(
      map((response: boolean) => {
        return response;
      })
    );
  }
}
