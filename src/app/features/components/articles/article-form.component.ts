import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
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
    MatExpansionModule,
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
    <mat-accordion>
      <mat-expansion-panel
        (opened)="panelOpenState = true"
        (closed)="panelOpenState = false"
      >
        <mat-expansion-panel-header>
          <mat-panel-title> Add article</mat-panel-title>
        </mat-expansion-panel-header>
        <form [formGroup]="formData">
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

          <button
            (click)="onSubmit()"
            mat-raised-button
            color="primary"
            class="width-100"
          >
            Add
          </button>
        </form>
      </mat-expansion-panel>
    </mat-accordion>

    <!-- END OF HTML--> `,
})
export class ArticleFormComponent implements OnInit {
  public article!: IArticle;
  public formData!: FormGroup;
  public isLoading: boolean = false;
  public panelOpenState: boolean = false;

  @Output()
  handleSubmit = new EventEmitter<IArticle>();

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
      this.handleSubmit.emit(this.formData.value);
      this.formData.reset();
    }
  }
}
