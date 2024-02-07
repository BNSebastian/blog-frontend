import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { SignupComponent } from '../signup.component';

@Component({
  standalone: true,
  imports: [SignupComponent, MatGridListModule],
  selector: 'app-login-page',
  template: `
    <div class="container-primary flex-row-dynamic flex-center bg-page-login">
      <div class="width-70">
        <h1 class="text-funky text-center">Sign up</h1>
      </div>
      <div class="width-30 margin-md">
        <app-signup></app-signup>
      </div>
    </div>
  `,
})
export class SignupPageComponent {}
