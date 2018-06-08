import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../core/services/user.service/user.service';
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
  isBusinessAccount = true;
  pendingOrders = 0;
  completedOrders = 0;
  productsView = 0;
  alive: any = true;
  isSearching: any = true;
  constructor(private auth: UserService,
    private orderApi: OrderApi,
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

      })
  }

}
