import { map, Observable, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { backendUrl } from '../../shared/environments/backend';
import { ChatCommentInterface } from '../models/chat-comment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
    private http = inject(HttpClient);

    getAllComments(): Observable<ChatCommentInterface[]> {
        return this.http.get<ChatCommentInterface[]>(backendUrl.getAllChatComments);
    }
}