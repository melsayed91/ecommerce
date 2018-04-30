import "rxjs/add/operator/takeWhile";

import {ProductApi} from '../../common/BE.SDKs/Products';
import {LoopBackConfig as attachementApiConfig} from '../../common/BE.SDKs/attachment';

import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {UserService} from '../../core/services/user.service/user.service';
import {AccountApi} from '../../common/BE.SDKs/AccountManager';
import {LoopBackAuth} from '../../common/BE.SDKs/Authorization/services/core/auth.service';
import {HeaderService} from '../../common/shared/services/header';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.alive = false;
  }

  alive: boolean = true;


  attachmentServer: string;
  products = [];

  constructor(private productApi: ProductApi,
              private route: ActivatedRoute,
              private auth: UserService,
              private AccountApi: AccountApi,
              private HeaderService: HeaderService,
              private LoopBackAuth: LoopBackAuth) {
    this.route.params.subscribe((token: any) => {
      if (token.id && token.userId) {
        this.AccountApi.getAccountByUser(token.userId).subscribe((userAccount) => {
          this.LoopBackAuth.setToken(token);
          this.auth.setAccount(userAccount.acc);
          this.auth.setTokenOfAllSDKs(token);
          this.HeaderService.show.next(true);
        });
      }
    });
  }

  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();

    this.productApi.find({include: "attachments"})
      .takeWhile(() => this.alive)
      .subscribe(response => {
        this.products = response;
      })
  }

}
