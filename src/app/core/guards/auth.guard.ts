import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { FRONTEND, frontendUrl } from '../../shared/environments/frontend';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private userService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    if (this.userService.isAuthenticated()) {
      return true;
    } else {
      console.log('Thou shalt not pass!');
      this.router.navigate([FRONTEND.getUnauthorizedAccessError()]);
      return false;
    }
  }
}
