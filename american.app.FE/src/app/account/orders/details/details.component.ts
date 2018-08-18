import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/takeWhile";
import { MatDialogModule } from '@angular/material/dialog';
import { ProductReturnsComponent } from "./returns/returns.component";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { UserService } from '../../../core/services/user.service/user.service';
import { OrderApi, ProductReviewApi, ProductComplaintApi, ProductReturnApi } from '../../../common/BE.SDKs/Products';
import { SysCodeApi } from '../../../common/BE.SDKs/sysCodes';
import { LoopBackConfig as attachementApiConfig } from '../../../common/BE.SDKs/attachment';

declare var $: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  selectedProduct: any;
  reviewRating: Number = 0;
  reviewText: string;
  complaintDescription: string;
  attachmentServer: string;
  orders: any[];
  alive: any = true;
  filingComplaint: any = false;
  userAccount;

  statusOptions = {}
  returnReasons = {}
  constructor(
    private dialog: MatDialog,
    private auth: UserService,
    private orderApi: OrderApi,
    private ProductReturnApi: ProductReturnApi,
    private productReviewApi: ProductReviewApi,
    private productComplaintApi: ProductComplaintApi,
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

    this.sysCodeService.findByParent("5b76de6846cda24e0c6448f5")
      .takeWhile(() => this.alive)
      .subscribe((response: any) => {
        this.returnReasons = response.sysCode;
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

                      include: [
                        {
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
                        }, {
                          relation: "returnStatus"
                        }
                      ]
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
        $.notify({
          message: 'You successfully changed the order status to <b>' + status.name + '</b> !'
        }, {
            type: 'primary',
            timer: 1000,
            placement: {
              from: 'bottom',
              align: 'right'
            }
          });
      });
  }

  submitReview() {

    let reviewObject = {
      orderId: this.order.id,
      rating: this.reviewRating,
      ownerId: this.userAccount.id,
      productId: this.selectedProduct.id
    };
    if (this.reviewText && this.reviewText.length) {
      reviewObject['text'] = this.reviewText;
    }
    this.productReviewApi.addProductReview(reviewObject)
      .takeWhile(() => this.alive)
      .subscribe(response => {
        this.reviewText = '';
        this.reviewRating = 0;
        $.notify({
          message: 'Thank you for the feedback!'
        }, {
            type: 'primary',
            timer: 1000,
            placement: {
              from: 'bottom',
              align: 'right'
            }
          });
      });
  }

  submitComplaint(product) {
    let reviewObject = {
      orderId: this.order.id,
      text: this.complaintDescription,
      ownerId: this.userAccount.id,
      vendorId: product.accountId,
      productId: product.id
    };

    this.productComplaintApi.addProductComplaint(reviewObject)
      .takeWhile(() => this.alive)
      .subscribe(response => {
        this.reviewText = '';
        this.reviewRating = 0;
        this.filingComplaint = false
        $.notify({
          message: 'Thank you for the feedback!'
        }, {
            type: 'primary',
            timer: 1000,
            placement: {
              from: 'bottom',
              align: 'right'
            }
          });
      });
  }
  openProductReturnDialog(shipmentItem) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      return_reasons: this.returnReasons
    };
    const dialogRef = this.dialog.open(ProductReturnsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      function (val) {
        if (val) {
          var data = {
            productId: shipmentItem.product.id,
            orderId: this.order.id,
            vendorId: shipmentItem.product.accountId,
            customerAttachmentIds: val.attachmentIds,
            reasonId: val.form.return_reason,
            description: val.form.description,
            customerId: this.userAccount.id,
            shipmentItemId: shipmentItem.id
          }
          this.ProductReturnApi.requestProductReturn(data)
            .takeWhile(() => this.alive)
            .subscribe((response: any) => {
              $.notify({
                message: 'Product Request Return sent successfully!'
              }, {
                  type: 'primary',
                  timer: 1000,
                  placement: {
                    from: 'bottom',
                    align: 'right'
                  }
                });
            }, (err) => {
              $.notify({
                message: 'Error Occured While Processing Your Request!'
              }, {
                  type: 'error',
                  timer: 1000,
                  placement: {
                    from: 'bottom',
                    align: 'right'
                  }
                });
            });
        }
      }.bind(this)
    );
  }

}
