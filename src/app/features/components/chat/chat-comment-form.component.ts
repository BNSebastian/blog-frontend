import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chat-comment-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatIconModule],
  styles: [`
    .chat-form{
      margin-top: 1rem;
      padding: 0.5rem;
      
      display: flex;
      justify-content: right;

      textarea {
        width: 100%;
        height: 50%;
        margin: 0 0 auto;
      }

      button {
        margin-left: 0.5rem;
      }
    }
  `],
  template: `
  <mat-card >
    <form 
      class="chat-form"
      [formGroup]="form" 
      (ngSubmit)="onSubmit()"
    >
      <textarea formControlName="content"></textarea>
      <button
        mat-icon-button
        type="submit"
        [disabled]="form.invalid"
      >
        <mat-icon color="primary">reply</mat-icon>
      </button>
    </form>

  </mat-card>

  `,
})
export class ChatCommentFormComponent {
  @Input()
  initialText: string = '';

  @Output()
  handleSubmit = new EventEmitter<string>();

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
