import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

import { BACKEND } from '../../../shared/environments/backend';
import { FRONTEND } from '../../../shared/environments/frontend';
import { GenericService } from '../../../shared/services/generic.service';
import { IArticle } from '../../models/article';
import { ArticleFormComponent } from './article-form.component';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    ArticleFormComponent,
  ],
  styles: `
    .mat-column-name {
        width: 80%;
    }
    .mat-column-edit {
        text-align: center;
    }
    .mat-column-delete {
        text-align: center;
    }
  `,
  template: `<!-- START OF HTML-->
    <div class="container-primary bg-page-admin flex-row flex-center">
      <div class="width-60">
        <div class="margin-bottom-xsm">
          <app-article-form
            (handleSubmit)="addEntry($event)"
          ></app-article-form>
        </div>
        <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let row">{{ row.name }}</td>
          </ng-container>

          <ng-container matColumnDef="edit" class="text-center">
            <th mat-header-cell *matHeaderCellDef>Edit</th>
            <td mat-cell *matCellDef="let row">
              <button
                (click)="editEntry(row.id)"
                mat-icon-button
                color="primary"
              >
                <mat-icon>edit</mat-icon>
              </button>
            </td>
          </ng-container>

          <ng-container matColumnDef="delete" class="button">
            <th mat-header-cell *matHeaderCellDef>Delete</th>
            <td mat-cell *matCellDef="let row">
              <button
                (click)="deleteEntry(row.id)"
                color="warn"
                mat-icon-button
              >
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </div>
    </div>
    <!-- END OF HTML--> `,
})
export class AdminArticles {
  public displayedColumns: string[] = ['name', 'edit', 'delete'];
  public dataSource: IArticle[] = [];

  constructor(
    private articleService: GenericService<IArticle>,
    private router: Router
  ) {
    this.articleService.setBaseUrl(BACKEND.getArticleBaseApi());
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.articleService.getAll().subscribe((response) => {
      this.dataSource = response;
    });
  }

  editEntry(id: number) {
    this.router.navigate([FRONTEND.manageArticle(id)]);
  }

  deleteEntry(id: number) {
    this.articleService.delete(id).subscribe(() => {
      this.loadData();
    });
  }

  addEntry(request: IArticle) {
    console.log(`ADMIN-ARTICLES::ADDENTRY --- request: ` + request);
    this.articleService.create(request).subscribe((response) => {
      this.dataSource = [...this.dataSource, response];
    });
  }
}
