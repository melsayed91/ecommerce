import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/takeWhile";

import { UserService } from '../../../core/services/user.service/user.service';
import { OrderApi } from '../../../common/BE.SDKs/Products';
import { SysCodeApi } from '../../../common/BE.SDKs/sysCodes';
import { LoopBackConfig as attachementApiConfig } from '../../../common/BE.SDKs/attachment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  attachmentServer: string;
  orders: any[];
  alive: any = true;
  userAccount;

  statusOptions = {
  }

  constructor(private auth: UserService,
    private orderApi: OrderApi,
    private sysCodeService: SysCodeApi,
    private route: ActivatedRoute) {
    this.userAccount = this.auth.account;
  }

  ngOnInit() {

    this.sysCodeService.findByParent("5a89a6a49fcea8171cb0f0d3")
      .takeWhile(() => this.alive)
      .subscribe((response: any) => {
        this.statusOptions = response.sysCode;
      }, (err) => {

      })

    this.attachmentServer = attachementApiConfig.getPath();
    this.route.params
      .takeWhile(() => this.alive)
      .subscribe(params => {
        if (params['id']) {
          this.orderApi.findById(params['id'], {
            order: "createdAt DESC",
            include: [
              {
                shipments: [
                  "seller",
                  {
                    relation: "items",
                    scope: {
                      include: {
                        relation: "product",
                        scope: {
                          include: {
                            relation: "attachments",
                            scope: {
                              fields: ['url'],
                              limit: 1
                            }
                          }
                        }
                      }
                    }
                  },
                  "status"
                ]
              },
              "status"]
          }).takeWhile(() => this.alive)
            .subscribe((response) => {
              this.order = response;
            })
        }
      })

  }


  updateOrder(status) {
    this.order.status = status;
    this.orderApi.updateModelAttributes(this.order.id, { statusId: status.id })
      .takeWhile(() => this.alive)
      .subscribe(response => {
        console.log(response)
      });
  }

}
