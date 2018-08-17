import {Component, OnInit} from '@angular/core';
import {LoopBackConfig as attachementApiConfig} from "../../../common/BE.SDKs/attachment";
import {ActivatedRoute} from "@angular/router";
import {ProductReturnApi} from '../../../common/BE.SDKs/Products';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class ReturnsDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private productReturnApi: ProductReturnApi) {
  }

  attachmentServer: string;
  returnItem: any;
  selectedImage: any;
  alive: any = true;

  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();
    this.route.params
      .takeWhile(() => this.alive)
      .subscribe(params => {
        debugger;
        if (params['id']) {
          this.productReturnApi.getReturnById(params['id']).takeWhile(() => this.alive)
            .subscribe((response) => {
              this.returnItem = response.returnItem;
              this.selectedImage = this.returnItem.customerAttachment[0];
            })
        }
      })
  }

}
