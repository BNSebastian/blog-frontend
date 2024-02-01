import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { BACKEND } from '../../../shared/environments/backend';
import { FRONTEND } from '../../../shared/environments/frontend';
import { GenericService } from '../../../shared/services/generic.service';
import { IArticle } from '../../models/article';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [MatExpansionModule, MatPaginatorModule],
  template: `<!-- START OF HTML-->
    <div class="container-primary bg-page-chat">
      <br />
      <div class="width-60 margin-x-auto">
        <mat-paginator
          class="margin-bottom-sm"
          [length]="count"
          [pageSize]="pageSize"
          [showFirstLastButtons]="true"
          [pageSizeOptions]="pageSizeOptions"
          [pageIndex]="pageIndex"
          (page)="handlePageEvent($event)"
          aria-label="Select page"
        >
        </mat-paginator>
        @for (item of articles; track $index) {
        <div class="margin-bottom-xsm">
          <mat-accordion>
            <mat-expansion-panel hideToggle>
              <mat-expansion-panel-header>
                <mat-panel-title>
                  <h3>{{ item.name }}</h3>
                </mat-panel-title>
              </mat-expansion-panel-header>
              <p>{{ item.content }}</p>
            </mat-expansion-panel>
          </mat-accordion>
        </div>
        }
      </div>
    </div>
    <!-- END OF HTML--> `,
})
export class ArticlesComponent {
  public articles: IArticle[] = [];

  constructor(
    private articleService: GenericService<IArticle>,
    private router: Router
  ) {
    this.articleService.setBaseUrl(BACKEND.getArticleBaseApi());
  }

  /* PAGINATOR
   ********************************************/
  public count = 50;
  public pageIndex = 0;
  public pageSizeOptions = [5, 10, 25, 50];
  public pageSize = this.pageSizeOptions[0];

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getPage();
  }

  getCount() {
    this.articleService.getCount().subscribe((response) => {
      this.count = response;
    });
  }

  getPage() {
    this.articleService
      .getPage(this.pageIndex, this.pageSize)
      .subscribe((response) => {
        this.articles = response;
      });
  }

  ngOnInit() {
    this.getCount();
    this.getPage();
  }

  goTo(id: number) {
    this.router.navigate([FRONTEND.getArticleById(id)]);
  }
}
