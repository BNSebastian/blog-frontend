import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { FRONTEND } from '../environments/frontend';

@Component({
  selector: 'app-home',
  template: `
    <div class="container-main page-background-home">
      <div class="container-secondary flex-column ephemeral ">
        <h1 class="layered-text">Freevoice</h1>
      </div>
      <div class="container-secondary flex-column">
        <mat-accordion class="accordion">
          <mat-expansion-panel hideToggle>
            <mat-expansion-panel-header>
              <mat-panel-title> About us </mat-panel-title>
              <mat-panel-description>
                <mat-icon>account_circle</mat-icon>
              </mat-panel-description>
            </mat-expansion-panel-header>
            <p>We're a tight knit community looking for some answers.</p>
          </mat-expansion-panel>
          <mat-expansion-panel
            (opened)="panelOpenState = true"
            (closed)="panelOpenState = false"
          >
            <mat-expansion-panel-header>
              <mat-panel-title> Code of conduct </mat-panel-title>
              <mat-panel-description>
                <mat-icon>account_circle</mat-icon>
              </mat-panel-description>
            </mat-expansion-panel-header>
            <p>Behave like a decent human being</p>
          </mat-expansion-panel>
        </mat-accordion>

        @if (userService.isAuthenticated()) {
        <button
          mat-raised-button
          color="primary"
          (click)="donate()"
          class="button-full-width"
        >
          Donate
        </button>
        }
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    MatGridListModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
  ],
})
export class HomeComponent {
  public panelOpenState = false;
  public userService = inject(AuthService);
  private router = inject(Router);
  donate() {
    this.router.navigate([FRONTEND.getDonatePage()]);
  }
}
