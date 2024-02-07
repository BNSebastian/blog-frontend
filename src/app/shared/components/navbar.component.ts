import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { adminLinks, authenticatedLinks, publicLinks } from '../../app.links';
import { AuthService } from '../../core/services/auth.service';
import { frontendUrl } from '../environments/frontend';
import { LinkInterface } from '../models/link';
import { FooterComponent } from './footer.component';
import { NavbarItemListComponent } from './navbar-item-list.component';
import { NavbarItemComponent } from './navbar-item.component';

@Component({
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    NavbarItemComponent,
    NavbarItemListComponent,
    FooterComponent,
  ],
  selector: 'app-navbar',
  template: `
    <mat-sidenav-container class="background-secondary">
      <!-- sidenav -->
      <mat-sidenav
        #drawer
        class="sidenav background-primary"
        fixedInViewport
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        [mode]="(isHandset$ | async) ? 'push' : 'side'"
        [opened]="(isHandset$ | async) === false"
      >
        <mat-nav-list>
          @if (!userService.isAuthenticated()) { @for (link of publicLinks;
          track $index) {
          <app-navbar-item [link]="link"></app-navbar-item>
          } } @else { @if (isAdmin) {
          <app-navbar-item-list
            buttonColor="warn"
            buttonTooltip="Admin section"
            buttonIcon="admin_panel_settings"
            [links]="adminLinks"
          >
          </app-navbar-item-list>
          } @for (link of userLinks; track $index) {
          <app-navbar-item [link]="link"></app-navbar-item>
          } }
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <!-- toolbar -->
        @if (isHandset$ | async) {
        <mat-toolbar color="primary">
          <button
            type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="drawer.toggle()"
          >
            <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
          </button>

          <span>frontend2</span>
        </mat-toolbar>
        }
        <!-- router outlet -->
        <router-outlet></router-outlet>
        <!-- footer -->
        <!-- <app-footer></app-footer> -->
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
export class NavbarComponent {
  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 1025px)')
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  private router = inject(Router);
  public userService = inject(AuthService);

  public navbarOpen = false;
  public publicLinks: LinkInterface[] = publicLinks;
  public userLinks: LinkInterface[] = authenticatedLinks;
  public adminLinks: any = adminLinks;
  public isAdmin: boolean = false;

  ngOnInit() {
    this.userService.isAdmin().subscribe((response: boolean) => {
      this.isAdmin = response;
    });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    console.log(`hamburger pressed, the flag value is ${this.navbarOpen}`);
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl(frontendUrl.home);
  }
}
