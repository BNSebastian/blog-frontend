import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { SignupComponent } from '../signup.component';

@Component({
  standalone: true,
  imports: [SignupComponent, MatGridListModule],
  selector: 'app-login-page',
  template: `
    <div class="container-main page-background-home">
      <div class="container-secondary">
        <app-signup></app-signup>
      </div>
      <div class="container-secondary ephemeral">
        <h1 class="text-funky">Sign up</h1>
      </div>
    </div>
  `,
})
export class SignupPageComponent {}
