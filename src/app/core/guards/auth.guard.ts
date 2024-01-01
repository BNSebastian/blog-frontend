import { frontendUrl } from '../../shared/environments/frontend';

import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private userService = inject(UserService);
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
