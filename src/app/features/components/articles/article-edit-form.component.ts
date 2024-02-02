import { CommonModule } from '@angular/common';
import { Component, ContentChild, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

import { BACKEND } from '../../../shared/environments/backend';
import { FRONTEND } from '../../../shared/environments/frontend';
import { GenericService } from '../../../shared/services/generic.service';
import { IArticle } from '../../models/article';

@Component({
  selector: 'app-article-edit-form',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  template: `<!-- START OF HTML-->
    <div class="container-primary bg-page-admin flex-row flex-center">
      @if (!isLoading) {
      <form [formGroup]="formData" class="width-70">
        <mat-card>
          <mat-card-header>
            <mat-card-title><strong>Edit article</strong></mat-card-title>
          </mat-card-header>

          <mat-card-content>
            <mat-form-field class="width-100" floatLabel="always">
              <mat-label>name</mat-label>
              <input matInput formControlName="name" />
            </mat-form-field>

            <mat-form-field class="width-100" floatLabel="always">
              <mat-label>content</mat-label>
              <textarea
                matInput
                formControlName="content"
                style="min-height: 150px;"
              ></textarea>
            </mat-form-field>
          </mat-card-content>

          <mat-card-actions>
            <button
              (click)="onSubmit()"
              mat-raised-button
              color="primary"
              class="width-100"
            >
              Update
            </button>
          </mat-card-actions>
        </mat-card>
      </form>
      } @else {
      <mat-spinner class="spinner"></mat-spinner>
      }
      <!-- END OF HTML-->
    </div> `,
})
export class ArticleEditFormComponent implements OnInit {
  public article!: IArticle;
  public formData!: FormGroup;
  public isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: GenericService<IArticle>,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.articleService.setBaseUrl(BACKEND.getArticleBaseApi());
  }

  ngOnInit() {
    this.createForm();
    const id = Number(this.getVideoId());
    if (id) {
      this.articleService.getById(id).subscribe((response) => {
        this.article = response;
        this.updateFormValues();
      });
    }
  }

  getVideoId(): string | null {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  createForm() {
    this.formData = this.formBuilder.group({
      id: new FormControl({ value: '', disabled: false }),
      name: new FormControl({ value: '', disabled: false }),
      content: new FormControl({ value: '', disabled: false }),
    });
  }

  updateFormValues() {
    this.formData.patchValue({
      id: this.article.id,
      name: this.article.name,
      content: this.article.content,
    });
  }

  onSubmit() {
    if (this.formData.valid) {
      this.isLoading = true;
      const formData = this.formData.value;
      console.log(formData);
      this.articleService.update(this.article.id, formData).subscribe();
    }
    const delayTime = 2000;
    setTimeout(() => {
      this.router.navigate([FRONTEND.manageArticles()]);
    }, delayTime);
  }
}
