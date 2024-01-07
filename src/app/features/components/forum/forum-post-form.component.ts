import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { CustomCookieService } from '../../../core/services/custom-cookie.service';
import { ForumPostCreateInterface } from '../../models/forum';

@Component({
  selector: 'app-forum-post-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatExpansionModule,
  ],
  styles: `
    .comment-form-textarea {
      width: 100%;
      height: 4rem;
    }
    .container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .full-width {
        width: 100%;

        .comment-form-textarea {
          width: 100%;
          height: 4rem;
        }
      }
    }
    .cancel-button {
      margin-left: 0.5rem;
    }
    .element-to-hide {
      display: none;
    }
  `,
  template: `
    <mat-accordion #accordion>
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title> Create a new forum post</mat-panel-title>
        </mat-expansion-panel-header>
        <!-- add comment -->
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-card-content class="container">
            <mat-form-field class="full-width">
              <mat-label>Post name</mat-label>
              <input matInput formControlName="name" />
            </mat-form-field>

            <mat-form-field class="element-to-hide">
              <mat-label>User email</mat-label>
              <input matInput formControlName="userEmail" />
            </mat-form-field>

            <mat-form-field class="full-width">
              <mat-label>Initial comment</mat-label>
              <textarea
                matInput
                formControlName="initialCommentContent"
              ></textarea>
            </mat-form-field>
          </mat-card-content>

          <mat-card-actions>
            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="form.invalid"
            >
              {{ this.submitLabel }}
            </button>

            @if(hasCancelButton) {
            <button
              class="cancel-button"
              mat-raised-button
              color="primary"
              (click)="onCancel()"
            >
              Cancel
            </button>
            }</mat-card-actions
          >
        </form>
      </mat-expansion-panel>
    </mat-accordion>
  `,
})
export class ForumPostFormComponent {
  @Input()
  submitLabel!: string;

  @Input()
  hasCancelButton: boolean = false;

  @Output()
  handleSubmit = new EventEmitter<ForumPostCreateInterface>();

  @Output()
  handleCancel = new EventEmitter<void>();

  form!: FormGroup;

  private cookieService = inject(CustomCookieService);
  private fb = inject(FormBuilder);

  @ViewChild(MatAccordion)
  public accordion!: MatAccordion;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      userEmail: [this.cookieService.getUserEmail(), Validators.required],
      initialCommentContent: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log(formData);

      const event: ForumPostCreateInterface = {
        name: formData.name,
        userEmail: this.cookieService.getUserEmail(),
        initialCommentContent: formData.initialCommentContent,
      };

      this.handleSubmit.emit(event);
      this.form.reset();
    }
  }

  onCancel(): void {
    this.form.reset();
    this.closeCreationPanel();
  }

  closeCreationPanel() {
    if (this.accordion) {
      this.accordion.closeAll();
    }
  }
}
