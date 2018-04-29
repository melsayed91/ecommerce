import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserService} from '../../core/services/user.service/user.service';
import {AttachmentApi, LoopBackConfig as attachementApiConfig} from '../../common/BE.SDKs/attachment';
import {AttachmentService} from '../../core/services/attachment.service/attachment.service';
import {AccountApi} from '../../common/BE.SDKs/AccountManager';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  currentAccount: any;
  cartItems: any;
  attachmentServer: any;

  ngOnDestroy(): void {
    this.alive = false;
  }

  alive: boolean = true;


  constructor(private AccountApi: AccountApi, private auth: UserService) {
  }

  ngOnInit() {
    if (this.auth.account) {
      this.currentAccount = this.auth.account;

      this.AccountApi.getCartItems(this.auth.account.accountDataId).subscribe((resp) => {
        this.cartItems = resp.cartItems.cartItems;
      })
    }


    this.attachmentServer = attachementApiConfig.getPath();

  }

}
