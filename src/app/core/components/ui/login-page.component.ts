import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { LoginComponent } from '../login.component';

@Component({
  standalone: true,
  imports: [LoginComponent, MatGridListModule],
  selector: 'app-login-page',
  template: `
    <div class="container-main page-background-home">
      <div class="container-secondary ephemeral">
        <h1 class="text-funky">Log in</h1>
      </div>
      <div class="container-secondary">
        <app-login></app-login>
      </div>
    </div>
  `,
})
export class LoginPageComponent {}
