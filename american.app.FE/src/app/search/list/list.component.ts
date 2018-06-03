import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderApi, ShipmentApi, Product, ProductApi } from '../../common/BE.SDKs/Products';
import { AttachmentApi, LoopBackConfig as attachementApiConfig } from '../../common/BE.SDKs/attachment';
import { AttachmentService } from '../../core/services/attachment.service/attachment.service';
import "rxjs/add/operator/takeWhile";
declare var $: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private products = [];
  private total=0;
  private attachmentServer: any;
  private query: string;
  private aggregations: any;
  private isSearching: boolean = true;
  alive: any = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productApi: ProductApi
  ) { }

  ngOnDestroy(): void {
    this.alive = false;
  }
  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();
    this.route.params
      .takeWhile(() => this.alive)
      .subscribe(params => {
        this.query = params['query'];
        this.productApi.search(this.query)
          .takeWhile(() => this.alive)
          .subscribe(response => {
            this.isSearching = false;
            if (response.result.aggregations) {
              this.aggregations = response.result.aggregations;
            }
            if (response.result.hits.total > 0) {
              this.total = response.result.hits.total;
              this.products = response.result.hits.hits.map(function (item) {
                var currentProduct = item._source;
                currentProduct._id = item._id
                return currentProduct;
              });

            }
          })
      });
  }

}
