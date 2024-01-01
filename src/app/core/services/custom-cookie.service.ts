import { CookieService } from 'ngx-cookie-service';

import { inject, Injectable } from '@angular/core';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class CustomCookieService {
  private cookieService = inject(CookieService);

  saveUserCookies(user: User): void {
    this.cookieService.set('id', user.id);
    this.cookieService.set('email', user.email);
    this.cookieService.set('firstname', user.firstname);
    this.cookieService.set('lastname', user.lastname);
    this.saveToken(user.token);
  }

  destroyUserCookies(): void {
    this.cookieService.deleteAll();
  }

  getUserId(): string {
    return this.cookieService.get('id');
  }

  getUserEmail(): string {
    return this.cookieService.get('email');
  }

  getUserFirstname(): string {
    return this.cookieService.get('firstname');
  }

  getUserLastname(): string {
    return this.cookieService.get('lastname');
  }

  saveToken(token: string): void {
    this.cookieService.set('jwtToken', 'Bearer ' + token);
  }

  checkToken(): boolean {
    return this.cookieService.check('jwtToken');
  }

  getToken(): string {
    return this.cookieService.get('jwtToken');
  }

  destroyToken(): void {
    this.cookieService.delete('jwtToken');
  }
}
