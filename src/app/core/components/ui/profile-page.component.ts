import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { ProfileComponent } from '../profile.component';
import { SignupComponent } from '../signup.component';

@Component({
  standalone: true,
  imports: [ProfileComponent, MatGridListModule],
  selector: 'app-profile-page',
  template: `
    <div class="container-primary flex-row-dynamic flex-center bg-page-profile">
      <div class="width-70">
        <h1 class="text-funky text-center">Profile</h1>
      </div>
      <div class="width-30 margin-sm">
        <app-profile></app-profile>
      </div>
    </div>
  `,
})
export class ProfilePageComponent {}
