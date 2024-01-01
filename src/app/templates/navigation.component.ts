import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navigation',
  template: `<mat-sidenav-container class="sidenav-container">
    <mat-sidenav
      #drawer
      class="sidenav"
      fixedInViewport
      [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
      [mode]="(isHandset$ | async) ? 'over' : 'side'"
      [opened]="(isHandset$ | async) === false"
    >
      <mat-toolbar>Menu</mat-toolbar>
      <mat-nav-list>
        <a mat-list-item href="#">Link 1</a>
        <a mat-list-item href="#">Link 2</a>
        <a mat-list-item href="#">Link 3</a>
      </mat-nav-list>
    </mat-sidenav>
    <mat-sidenav-content>
      <mat-toolbar color="primary">
        @if (isHandset$ | async) {
        <button
          type="button"
          aria-label="Toggle sidenav"
          mat-icon-button
          (click)="drawer.toggle()"
        >
          <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
        </button>
        }
        <span>frontend2</span>
      </mat-toolbar>
      <!-- Add Content Here -->
    </mat-sidenav-content>
  </mat-sidenav-container> `,
  styles: `.sidenav-container {
  height: 100%;
}

.sidenav {
  width: 200px;
}

.sidenav .mat-toolbar {
  background: inherit;
}

.mat-toolbar.mat-primary {
  position: sticky;
  top: 0;
  z-index: 1;
}
`,
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
  ],
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
