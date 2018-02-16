import { Component, OnInit } from '@angular/core';

import { ProductApi } from '../../common/BE.SDKs/Products';
import { LoopBackConfig as attachementApiConfig } from '../../common/BE.SDKs/attachment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  attachmentServer: string;
  products = [];

  constructor(private productApi: ProductApi) { }

  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();
    
    this.productApi.find({include: "attachments"}).subscribe(response => {
      this.products = response;
    })
  }

}
