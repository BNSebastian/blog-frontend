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
    <div class="main-container page-background-home">
      <div class="container-secondary flex-column ephemeral ">
        <div class="layered-text-small">welcome to</div>
        <div class="layered-text">Freevoice</div>
      </div>
      <div class="container-secondary background-secondary flex-column">
        <cdk-accordion class="accordion">
          @for (item of items; track item; let index = $index) {
          <cdk-accordion-item
            #accordionItem="cdkAccordionItem"
            role="button"
            tabindex="0"
            [attr.id]="'accordion-header-' + index"
            [attr.aria-expanded]="accordionItem.expanded"
            [attr.aria-controls]="'accordion-body-' + index"
          >
            <div (click)="accordionItem.toggle()">
              {{ item }}
              <span>
                Click to {{ accordionItem.expanded ? 'close' : 'open' }}
              </span>
            </div>
            <div
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
