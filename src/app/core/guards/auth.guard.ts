import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { frontendUrl } from '../../shared/environments/frontend';
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
      this.router.navigate([frontendUrl.login]);
      return false;
    }
  }
}
