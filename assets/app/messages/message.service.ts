import { Message } from './message.model';


export class MessageService {
    private messages: Message[] = []

    addMessage(message: Message) {   /// allows us to extend this service and functionality to other components ex= addMessage.getMessage()
      this.messages.push(message);
      console.log(this.messages);
    }

    getMessage() {
      return this.messages;
    }

    deldeteMessage(message: Message) {
      this.messages.splice(this.messages.indexOf(message), 1);
    }
}
