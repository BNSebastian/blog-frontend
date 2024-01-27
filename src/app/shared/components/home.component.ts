import { CdkAccordionModule } from '@angular/cdk/accordion';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';

import { FRONTEND, frontendUrl } from '../environments/frontend';

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
      <div class="logo-container">
        <h1 class="script-small">Freevoice</h1>
        <div class="script-large">is a community of like-minded people</div>
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
        <button mat-raised-button color="primary" (click)="donate()">
          Donate
        </button>
      </div>
    </div>
  `,
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [MatGridListModule, CdkAccordionModule, MatButtonModule],
})
export class HomeComponent {
  private router = inject(Router);

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
