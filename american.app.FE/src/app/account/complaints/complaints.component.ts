import {Component, OnInit} from '@angular/core';
import {ProductComplaintApi} from "../../common/BE.SDKs/Products";
import {UserService} from "../../core/services/user.service/user.service";
import {Router} from '@angular/router';
import {ConversationApi} from '../../common/BE.SDKs/Messaging';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {

  constructor(
    private router: Router,
    private productComplaintApi: ProductComplaintApi,
    private auth: UserService,
    private conversationApi: ConversationApi) {
  }

  alive: boolean = true;

  complaints = [];

  ngOnDestroy(): void {
    this.alive = false;
  }

  ngOnInit() {
    this.loadComplaints();
  }

  loadComplaints(): any {

    this.productComplaintApi.getComplaints(this.auth.account.id).takeWhile(() => this.alive).subscribe((response) => {
      this.complaints = response.complaints;
    }, (err) => {

    })
  }

  openConversation(receiverId): any {
    if (receiverId) {

      this.conversationApi.addConversation({
        type: 'complaint',
        participantIds: [receiverId, this.auth.account.id]
      }).subscribe((response) => {
        this.router.navigate(['/conversation/' + response.conversation.id])
      }, (err) => {
      })
    }
  }
}
