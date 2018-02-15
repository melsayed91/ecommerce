import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductApi } from '../../common/BE.SDKs/Products';
import { LoopBackConfig as attachementApiConfig } from '../../common/BE.SDKs/attachment';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  attachmentServer: any;
  product;
  productId: string;
  selectedImage;
  quantity = 1;

  private subs = [];

  constructor(
    private route: ActivatedRoute,
    private productApi: ProductApi) { }

  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();

    this.subs.push(
      this.route.params.subscribe(params => {
        this.productId = params['id'];
        this.subs.push(
          this.productApi.findById(this.productId, {
            include: [
              "attachments",
              {"account": {"accountData": "profileImage"}}
            ]
          }).subscribe(response => {
            this.product = response;
            this.selectedImage = this.product.attachments[0];
          })
        )
      })
    )
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
