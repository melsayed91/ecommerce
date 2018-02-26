import { Component, OnInit, OnDestroy } from '@angular/core';
import "rxjs/add/operator/takeWhile";

import { ProductApi } from '../../common/BE.SDKs/Products';
import { LoopBackConfig as attachementApiConfig } from '../../common/BE.SDKs/attachment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.alive = false;
  }

  alive: boolean = true;


  attachmentServer: string;
  products = [];

  constructor(private productApi: ProductApi) { }

  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();

    this.productApi.find({ include: "attachments" })
      .takeWhile(() => this.alive)
      .subscribe(response => {
        this.products = response;
      })
  }

}
