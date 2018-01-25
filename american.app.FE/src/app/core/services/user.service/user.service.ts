import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SysUserApi, LoopBackAuth, InternalStorage } from '../../../common/BE.SDKs/Authorization';

@Injectable()
export class UserService extends LoopBackAuth {
  account;
  // store the URL so we can redirect after logging in
  redirectUrl: string;


  constructor(
    public userApi: SysUserApi,
    storage: InternalStorage,
    private router: Router) {
    super(storage);
    let storedAccount = this.load("account");
    this.account = (typeof storedAccount === 'string') ? JSON.parse(storedAccount) : storedAccount;
  }

  setAccount(account) {
    this.account = account;
    this.persist("account", account);
  }

  clearAccount() {
    this.storage.remove(`${this.prefix}account`)
  }

  logout() {
    let token = this.getToken();
    this.router.navigate(['/home']);    
    this.userApi.logout().subscribe((response) => {
      this.clearAccount();
    }, (error) => {
      this.setToken(token);
    })
  }

}