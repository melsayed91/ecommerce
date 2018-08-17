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
  alive: any = true;

  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();
    this.route.params
      .takeWhile(() => this.alive)
      .subscribe(params => {
        if (params['id']) {
          this.productReturnApi.findById(params['id'], {
            order: "createdAt DESC",
            include: [
              {
                shipments: [
                  "seller",
                  {
                    relation: "items",
                    scope: {
                      include: {
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
                      }
                    }
                  },
                  "status"
                ]
              },
              "status"]
          }).takeWhile(() => this.alive)
            .subscribe((response) => {
              this.returnItem = response;
            })
        }
      })
  }

}
