import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService {
    private messages: Message[] = [];
    messageEdited = new EventEmitter<Message>();

    constructor(private http: Http){}

    addMessage(message: Message) {   /// allows us to extend this service and functionality to other components ex= addMessage.getMessage()
      // this.messages.push(message);
      const body = JSON.stringify(message);
      const headers =new Headers({'Content-Type' : 'application/json'});
      return this.http.post('http://localhost:3000/message/', body, {headers: headers})
      .map((response: Response) => {
        const result = response.json();
        const message = new Message(result.obj.content, "Dummy", result.obj._id, null);
        this.messages.push(message);
        return message;
      })
      .catch((error: Response) => Observable.throw(error));
    }

    getMessages() {
      return this.http.get('http://localhost:3000/message')
      .map((response: Response) => {
        const messages = response.json().obj;
        let transformedMessages: Message[] = [];
        for (let message of messages) {
          transformedMessages.push(new Message(message.content, "Dummy", message._id, null));
        }
        this.messages = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => Observable.throw(error));
    }

    editMessage(message: Message){
      this.messageEdited.emit(message);
    }

    updateMessage(message: Message){
      const body = JSON.stringify(message);
      const headers =new Headers({'Content-Type' : 'application/json'});
      return this.http.patch('http://localhost:3000/message/'+ message.messageId, body, {headers: headers})
      .map((response: Response) => response)
      .catch((error: Response) => Observable.throw(error));
    }

    deldeteMessage(message: Message) {
      this.messages.splice(this.messages.indexOf(message), 1);
      return this.http.delete('http://localhost:3000/message/'+ message.messageId)
      .map((response: Response) => response)
      .catch((error: Response) => Observable.throw(error));
    }
}
