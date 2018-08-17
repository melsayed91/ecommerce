import { Component, OnInit } from '@angular/core';
import {ConversationApi} from '../../common/BE.SDKs/Messaging';
import {ProductReturnApi} from "../../common/BE.SDKs/Products";
import {UserService} from "../../core/services/user.service/user.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.scss']
})
export class ReturnsComponent implements OnInit {

  constructor(private router: Router,
              private auth: UserService,
              private productReturnApi: ProductReturnApi,
              private conversationApi: ConversationApi) { }

  alive: boolean = true;
  returnsList = [];
  ngOnInit() {
    this.loadReturns();
  }

  loadReturns(): any {

    this.productReturnApi.getReturns(this.auth.account.id).takeWhile(() => this.alive).subscribe((response) => {
      this.returnsList = response.returns;
    }, (err) => {

    })
  }

  openConversation(receiverId): any {
    if (receiverId) {

      this.conversationApi.addConversation({
        type: 'return',
        participantIds: [receiverId, this.auth.account.id]
      }).subscribe((response) => {
        this.router.navigate(['/conversation/' + response.conversation.id])
      }, (err) => {
      })
    }
  }
}
