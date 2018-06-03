import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProductApi, Product } from '../../common/BE.SDKs/Products';
import { AttachmentApi, LoopBackConfig as attachementApiConfig } from '../../common/BE.SDKs/attachment';
import { AttachmentService } from '../../core/services/attachment.service/attachment.service';
declare var $: any;


@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.alive = false;
  }
  private attachmentServer: any;
  private serachMode;
  private searchPlaceHolder = "Search for Products and Suppliers...";
  private SearchText;
  private alive: boolean = true;
  private products = [];
  constructor(
    private ProductApi: ProductApi,
    private router: Router
  ) { }

  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();
  }


  search() {
    this.serachMode = false;
    this.router.navigate(['/search', this.SearchText.trim()]);
  }

  onSearchChange(searchValue: string) {
    if (searchValue && searchValue.trim()) {
      this.ProductApi.suggest(searchValue).takeWhile(() => this.alive)
        .subscribe((response) => {
          this.products = response.result.suggest.products[0].options.map(function (item) {
            return {
              text: item.text,
              image_url: item._source.image_url,
              category: item._source.category,
              _id: item._id
            }
          });
        }, (err) => {

        })
    } else {
      this.products = [];
    }

  }

}
