import { NgClass, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { ChatService } from '../../services/chat.service';
import { ChatCommentFormComponent } from './chat-comment-form.component';
import { ChatCommentComponent } from './chat-comment.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  styles: [
    `
      .comments-container {
        width: 50vw;
        margin: auto;
        padding-bottom: 1rem;
      }
    `,
  ],
  template: `
    <!-- <form [formGroup]="form" novalidate (ngSubmit)="connect()">
      <mat-card>
        <mat-card-header>
          <mat-card-title><strong>Your account</strong></mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <mat-form-field class="full-width" floatLabel="always">
            <mat-label>name</mat-label>
            <input matInput formControlName="name" />
          </mat-form-field>
        </mat-card-content>

        <mat-card-actions>
          <button
            mat-raised-button
            class="form-button"
            color="primary"
            type="submit"
            [disabled]="form.invalid"
          >
            Login
          </button>
        </mat-card-actions>
      </mat-card>
    </form> -->
    <div class="container" style="margin-top: 50px">
      <div class="row">
        <div class="col-md-12">
          <form class="form-inline">
            <div class="form-group">
              <label for="message">Message</label>
              <input
                type="text"
                id="message"
                class="form-control"
                placeholder="Enter your message here..."
              />
            </div>
            <button id="send" class="btn btn-default" type="button">
              Send
            </button>
          </form>
        </div>
      </div>
      <div class="row" style="margin-top: 10px">
        <div class="col-md-12">
          <form class="form-inline">
            <div class="form-group">
              <label for="private-message">Private Message</label>
              <input
                type="text"
                id="private-message"
                class="form-control"
                placeholder="Enter your message here..."
              />
            </div>
            <button id="send-private" class="btn btn-default" type="button">
              Send Private Message
            </button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <table id="message-history" class="table table-striped">
            <thead>
              <tr>
                <th>
                  Messages
                  <span
                    id="notifications"
                    style="
                  color: white;
                  background-color: red;
                  padding-left: 15px;
                  padding-right: 15px;"
                  >
                  </span>
                </th>
              </tr>
            </thead>
            <tbody id="messages"></tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class ChatComponent {
  private chatService = inject(ChatService);
  /* FORM LOGIC
   *******************************************/
  public form!: FormGroup;
  private formBuilder = inject(FormBuilder);
  createForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }
  ngOnInit() {
    this.connect();
  }
  connect() {
    this.chatService.connect();
  }
}
