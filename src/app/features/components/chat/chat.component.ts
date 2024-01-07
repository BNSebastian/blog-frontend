import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { ChatCommentFormComponent } from './chat-comment-form.component';
import { ChatCommentComponent } from './chat-comment.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    ChatCommentComponent,
    ChatCommentFormComponent,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    MatIconModule,
    NgFor,
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
    <!-- <div class="comments-container">
      @for (comment of chatComments; track $index) {
        <app-chat-comment
          [comment] = "comment"
          [currentUser]="userDetails"
        ></app-chat-comment>
      }
      <app-chat-comment-form
        (handleSubmit)="createComment($event)"
      ></app-chat-comment-form>
    </div> -->
  `,
})
export class ChatComponent {
  // public userDetails!: User;
  // public chatComments: ChatCommentInterface[] = [];
  // private userService = inject(UserService);
  // private chatService = inject(ChatService);
  // ngOnInit() {
  //   this.userDetails = this.userService.getUserDetails();
  //   this.loadData();
  // }
  // loadData() {
  //   this.chatService
  //     .getAllComments()
  //     .subscribe((apiData: ChatCommentInterface[]) => {
  //       this.chatComments = apiData;
  //     });
  // }
  // createComment(event: string) {
  //   const newComment: CreateChatCommentInterface = {
  //     userEmail: this.userDetails.email,
  //     content: event,
  //   };
  //   this.chatService.createComment(newComment).subscribe(
  //     (response) => {
  //       console.log('Response body:', response);
  //       this.loadData();
  //     },
  //     (error) => {
  //       console.log('API error:', error);
  //     }
  //   );
  // }
}
