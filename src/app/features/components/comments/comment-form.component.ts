import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CreateVideoCommentInterface } from '../../models/video-comments';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule],
  styles: [
    `
      .comment-form-textarea {
        width: 100%;
        height: 4rem;
      }
    `,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <textarea
        class="comment-form-textarea"
        formControlName="content"
      ></textarea>
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="form.invalid"
      >
        {{ this.submitLabel }}
      </button>
      @if(hasCancelButton) {
      <button mat-raised-button color="primary" (click)="handleCancel.emit()">
        Cancel
      </button>
      }
    </form>
  `,
})
export class CommentFormComponent {
  @Input()
  submitLabel!: string;

  @Input()
  hasCancelButton: boolean = false;

  @Input()
  initialText: string = '';

  @Output()
  handleSubmit = new EventEmitter<string>();

  @Output()
  handleCancel = new EventEmitter<void>();

  form!: FormGroup;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.fb.group({
      content: [this.initialText, Validators.required],
    });
  }

  onSubmit(): void {
    this.handleSubmit.emit(this.form.value.content);
    this.form.reset();
  }
}
