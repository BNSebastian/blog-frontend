import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { User } from '../../../core/models/user';
import { ChatCommentInterface } from '../../models/chat-comment';

@Component({
  selector: 'app-chat-comment',
  standalone: true,
  imports: [MatCardModule],
  styles: [],
  template: `
    <mat-card>
    <mat-card-header>
        <div mat-card-avatar class="example-header-image"></div>
        <mat-card-title>{{ comment.userEmail }}</mat-card-title>
        <mat-card-subtitle>{{comment.createdOn}}</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      {{comment.content}}
    </mat-card-content>
    </mat-card>
  `,
})
export class ChatCommentComponent {
  @Input() currentUser!: User;
  @Input() comment!: ChatCommentInterface;
}
