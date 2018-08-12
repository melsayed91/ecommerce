import {Component, OnInit} from '@angular/core';
import {
  ConversationApi,
  MessageApi,
  RealTime,
  FireLoopRef,
  Message
} from '../../common/BE.SDKs/Messaging';
import {UserService} from '../../core/services/user.service/user.service';
import {LoopBackConfig as attachementApiConfig} from '../../common/BE.SDKs/attachment';
import PerfectScrollbar from 'perfect-scrollbar';
import {ActivatedRoute} from '@angular/router';
import set = Reflect.set;

declare var $: any;

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  attachmentServer: any;
  psMessages: any;
  newMessage: "";
  conversations = [];
  emptyConversations = false;
  userAccount;
  messages = [];
  selectedConversation: any;
  selectedConversationId: "";

  private sub: any;

  constructor(private auth: UserService, private ConversationApi: ConversationApi, private route: ActivatedRoute) {


  }

  ngOnInit() {
    this.userAccount = this.auth.account;
    this.attachmentServer = attachementApiConfig.getPath();
    this.sub = this.route.params.subscribe(params => {
      this.selectedConversationId = params['id'];
      if (this.conversations.length) {
        this.selectConversation(this.selectedConversationId);
      } else {
        this.loadConversations();
      }
    });


  }

  loadConversations(): any {
    const elemSidebar = <HTMLElement>document.querySelector('.scroll-conversations');
    var usrAccId = this.userAccount.id;
    let ps = new PerfectScrollbar(elemSidebar, {suppressScrollX: true});
    this.ConversationApi.getConversations(this.userAccount.id).subscribe((response) => {

      if (response.conversations.length > 0){
        this.conversations = response.conversations.map(function (conv) {
          conv.accounts = conv.accounts.filter(function (acc) {
            return acc.id !== usrAccId
          });
          return conv;
        });
        this.selectConversation(this.selectedConversationId);
      } else {
        this.emptyConversations = true;
      }

      /* if (this.conversations.length) {
         this.loadMessages(this.conversations[0].id)
         this.selectedConversation = this.conversations[0]
       }*/
    }, (err) => {
    })
  }

  selectConversation(id): any {
    this.selectedConversation = false;
    setTimeout(function () {
      this.selectedConversation = this.conversations.filter(function (conv) {
        return conv.id === id
      })[0];

      if (this.selectedConversation) {
        this.selectedConversationId = this.selectedConversation.id
      }
    }.bind(this))

  }


}
