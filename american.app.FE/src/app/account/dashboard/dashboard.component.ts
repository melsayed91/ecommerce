import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service/user.service';
import { OrderApi, ShipmentApi } from '../../common/BE.SDKs/Products';
import "rxjs/add/operator/takeWhile";
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class dashboardComponent implements OnInit {
  userAccount;
  customers;
  orders;
  isBusinessAccount = true;
  pendingOrders = 0;
  completedOrders = 0;
  alive: any = true;
  constructor(private auth: UserService,
    private orderApi: OrderApi) {
    this.userAccount = this.auth.account;
    if (this.userAccount.accountType === "Business") {
      this.customers = this.userAccount.accountData.customerIds ? this.userAccount.accountData.customerIds.length : 0;
    } else {
      this.isBusinessAccount = false;
    }
  }

  ngOnInit() {
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

}
