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
  isSearching: boolean = true;
  searchSettings: any;
  query: string;
  attachmentServer: string;
  latest_products = [];
  hot_products = [];
  most_viewed_products = [];
  hide_hot_products = false;
  hide_latest_products = false;

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
    if (this.auth.account && this.auth.account.accountData) {
      this.searchSettings = this.auth.account.accountData.searchSettings;
      if (this.searchSettings) {
        if (this.searchSettings.showHot) {
          this.hide_hot_products = this.searchSettings.showHot;
        }
        if (this.searchSettings.showNew) {
          this.hide_latest_products = this.searchSettings.showNew;
        }
      }
    }
    this.attachmentServer = attachementApiConfig.getPath();
    this.productApi.search()
      .takeWhile(() => this.alive)
      .subscribe(response => {
        this.isSearching = false;
        this.handleSearchResponse(response);

        setTimeout(function () {
          $('.products').slick({ infinite: false, slidesToShow: 6, slidesToScroll: 4 });
        })
      })
  }

  handleSearchResponse(response) {
    if (response.result.responses.length > 0) {
      var newResponses = response.result.responses
      // if (this.searchSettings) {
      //   if (!this.searchSettings.showHot) {
      //     newResponses = [response.result.responses[0], false, response.result.responses[1]]
      //   }
      //   if (!this.searchSettings.showNew) {
      //     newResponses = [response.result.responses[0], response.result.responses[1], false]
      //   }
      //   if (!this.searchSettings.showNew && !this.searchSettings.showHot) {
      //     newResponses = [response.result.responses[0], false, false]
      //   }
      //   if (this.searchSettings.showNew && this.searchSettings.showHot) {
      //     newResponses = response.result.responses;
      //   }
      // } else {
      //   newResponses = response.result.responses;
      // }

      if (newResponses[0] && newResponses[0].hits.total > 0) {
        this.latest_products = newResponses[0].hits.hits.map(function (item) {
          var currentProduct = item._source;
          currentProduct._id = item._id
          if (currentProduct.discount &&
            currentProduct.discount.isActive &&
            new Date(currentProduct.discount.start_date) <= new Date() &&
            new Date(currentProduct.discount.end_date) >= new Date()) {
            currentProduct.activeDiscount = currentProduct.discount;
          } else {
            currentProduct.activeDiscount = false;
          }
          return currentProduct;
        });
      }

      if (newResponses[1] && newResponses[1].hits.total > 0) {
        this.hot_products = newResponses[1].hits.hits.map(function (item) {
          var currentProduct = item._source;
          currentProduct._id = item._id;
          if (currentProduct.discount &&
            currentProduct.discount.isActive &&
            new Date(currentProduct.discount.start_date) <= new Date() &&
            new Date(currentProduct.discount.end_date) >= new Date()) {
            currentProduct.activeDiscount = currentProduct.discount;
          } else {
            currentProduct.activeDiscount = false;
          }
          return currentProduct;
        });
      }

      if (newResponses[2] && newResponses[2].hits.total > 0) {
        this.most_viewed_products = newResponses[2].hits.hits.map(function (item) {
          var currentProduct = item._source;
          currentProduct._id = item._id;
          if (currentProduct.discount &&
            currentProduct.discount.isActive &&
            new Date(currentProduct.discount.start_date) <= new Date() &&
            new Date(currentProduct.discount.end_date) >= new Date()) {
            currentProduct.activeDiscount = currentProduct.discount;
          } else {
            currentProduct.activeDiscount = false;
          }
          return currentProduct;
        });
      }
    }
  }


  addProductToShoppingCart(product) {
    if (!this.auth.account) {
      let redirect = this.auth.redirectUrl ? this.auth.redirectUrl : '/auth/signin';
      this.router.navigate([redirect]);
      return;
    }
    this.shoppingCartApi.addCartItem({
      accountDataId: this.auth.account.accountDataId,
      productId: product._id,
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
