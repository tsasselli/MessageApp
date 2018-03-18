import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Message } from './message.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService {
    private messages: Message[] = []

    constructor(private http: Http){}

    addMessage(message: Message) {   /// allows us to extend this service and functionality to other components ex= addMessage.getMessage()
      this.messages.push(message);
      const body = JSON.stringify(message);
      const headers =new Headers({'Content-Type' : 'application/json'});
      return this.http.post('http://localhost:3000/message', body, {headers: headers})//.map((response: Response) => response)
      .catch((error: Response) => Observable.throw(error));
    }

    getMessage() {
      return this.http.get('http://localhost:3000/message')
      .map((response: Response) => {
        const messages = response.json().obj;
        let transformedMessages: Message[] = [];
        for (let message of messages) {
          transformedMessages.push(new Message(message.content, message.id, "Dummy", null));
        }
        this.messages = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => Observable.throw(error));
    }

    deldeteMessage(message: Message) {
      this.messages.splice(this.messages.indexOf(message), 1);
    }
}
