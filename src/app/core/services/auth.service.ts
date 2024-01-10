import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BACKEND, backendUrl } from '../../shared/environments/backend';
import { AuthenticationRequest, RegisterRequest, User } from '../models/user';
import { CustomCookieService } from './custom-cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private cookieService = inject(CustomCookieService);
  private http = inject(HttpClient);

  register(model: RegisterRequest): Observable<User> {
    return this.http.post<User>(backendUrl.register, model).pipe(
      map((response: User) => {
        this.cookieService.saveUserCookies(response);
        return response;
      })
    );
  }

  authenticate(model: AuthenticationRequest): Observable<User> {
    return this.http.post<User>(backendUrl.authenticate, model).pipe(
      map((response: User) => {
        this.cookieService.saveUserCookies(response);
        return response;
      })
    );
  }

  isAuthenticated() {
    return this.cookieService.checkToken();
  }

  isAdmin(): Observable<boolean> {
    const userId = {
      userId: Number(this.cookieService.getUserId()),
    };

    return this.http.post<boolean>(backendUrl.isAdmin, userId).pipe(
      map((response: boolean) => {
        return response;
      })
    );
  }

  logout() {
    this.cookieService.destroyUserCookies();
  }

  getUserDetails(): User {
    const user: User = {
      id: this.cookieService.getUserId(),
      firstname: this.cookieService.getUserFirstname(),
      lastname: this.cookieService.getUserLastname(),
      email: this.cookieService.getUserEmail(),
      token: this.cookieService.getToken(),
    };

    return user;
  }

  getUserProfileImage(userId: number): Observable<any> {
    return this.http.get(BACKEND.getUserProfileImage(userId));
  }
}
