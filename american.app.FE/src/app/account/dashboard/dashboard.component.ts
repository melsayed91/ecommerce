import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../core/services/user.service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountApi, ShoppingCartApi } from '../../common/BE.SDKs/AccountManager';
import { OrderApi, ShipmentApi, Product, ProductApi } from '../../common/BE.SDKs/Products';
import { AttachmentApi, LoopBackConfig as attachementApiConfig } from '../../common/BE.SDKs/attachment';
import { AttachmentService } from '../../core/services/attachment.service/attachment.service';
import { environment } from '../../../environments/environment';
import "rxjs/add/operator/takeWhile";
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class dashboardComponent implements OnInit, OnDestroy {
  userAccount;
  customers;
  orders;
  private attachmentServer: any;
  private products = [];
  private products_stream = [];
  isBusinessAccount = true;
  pendingOrders = 0;
  completedOrders = 0;
  productsView = 0;
  alive: any = true;
  isSearching: any = true;
  constructor(private auth: UserService,
    private orderApi: OrderApi,
    private route: ActivatedRoute,
    private router: Router,
    private shoppingCartApi: ShoppingCartApi,
    private ProductApi: ProductApi, ) {
    this.userAccount = this.auth.account;
    if (this.userAccount.accountType === "Business") {
      this.customers = this.userAccount.accountData.customerIds ? this.userAccount.accountData.customerIds.length : 0;
    } else {
      this.isBusinessAccount = false;
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();
    if (this.isBusinessAccount) {
      this.loadProductCatalog();
    } else {
      this.loadProductStream();
    }
    this.loadOrders();
  }

  loadOrders(): any {
    var query = {};
    if (this.isBusinessAccount) {
      query["sellerId"] = this.userAccount.id
    } else {
      query["ownerId"] = this.userAccount.id
    }
    this.orderApi.find({
      where: query,
      order: "createdAt DESC"
    })
      .takeWhile(() => this.alive)
      .subscribe((response) => {
        this.orders = response;
        this.pendingOrders = this.orders.filter(function (item) {
          return item.statusId == "5a89a6c29fcea8171cb0f0d4";
        }).length

        this.completedOrders = this.orders.filter(function (item) {
          return item.statusId == "5a89aaca9fcea8171cb0f0d8";
        }).length
      })
  }

  loadProductCatalog(): any {
    this.ProductApi.catalog().takeWhile(() => this.alive)
      .subscribe((response) => {
        this.isSearching = false;
        if (response.result.hits.total > 0) {
          this.products = response.result.hits.hits.map(function (item) {
            var currentProduct = item._source;
            currentProduct._id = item._id
            this.productsView += currentProduct.views;
            return currentProduct;
          }.bind(this));
        }

      }, (error) => {
        this.isSearching = false;
        $.notify({
          icon: 'notifications',
          message: 'An Error Occured While Getting Your Product Catalog.'
        }, {
            type: 'danger',
            timer: 2000,
            placement: {
              from: 'bottom',
              align: 'right'
            }
          });
      })
  }

  loadProductStream(): any {
    this.ProductApi.search({ isDashboard: true }).takeWhile(() => this.alive)
      .subscribe((response) => {
        this.isSearching = false;
        if (response.result.hits.total > 0) {
          this.products_stream = response.result.hits.hits.map(function (item) {
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
          if (response.result.hits.total > 6) {
            setTimeout(function () {
              $('.products').slick({ infinite: false, slidesToShow: 6, slidesToScroll: 4 });
            });
          }
        }
      }, (error) => {
        this.isSearching = false;
        $.notify({
          icon: 'notifications',
          message: 'An Error Occured While Getting Product Stream.'
        }, {
            type: 'danger',
            timer: 2000,
            placement: {
              from: 'bottom',
              align: 'right'
            }
          });
      });
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
