import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

import { BACKEND } from '../../../shared/environments/backend';
import { FRONTEND } from '../../../shared/environments/frontend';
import { GenericService } from '../../../shared/services/generic.service';
import { IArticle } from '../../models/article';

@Component({
  selector: 'app-article-form',
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
export class ArticleFormComponent implements OnInit {
  public article!: IArticle;
  public formData!: FormGroup;
  public isLoading: boolean = false;

  constructor(
    private articleService: GenericService<IArticle>,
    private formBuilder: FormBuilder
  ) {
    this.articleService.setBaseUrl(BACKEND.getArticleBaseApi());
  }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      name: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formData.valid) {
      const formData = this.formData.value;
      this.articleService.create(formData).subscribe();
    }
  }
}
