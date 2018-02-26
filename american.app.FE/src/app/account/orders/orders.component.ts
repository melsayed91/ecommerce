import { Component, OnInit } from '@angular/core';

import "rxjs/add/operator/takeWhile";

import { UserService } from '../../core/services/user.service/user.service';
import { OrderApi, ShipmentApi } from '../../common/BE.SDKs/Products';
import { LoopBackConfig as attachementApiConfig } from '../../common/BE.SDKs/attachment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  attachmentServer: string;
  orders;
  alive: any = true;
  userAccount;

  constructor(private auth: UserService,
    private orderApi: OrderApi,
    private shipmentApi: ShipmentApi) {
    this.userAccount = this.auth.account;
  }

  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();
    this.loadOrders();

  }

  loadOrders(): any {

    if (this.userAccount.accountType == "Individual")
      this.orderApi.find({
        where: { ownerId: this.userAccount.id },
        order: "createdAt DESC",
        include: [
          {
            shipments: ["seller",
              {
                items: {
                  relation: "product",
                  scope: {
                    include: {
                      relation: "attachments",
                      scope: { fields: ['url'], limit: 1 }
                    }
                  }
                }
              },
              "status"]
          },
          "status"]
      })
        .takeWhile(() => this.alive)
        .subscribe((response) => {
          this.orders = response;
        })

    if (this.userAccount.accountType == "Business")
      this.shipmentApi.find({
        where: { sellerId: this.userAccount.id },
        order: "createdAt DESC",
        include: [
          { "order": ["status"] },
          {
            items: {
              relation: "product",
              scope: {
                include: {
                  relation: "attachments",
                  scope: { fields: ['url'], limit: 1 }
                }
              }
            }
          },
          "status"]

      })
        .takeWhile(() => this.alive)
        .subscribe((response) => {
          this.orders = response.map(function (shipment: any) {
            const order = JSON.parse(JSON.stringify(shipment.order as {}));
            delete shipment.order;
            order.shipments = [shipment];
            return order;
          });
        })
  }

}
