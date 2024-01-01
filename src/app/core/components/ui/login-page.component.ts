import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { LoginComponent } from '../login.component';

@Component({
  standalone: true,
  imports: [LoginComponent, MatGridListModule],
  selector: 'app-login-page',
  template: `
    <div class="login-background-container">
      <mat-grid-list cols="2">
        <mat-grid-tile>
          <div class="text-container">
            <h1 class="script-small">Log in</h1>
            <div class="script-large">Welcome back</div>
          </div>
        </mat-grid-tile>
        <mat-grid-tile>
          <app-login></app-login>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
})
export class LoginPageComponent {}
