import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  styles: [
    `
      /* CSS to style the footer */
      // .footer {
      //   position: relative; /* Keeps the footer fixed at the bottom of the viewport */
      //   left: 0;
      //   bottom: 0;
      //   width: 100%;
      //   color: white;
      //   text-align: center;
      // }
    `,
  ],
  template: `
    <footer class="footer">
      <mat-toolbar>
        <button
          mat-icon-button
          class="example-icon"
          aria-label="Example icon-button with menu icon"
        >
          <mat-icon>menu</mat-icon>
        </button>
        <span>My App</span>
        <span class="example-spacer"></span>
        <button
          mat-icon-button
          class="example-icon favorite-icon"
          aria-label="Example icon-button with heart icon"
        >
          <mat-icon>favorite</mat-icon>
        </button>
        <button
          mat-icon-button
          class="example-icon"
          aria-label="Example icon-button with share icon"
        >
          <mat-icon>share</mat-icon>
        </button>
      </mat-toolbar>
    </footer>
  `,
})
export class FooterComponent {}
