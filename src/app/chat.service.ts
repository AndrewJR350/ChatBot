import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';

import { ApiAiClient } from 'api-ai-javascript';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { log } from 'util';

@Injectable()
export class ChatService {

  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({ accessToken: this.token });

  private options = '';

  constructor(
    private http: Http
  ) { }

  converse(msg: string) {
    return this.client.textRequest(msg)
      .then(res => {
        return res.result.fulfillment.speech;
      })
      .catch(error => {
        console.log('Error : ', error);
        return error;
      });
  }

  getIssueLinks(url: string, options: string) {
    return this.http
      .get(url, this.options)
      .map((response) => response.json())
      .toPromise();
  }

  postChatService(url: string, params: any, options: any) {
    return this.http
      .post(url, params, options)
      .map((response) => response.json())
      .toPromise();
  }

}
