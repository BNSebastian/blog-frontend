import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { ProfileComponent } from '../profile.component';
import { SignupComponent } from '../signup.component';

@Component({
  standalone: true,
  imports: [ProfileComponent, MatGridListModule],
  selector: 'app-profile-page',
  template: `
    <div class="container-main page-background-home">
      <div class="container-secondary ephemeral">
        <h1 class="text-funky">Profile</h1>
      </div>
      <div class="container-secondary">
        <app-profile></app-profile>
      </div>
    </div>
  `,
})
export class ProfilePageComponent {}
