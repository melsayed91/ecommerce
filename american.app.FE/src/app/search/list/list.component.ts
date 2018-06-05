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
  private total = 0;
  private attachmentServer: any;
  private query: string;
  private aggregations: any;
  private isSearching: boolean = true;
  private applyingFilters: boolean = false;
  private searchParams = {};
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
        this.applyingFilters = false;
        this.resetParams();
        this.query = params['query'];
        this.searchParams['text'] = this.query
        this.doSearch();
      });
  }

  onSortChange(field, direction) {
    this.searchParams['sort'] = {
      field: field,
      dir: direction
    }
    this.doSearch();
  }

  onFilterApply(filters) {
    this.applyingFilters = true;
    this.searchParams['facets'] = filters;
    this.doSearch();
  }


  resetParams() {
    this.products = [];
    this.aggregations = {};
    this.total = 0;
  }
  doSearch() {
    this.resetParams();
    this.isSearching = true;
    this.productApi.search(this.searchParams)
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

        } else {
          this.products = [];
        }
      })
  }
}
