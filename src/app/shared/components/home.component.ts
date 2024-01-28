import { map, Observable, shareReplay } from 'rxjs';

import { CdkAccordionModule } from '@angular/cdk/accordion';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { FRONTEND, frontendUrl } from '../environments/frontend';

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
      <div class="text-container">
        <h1 class="script-small">is a community of like-minded people</h1>
        <div class="script-large">Freevoice</div>
      </div>
      <div class="content-container">
        <cdk-accordion class="example-accordion">
          @for (item of items; track item; let index = $index) {
          <cdk-accordion-item
            #accordionItem="cdkAccordionItem"
            class="example-accordion-item"
            role="button"
            tabindex="0"
            [attr.id]="'accordion-header-' + index"
            [attr.aria-expanded]="accordionItem.expanded"
            [attr.aria-controls]="'accordion-body-' + index"
          >
            <div
              class="example-accordion-item-header"
              (click)="accordionItem.toggle()"
            >
              {{ item }}
              <span class="example-accordion-item-description">
                Click to {{ accordionItem.expanded ? 'close' : 'open' }}
              </span>
            </div>
            <div
              class="example-accordion-item-body"
              role="region"
              [style.display]="accordionItem.expanded ? '' : 'none'"
              [attr.id]="'accordion-body-' + index"
              [attr.aria-labelledby]="'accordion-header-' + index"
            >
              {{ content[index] }}
            </div>
          </cdk-accordion-item>
          }
        </cdk-accordion>
        @if (userService.isAuthenticated()) {
        <button mat-raised-button color="primary" (click)="donate()">
          Donate
        </button>
        }
      </div>
    </div>
  `,
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [MatGridListModule, CdkAccordionModule, MatButtonModule],
})
export class HomeComponent {
  private router = inject(Router);
  public userService = inject(AuthService);

  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 599px)')
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  items = ['About us', 'Guidelines'];
  content = [
    'Freevoice is a community where we debate reality',
    'Be kind to others',
  ];
  expandedIndex = 0;

  donate() {
    this.router.navigate([FRONTEND.getDonatePage()]);
  }
}
