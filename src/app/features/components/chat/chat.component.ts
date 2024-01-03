import { Component, inject } from '@angular/core';

import { User } from '../../../core/models/user';
import { UserService } from '../../../core/services/user.service';
import { ChatCommentInterface } from '../../models/chat-comment';
import { ChatService } from '../../services/chat.service';
import { ChatCommentComponent } from './chat-comment.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatCommentComponent],
  styles: [`
    .comments-list {
      width: 50vw;
      margin: auto;
      padding-bottom: 1rem;
    }
  `],
  template: `
    <div class="comments-list">
      @for (comment of chatComments; track $index) {
        <app-chat-comment
          [comment] = "comment"
          [currentUser]="userDetails"
        ></app-chat-comment>
      }
    </div>
  `,
})
export class ChatComponent {
  public userDetails!: User;
  public chatComments: ChatCommentInterface[] = [];

  private userService = inject(UserService);
  private chatService = inject(ChatService);

  ngOnInit() {
    this.userDetails = this.userService.getUserDetails();
    this.loadData();
  }

  loadData() {
    this.chatService
      .getAllComments()
      .subscribe((apiData: ChatCommentInterface[]) => {
        this.chatComments = apiData;
      });
  }
}
