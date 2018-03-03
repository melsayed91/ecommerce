import {Component, Input, OnInit} from '@angular/core';
import {
  MessageApi,
  RealTime,
  FireLoopRef,
  Message
} from '../../common/BE.SDKs/Messaging';
import PerfectScrollbar from 'perfect-scrollbar';
import {LoopBackConfig as attachementApiConfig} from '../../common/BE.SDKs/attachment';

import {UserService} from '../../core/services/user.service/user.service';

declare var $: any;

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})

export class MessageComponent implements OnInit {
  @Input() selectedConversationId: "";
  messages = [];
  psMessages: any;
  newMessage: "";
  userAccount;
  attachmentServer: any;
  private RoomReference: FireLoopRef<Message>;

  constructor(private auth: UserService, private MessageApi: MessageApi, private realTime: RealTime) {
  }

  ngOnInit() {
    this.userAccount = this.auth.account;
    this.attachmentServer = attachementApiConfig.getPath();
    this.realTime.onReady().subscribe(() => {
      this.RoomReference = this.realTime.FireLoop.ref<Message>(Message);

    });
    this.loadMessages()
  }

  loadMessages(): any {

    this.messages = []
    if (this.psMessages) {
      this.psMessages.update();
    }
    this.MessageApi.getMessages(this.selectedConversationId).subscribe((response) => {


      this.messages = response.messages;
      if (this.messages.length) {
        setTimeout(function () {
          $('.scroll-messages').animate({scrollTop: $('.form-group').height()}, 1);
          const elemSidebar = <HTMLElement>document.querySelector('.scroll-messages');
          this.psMessages = new PerfectScrollbar(elemSidebar, {suppressScrollX: true});
        }.bind(this))
      }

      this.RoomReference.on('change', {
        where: {conversationId: this.selectedConversationId},
        include: [{
          owner: {accountData: "profileImage"}
        }],
        order: 'creationDate DESC',
        limit: 1
      }).subscribe((data: Message[]) => {

        if (data.length) {
          var messageExist = this.messages.filter(function (msg) {
            return msg.id === data[0].id
          }).length > 0
          if (!messageExist && data.length) {
            this.messages.push(data[0]);
            setTimeout(function () {
              $('.scroll-messages').animate({scrollTop: $('.form-group').height()}, 1);
              const elemSidebar = <HTMLElement>document.querySelector('.scroll-messages');
              this.psMessages = new PerfectScrollbar(elemSidebar, {suppressScrollX: true});
            }.bind(this))
          }
        }


      });

    }, (err) => {
    })

  }

  addNewMessage(): any {

    let msg = {
      conversationId: this.selectedConversationId,
      ownerId: this.userAccount.id,
      text: this.newMessage
    }
    this.newMessage = "";
    this.MessageApi.addMessage(msg).subscribe((response) => {

    }, (err) => {
    })
  }
}
