import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { RfpApi, RfqApi, OfferApi } from "../../common/BE.SDKs/quotations";
@Component({
  selector: 'app-request-for-quotations',
  templateUrl: './request-for-quotations.component.html',
  styleUrls: ['./request-for-quotations.component.scss']
})
export class RequestForQuotationsComponent implements OnInit {

  rfqs = []
  isBusinessUser = true
  currentAccountId = ""
  currentUserCategories = []
  constructor(private RfpService: RfpApi,
    private RfqService: RfqApi,
    private OfferServiceAPI: OfferApi) { }

  ngOnInit() {
    // fill current user categories from the logged in user in case it's a business user
    //fill currentAccountId
    // in case it's a normal user set isBusinessUser =false
  }


  getRfq() {

    // object example
    // {
    //   "description": "rfq1",
    //     "title": "rfq for 1",
    //       "creationDate": "2018-01-26T13:25:10.865Z",
    //         "modificationDate": "2018-01-26T13:40:16.225Z",
    //           "enabled": true,
    //             "isDeleted": false,
    //               "id": "5a6b2c76c3162c0d8c246dfd",
    //                 "categoryId": "5a6a34aab7e94a3e4499d880",
    //                   "offerIds": [
    //                     "5a6b2eb450141238149f0a61"
    //                   ],
    //                     "offers": [
    //                       {
    //                         "description": "offer1",
    //                         "price": 200,
    //                         "quantity": 10,
    //                         "creationDate": "2018-01-26T13:35:48.164Z",
    //                         "id": "5a6b2eb450141238149f0a61",
    //                         "rfqId": "5a6b2c76c3162c0d8c246dfd",
    //                         "accountId": "5a6b0ed7a40c7d3728058bd1",
    //                         "title": "offer 11"
    //                       }
    //                     ]
    // }

    this.RfqService.getRFQs(this.currentUserCategories, this.currentAccountId, this.isBusinessUser).subscribe((response: any) => {
      this.rfqs = response.rfqs;
    }, (err) => {

    })
  }

  enableRfq(rfqId, enable) {
    this.RfqService.enableRFQ(rfqId, enable).subscribe((response: any) => {
      this.rfqs[this.rfqs.findIndex(function (rfq) {
        return rfq.id === rfqId
      })].enabled = enable;
    }, (err) => {

    })
  }


  deleteRfq(rfqId) {
    this.RfqService.deleteRFQ(rfqId).subscribe((response: any) => {
      this.rfqs[this.rfqs.findIndex(function (rfq) {
        return rfq.id === rfqId
      })].isDeleted = true;
    }, (err) => {

    })
  }

  addOfferToRFQ(rfqId, offer) {
    // sample offer data

    //   "offer":{
    //     "description":"fdsfsd",
    //     "title":"dsad",
    //     "price":200,
    //     "quantity":10,
    //     "accountId":"122121" current user accountId
    //   }

    this.RfqService.addOffer(rfqId, offer).subscribe((response: any) => {
    }, (err) => {
    })
  }

}
