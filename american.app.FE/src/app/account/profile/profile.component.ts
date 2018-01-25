import { Component, OnInit } from '@angular/core';

import { UserService } from '../../core/services/user.service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userAccount;
  user;

  constructor(private auth: UserService) {
    this.userAccount = this.auth.account;
    this.user = this.auth.userApi.getCachedCurrent();
  }

  ngOnInit() {
  }

}
