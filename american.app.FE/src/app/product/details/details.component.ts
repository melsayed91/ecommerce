import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/takeWhile";

import { ProductApi } from '../../common/BE.SDKs/Products';
import { LoopBackConfig as attachementApiConfig } from '../../common/BE.SDKs/attachment';

declare var $: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  alive: boolean = true;
  attachmentServer: any;
  product;
  productId: string;
  selectedImage;
  quantity;

  private subs = [];
  constructor(
    private route: ActivatedRoute,
    private productApi: ProductApi) { }

  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();


    this.route.params
      .takeWhile(() => this.alive)
      .subscribe(params => {
        this.productId = params['id'];

        this.productApi.findById(this.productId, {
          include: [
            "attachments",
            { "account": { "accountData": "profileImage" } }
          ]
        })
          .takeWhile(() => this.alive)
          .subscribe(response => {
            this.product = response;
            this.selectedImage = this.product.attachments[0];
            this.quantity = this.product.moq;
          })
      })

  }

  ngOnDestroy() {
    this.alive = false;
  }
  scrollTo(selector) {
    debugger;
    $('html, body').animate({ scrollTop: $(selector).offset().top }, 1000);
  }
}
