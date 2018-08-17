import { Component, OnInit } from '@angular/core';
import {ConversationApi} from '../../common/BE.SDKs/Messaging';
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
              private conversationApi: ConversationApi) { }

  alive: boolean = true;
  returnsList = [];
  ngOnInit() {
    this.loadReturns();
  }

  loadReturns(): any {

    /*this.productComplaintApi.getComplaints(this.auth.account.id).takeWhile(() => this.alive).subscribe((response) => {
      this.complaints = response.complaints;
    }, (err) => {

    })*/
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
