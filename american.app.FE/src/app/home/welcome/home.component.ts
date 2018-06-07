import "rxjs/add/operator/takeWhile";

import { ProductApi } from '../../common/BE.SDKs/Products';
import { LoopBackConfig as attachementApiConfig } from '../../common/BE.SDKs/attachment';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../core/services/user.service/user.service';
import { AccountApi, ShoppingCartApi } from '../../common/BE.SDKs/AccountManager';
import { LoopBackAuth } from '../../common/BE.SDKs/Authorization/services/core/auth.service';
import { HeaderService } from '../../common/shared/services/header';


declare var $: any;
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

  query: string;
  attachmentServer: string;
  products = [];

  constructor(private productApi: ProductApi,
    private route: ActivatedRoute,
    private router: Router,
    private auth: UserService,
    private AccountApi: AccountApi,
    private HeaderService: HeaderService,
    private shoppingCartApi: ShoppingCartApi,
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
    setTimeout(function(){
      $('.products').slick({infinite: false,variableWidth: true});

    },3000)
    this.route.params
      .takeWhile(() => this.alive)
      .subscribe(params => {
        this.query = params['query'];

      });
  }
  getProducts(callBack){
    this.productApi.search(this.query)
      .takeWhile(() => this.alive)
      .subscribe(response => {
        if (response.result.hits.total > 0) {
          this.products = response.result.hits.hits.map(function (item) {
            var currentProduct = item._source;
            currentProduct._id = item._id;
            return currentProduct;
          });
        }
        callBack(this.products);
      })
  }
  addProductToShoppingCart(product) {
    if (!this.auth.account) {
      let redirect = this.auth.redirectUrl ? this.auth.redirectUrl : '/auth/signin';
      this.router.navigate([redirect]);
      return;
    }
    this.shoppingCartApi.addCartItem({
      accountDataId: this.auth.account.accountDataId,
      productId: product.id,
      quantity: 1
    }).subscribe(resp => {
      $.notify({
        message: 'We added <b>' + product.name + '</b> to your shopping cart!'
      }, {
          type: 'primary',
          timer: 1000,
          placement: {
            from: 'bottom',
            align: 'right'
          }
        });
      if (this.auth.account.accountData.cartItemId) {
        this.auth.account.accountData.cartItemId.push(resp.accountData)
      } else {
        this.auth.account.accountData.cartItemId = [resp.accountData]
      }
      this.auth.setAccount(this.auth.account)
    }, err => {
    })
  }
}
