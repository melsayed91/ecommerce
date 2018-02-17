import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductApi } from '../../common/BE.SDKs/Products';
import { LoopBackConfig as attachementApiConfig } from '../../common/BE.SDKs/attachment';

declare var $: any;

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
  MQO = 10;
  quantity = this.MQO;

  private subs = [];
  specs =
    [
      {
        name: 'Dakota Rice',
        value: 'Autem eaque voluptatem officiis aut vel Nam dolores rem excepteur atque est beatae perspiciatis. Autem eaque voluptatem officiis aut vel Nam dolores rem excepteur atque est beatae perspiciatis Autem eaque voluptatem officiis aut vel Nam dolores rem excepteur atque est beatae perspiciatis. Autem eaque voluptatem officiis aut vel Nam dolores rem excepteur atque est beatae perspiciatis'
      },
      {
        name: 'Minerva Hooper',
        value: 'Curaçao Sinaai-Waas $23,789'
      },
      {
        name: 'Sage Rodriguez',
        value: 'Netherlands Baileux $56,142'
      },
      {
        name: 'Philip Chaney',
        value: 'Korea, South Overland Park $38,735'
      },
      {
        name: 'Doris Greene',
        value: 'Malawi Feldkirchen in Kärnten $63,542'
      },
      {
        name: 'Dakota Rice',
        value: 'Autem eaque voluptatem officiis aut vel Nam dolores rem excepteur atque est beatae perspiciatis. Autem eaque voluptatem officiis aut vel Nam dolores rem excepteur atque est beatae perspiciatis Autem eaque voluptatem officiis aut vel Nam dolores rem excepteur atque est beatae perspiciatis. Autem eaque voluptatem officiis aut vel Nam dolores rem excepteur atque est beatae perspiciatis'
      },
      {
        name: 'Minerva Hooper',
        value: 'Curaçao Sinaai-Waas $23,789'
      },
      {
        name: 'Sage Rodriguez',
        value: 'Netherlands Baileux $56,142'
      },
      {
        name: 'Philip Chaney',
        value: 'Korea, South Overland Park $38,735'
      },
      {
        name: 'Mason Porter',
        value: 'Chile Gloucester $78,615'
      }
    ];
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
              { "account": { "accountData": "profileImage" } }
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
  scrollTo(selector) {
    debugger;
    $('html, body').animate({ scrollTop: $(selector).offset().top }, 1000);
  }
}
