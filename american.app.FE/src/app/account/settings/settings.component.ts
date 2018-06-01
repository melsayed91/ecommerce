import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service/user.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  userAccount;
  blacklistCustomers;
  cities=[
    { viewValue:"Cairo",value:1},
    { viewValue: "Dubai", value: 2 },
  ]
  constructor(private auth: UserService) {
    this.userAccount = this.auth.account;
  }

  ngOnInit() {
  }

}
