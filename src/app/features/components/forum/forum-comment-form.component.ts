import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-forum-comment-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule],
  template: ` <form [formGroup]="form" (ngSubmit)="onSubmit()">
    <textarea
      class="width-100"
      style="min-height: 100px;"
      formControlName="content"
    >
    </textarea>
    <button
      mat-raised-button
      color="primary"
      type="submit"
      class="width-50"
      [disabled]="form.invalid"
    >
      {{ this.submitLabel }}
    </button>

    @if(hasCancelButton) {
    <button
      (click)="onCancel()"
      mat-raised-button
      color="warn"
      class="width-50"
    >
      Cancel
    </button>
    }
  </form>`,
})
export class ForumCommentFormComponent {
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
    if (this.form.valid) {
      this.handleSubmit.emit(this.form.value.content);
      this.form.reset();
    }
  }

  onCancel(): void {
    this.form.reset();
    this.handleCancel.emit();
  }
}
