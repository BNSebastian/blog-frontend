import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { adminLinks, publicLinks, userLinks } from '../../app.links';
import { UserService } from '../../core/services/user.service';
import { frontendUrl } from '../environments/frontend';
import { LinkInterface } from '../models/link';
import { FooterComponent } from './footer.component';
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
    MatListModule,
    MatIconModule,
    AsyncPipe,
    NavbarItemComponent,
    FooterComponent,
  ],
  selector: 'app-navbar',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <!-- sidenav -->
      <mat-sidenav
        #drawer
        class="sidenav"
        fixedInViewport
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        [mode]="(isHandset$ | async) ? 'push' : 'side'"
        [opened]="(isHandset$ | async) === false"
      >
        <mat-toolbar>Menu</mat-toolbar>
        <mat-nav-list>
          @if (!userService.isAuthenticated()) {
            @for (link of publicLinks; track $index) {
              <app-navbar-item [link]="link"></app-navbar-item>
            } 
          } @else { 
            @if (isAdmin) { 
              @for (link of adminLinks; track $index) {
                <app-navbar-item [link]="link"></app-navbar-item>
              } 
            } 
            @for (link of userLinks; track $index) {
              <app-navbar-item [link]="link"></app-navbar-item>
            } 
          }
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
  private router = inject(Router);
  public userService = inject(UserService);

  public navbarOpen = false;
  public publicLinks: LinkInterface[] = publicLinks;
  public userLinks: LinkInterface[] = userLinks;
  public adminLinks: any = adminLinks;
  public isAdmin: boolean = false;

  ngOnInit() {
    this.userService.isAdmin().subscribe((response: boolean) => {
      this.isAdmin = response;
      console.log(response);
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 599px)')
    .pipe(map((result) => result.matches), shareReplay());

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    console.log(`hamburger pressed, the flag value is ${this.navbarOpen}`);
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl(frontendUrl.home);
  }
}
