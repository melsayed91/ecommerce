import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SysUserApi, LoopBackAuth, InternalStorage } from '../../../common/BE.SDKs/Authorization';
import {
  AccountManagerAuth,
  AttachmentAuth,
  ProductsAuth,
  QuotationsAuth,
  SysCodesAuth
} from '../../../common/BE.SDKs';

@Injectable()
export class UserService extends LoopBackAuth {
  account;
  // store the URL so we can redirect after logging in
  redirectUrl: string;


  constructor(
    public userApi: SysUserApi,
    storage: InternalStorage,
    private router: Router,
    private AccountManagerAuth: AccountManagerAuth,
    private AttachmentAuth: AttachmentAuth,
    private ProductsAuth: ProductsAuth,
    private QuotationsAuth: QuotationsAuth,
    private SysCodesAuth: SysCodesAuth) {

    super(storage);
    let storedAccount = this.load("account");
    this.account = (typeof storedAccount === 'string') ? JSON.parse(storedAccount) : storedAccount;
  }

  setAccount(account) {
    this.account = account;
    this.persist("account", account);
  }
  setAccountData(accountData) {
    this.account.accountData = accountData;
    this.persist("account", this.account);
  }

  setTokenOfAllSDKs(response) {
    this.AccountManagerAuth.setToken(response);
    this.AttachmentAuth.setToken(response);
    this.ProductsAuth.setToken(response);
    this.QuotationsAuth.setToken(response);
    this.SysCodesAuth.setToken(response);
  };

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