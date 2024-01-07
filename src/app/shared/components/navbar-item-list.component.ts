import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { frontendUrl } from '../environments/frontend';
import { LinkInterface } from '../models/link';

@Component({
  selector: 'app-navbar-item-list',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  template: `
    <div class="nav-link">
      <button
        mat-mini-fab
        color="{{ buttonColor }}"
        matTooltip="{{ buttonTooltip }}"
        matTooltipPosition="right"
        [matMenuTriggerFor]="menu"
        routerLinkActive="mat-accent"
        [routerLinkActiveOptions]="{ exact: true }"
      >
        <mat-icon>{{ buttonIcon }}</mat-icon>
      </button>

      <mat-menu #menu="matMenu">
        @for (link of links; track $index) {
        <button
          mat-menu-item
          matTooltip="{{ link.tooltip }}"
          matTooltipPosition="right"
          [routerLink]="[link.url]"
          (click)="handleClick($event, link.name)"
        >
          <mat-icon>{{ link.icon }}</mat-icon>
          <span>{{ link.name }}</span>
        </button>
        }
      </mat-menu>
    </div>
  `,
})
export class NavbarItemListComponent {
  @Input()
  buttonColor!: String;

  @Input()
  buttonTooltip!: String;

  @Input()
  buttonIcon!: String;

  @Input()
  links!: LinkInterface[];

  private userService = inject(AuthService);
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

  isPrimaryButtonHighlighted(): boolean {
    // Check if the current route matches any of the link URLs
    return this.links.some((link) =>
      this.router.isActive(link.url as string, true)
    );
  }

  handlePrimaryButtonClick(event: Event) {
    event.preventDefault(); // Prevent default redirection on primary button click
    event.stopPropagation();
    // You can add specific actions for the primary button here if needed
  }
}
