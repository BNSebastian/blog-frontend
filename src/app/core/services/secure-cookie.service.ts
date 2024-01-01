import { CookieService } from 'ngx-cookie-service';

import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SecureCookieService {
  private cookieService = inject(CookieService);
  private expirationDate: number = 30; // days

  setSecureCookie(name: string, value: string): void {
    this.cookieService.set(
      name,
      value,
      this.expirationDate,
      '/',
      'localhost:4200', // Replace with your domain
      true, // Secure flag - set to true for HTTPS only
      'Strict' // SameSite attribute - 'Strict' or 'Lax' based on your requirements
    );
  }

  checkCookie(name: string): boolean {
    return this.cookieService.check(name);
  }

  getSecureCookie(name: string): string | undefined {
    return this.cookieService.get(name);
  }

  deleteSecureCookie(name: string): void {
    this.cookieService.delete(
      name,
      '/',
      'localhost:4200', // Replace with your domain
      true // Secure flag - set to true for HTTPS only
    );
  }
}
