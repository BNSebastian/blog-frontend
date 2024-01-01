import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { UserService } from '../../core/services/user.service';
import { frontendUrl } from '../environments/frontend';
import { LinkInterface } from '../models/link';

@Component({
  selector: 'app-navbar-item',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  template: `
    <div class="nav-link">
      <button
        mat-mini-fab
        color="{{ link.color }}"
        matTooltip="{{ link.tooltip }}"
        matTooltipPosition="right"
        [routerLink]="[link.url]"
        routerLinkActive="{{ link.highlight }}"
        [routerLinkActiveOptions]="{ exact: true }"
        (click)="handleClick($event, link.name)"
      >
        <mat-icon>{{ link.icon }}</mat-icon>
      </button>
    </div>
  `,
})
export class NavbarItemComponent {
  @Input()
  link!: LinkInterface;

  private userService = inject(UserService);
  private router = inject(Router);

  handleClick(event: Event, linkName: string) {
    if (linkName === 'logout') {
      event.preventDefault();
      event.stopPropagation();
      this.logout();
    }
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl(frontendUrl.home);
  }
}
