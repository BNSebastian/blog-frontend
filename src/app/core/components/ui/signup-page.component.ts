import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { SignupComponent } from '../signup.component';

@Component({
  standalone: true,
  imports: [SignupComponent, MatGridListModule],
  selector: 'app-login-page',
  template: `
    <div class="signup-background-container">
      <mat-grid-list cols="2">
        <mat-grid-tile class="form">
          <app-signup></app-signup>
        </mat-grid-tile>
        <mat-grid-tile>
          <div class="text-container">
            <h1 class="script-small">Register a new user</h1>
            <div class="script-large">Welcome to the fold</div>
          </div>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
})
export class SignupPageComponent {}
