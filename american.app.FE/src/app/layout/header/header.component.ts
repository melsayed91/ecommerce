import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from '../../core/services/user.service/user.service';
import {
  ConversationApi,
  RealTime,
  FireLoopRef,
  Conversation
} from '../../common/BE.SDKs/Messaging';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  conversationCount = 0;
  conversations = [];
  private RoomReference: FireLoopRef<Conversation>;

  constructor(private auth: UserService,
              private ConversationApi: ConversationApi,
              private realTime: RealTime,
              private router: Router) {
  }

  ngOnInit() {
    this.realTime.onReady().subscribe(() => {
      this.RoomReference = this.realTime.FireLoop.ref<Conversation>(Conversation);
      this.getConversationCount()
    });


  }

  getUserEmail() {
    return this.auth.userApi.getCachedCurrent() ? this.auth.userApi.getCachedCurrent().email : '';
  }

  getUserName() {
    return this.auth.account ? this.auth.account.accountData.name : '';
  }

  navigateTo(destination: string) {
    this.router.navigate([destination]);
  }

  getConversationCount() {
    this.ConversationApi.getConversations(this.auth.account.id).subscribe((response) => {
      this.conversationCount = response.conversations.length;
      this.conversations = response.conversations;
      this.RoomReference.on('change', {
        where: {participantIds: this.auth.account.id},
        order: 'creationDate DESC',
        limit: 1
      }).subscribe((data: Conversation[]) => {

        if (data.length) {
          var conversationExist = this.conversations.filter(function (msg) {
            return msg.id === data[0].id
          }).length > 0
          if (!conversationExist && data.length) {
            this.conversations.push(data[0]);
            ++this.conversationCount;
          }
        }



      });

    }, (err) => {
    })
  }
}
