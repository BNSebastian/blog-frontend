import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-home',
  template: `
    <div class="login-background-container">
      <mat-grid-list cols="4">
        <mat-grid-tile colspan="2" rowspan="2">
          <div class="text-container">
            <h1 class="script-small">is a community of like-minded people</h1>
            <div class="script-large">Freevoice</div>
          </div>
        </mat-grid-tile>

        <mat-grid-tile colspan="2" rowspan="1">
          <div class="text-container">
            <h1 class="script-small"></h1>
            <div class="script-large"></div>
          </div>
        </mat-grid-tile>
        <mat-grid-tile colspan="2" rowspan="1">
          <div class="text-container">
            <div class="script-large">donate</div>
          </div>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  standalone: true,
  imports: [MatGridListModule],
})
export class HomeComponent {}
