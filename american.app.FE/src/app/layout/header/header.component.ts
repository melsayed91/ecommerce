import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../core/services/user.service/user.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private auth: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  getUserEmail() {
    return this.auth.userApi.getCachedCurrent() ? this.auth.userApi.getCachedCurrent().email : '';
  }

  getUserName() {
    return this.auth.account ? this.auth.account.data.name : '';
  }

  navigateTo(destination: string) {
    this.router.navigate([destination]);
  }

}
