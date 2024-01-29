import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { LoginComponent } from '../login.component';

@Component({
  standalone: true,
  imports: [LoginComponent, MatGridListModule],
  selector: 'app-login-page',
  template: `
    <div class="container-primary flex-row-dynamic flex-center bg-page-login">
      <div class="width-70">
        <h1 class="text-funky text-center">Log in</h1>
      </div>
      <div class="width-30 margin-md">
        <app-login></app-login>
      </div>
    </div>
  `,
})
export class LoginPageComponent {}
