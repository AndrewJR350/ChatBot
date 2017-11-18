import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../chat.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';


@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  // messages: Observable<Message[]>;
  private formValue: string;
  private messages = [];
  private links = [];
  

  constructor(private chatService: ChatService) { }

  ngOnInit() { }

  private sentMessage(): void {
    const userMessage = {
      'sentBy': 'user',
      'content': this.formValue
    };
    this.messages.push(userMessage);
    this.chatService.converse(this.formValue).then(res => {
      const botMessage = {
        'sentBy': 'bot',
        'content': res
      };
      this.filterKeywords(botMessage);
    })
    console.log('Messages : ',this.messages);
    this.formValue = '';
  }

  // private filterResponse(botMsg): void {
  //   if (botMsg.content === 'Here, i found some documentation that might help you with login') {
  //     console.log();
  //     this.chatService.getIssueLinks('add Url', '')
  //     .then(res => {
  //       console.log(res);
  //       return this.chatService.postChatService('add url', this.messages, '');
  //     })
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     });
  //   } else {
  //     this.messages.push(botMsg);
  //   }
  // }

  private filterKeywords(botMsg) {
    if (botMsg.content === 'loginIsssue' || botMsg.content === 'signupIssue' || botMsg.content === '') {
      this.getLinks(botMsg);
    }

    this.messages.push(botMsg);
  }

  private getLinks(keyword) {
    this.chatService.getIssueLinks('add Url', '')
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    })
  }


  private saveChatToDB () {
    this.chatService.postChatService('', this.messages, '')
    .then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error)
    })
  }

}
