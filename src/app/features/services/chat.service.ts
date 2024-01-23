import { Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  stompClient: any;
  topic: string = 'topic/greetings';
  responseSubject = new Subject<any>();
  webSocketEndPoint: string = 'http://localhost:8080/ws';

  connect() {
    console.log('Initialize websocket connection');
    let ws = SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);

    const _this = this;
    _this.stompClient.connect(
      {},
      function (frame: any) {
        _this.stompClient.subscribe(
          _this.topic,
          function (greetingResponse: any) {
            _this.onMessageReceived(greetingResponse);
          }
        );
      },
      this.errorCallBack
    );
  }

  send(message: any) {
    console.log('calling api vs websocket');
    this.stompClient.send('');
  }

  onMessageReceived(message: any) {
    console.log('Message received from server:: ' + message.body);
    const obj = JSON.parse(message.body);
    this.responseSubject.next(obj);
  }

  diconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  errorCallBack(error: any) {
    console.log('Error callback => ' + error);
    setTimeout(() => {
      this.connect();
    }, 5000);
  }
}
