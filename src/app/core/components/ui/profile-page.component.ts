import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { ProfileComponent } from '../profile.component';
import { SignupComponent } from '../signup.component';

@Component({
  standalone: true,
  imports: [ProfileComponent, MatGridListModule],
  selector: 'app-profile-page',
  template: `
    <div class="signup-background-container">
      <mat-grid-list cols="2">
        <mat-grid-tile class="form">
          <app-profile></app-profile>
        </mat-grid-tile>
        <mat-grid-tile>
          <div class="text-container">
            <h1 class="script-small">User</h1>
            <div class="script-large">Profile</div>
          </div>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
})
export class ProfilePageComponent {}
