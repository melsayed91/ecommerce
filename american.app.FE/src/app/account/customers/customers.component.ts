import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service/user.service";
import {Router, ActivatedRoute} from '@angular/router';

import {
  ConversationApi
} from '../../common/BE.SDKs/Messaging';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customersList;
  newMessage;

  constructor(private router: Router, private auth: UserService, private ConversationApi: ConversationApi) {

    this.customersList = this.auth.account.accountData.customers;
  }

  ngOnInit() {
  }

  sendMessage(message): any {
    if (message) {

      this.ConversationApi.addBulkConversation(this.auth.account.accountData.customerIds,
        message, this.auth.account.id, 'announcement').subscribe((response) => {

      }, (err) => {
      })
    }
  }

  openConversation(recieverId): any {
    if (recieverId) {

      this.ConversationApi.addConversation({
        type: 'private',
        participantIds: [recieverId, this.auth.account.id]
      }).subscribe((response) => {
        this.router.navigate(['/conversation/' + response.conversation.id])
      }, (err) => {
      })
    }
  }
}
