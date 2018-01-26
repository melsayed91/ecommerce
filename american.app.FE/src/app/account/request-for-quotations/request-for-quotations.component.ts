import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { RfpApi, RfqApi, OfferApi, Rfq } from "../../common/BE.SDKs/quotations";
import { SysCodeApi } from '../../common/BE.SDKs/sysCodes';
import { UserService } from '../../core/services/user.service/user.service';
import { AttachmentApi, LoopBackConfig as attachementApiConfig } from '../../common/BE.SDKs/attachment';
import { AttachmentService } from '../../core/services/attachment.service/attachment.service';
declare var $: any;

@Component({
  selector: 'app-request-for-quotations',
  templateUrl: './request-for-quotations.component.html',
  styleUrls: ['./request-for-quotations.component.scss']
})
export class RequestForQuotationsComponent implements OnInit {

  rfqs;
  isBusinessUser;
  currentAccountId;
  currentUserCategories = [];
  currentRfq: Rfq = new Rfq();
  currentRfqCategory;
  categories = [];
  formValidation;
  showRFQForm;

  uploadIconHtml = "<i class='fa fa-upload'></i>";
  removeHtml = "<i class='fa fa-times'></i>";
  uploaded = [];

  constructor(
    private auth: UserService,
    private RfproposalApi: RfpApi,
    private RfquotationApi: RfqApi,
    private OfferServiceAPI: OfferApi,
    private SysCodeApi: SysCodeApi,
    private AttachmentService: AttachmentService,
    private AttachmentServiceAPI: AttachmentApi) { }

  ngOnInit() {

    this.currentAccountId = this.auth.account.id;
    this.isBusinessUser = this.auth.account.accountType == "Business";
    if (this.isBusinessUser)
      this.currentUserCategories = this.auth.account.accountData.categoryIds;
    this.SysCodeApi.findByParent("5a651615f22fe122e0862672").subscribe((response: any) => {
      this.categories = response.sysCode;
    }, (err) => { });
    this.getRfq();
  }
  formLoaded() {
    this.formValidation = $('#rfqForm').parsley({ trigger: "change keyup" });
  }
  saveRFQ() {
    if (!this.formValidation.validate())
      return;
    this.currentRfq.accountId = this.currentAccountId;
    this.currentRfq.attachmentIds: this.uploaded.map(function (item) { return item.id });
    this.RfquotationApi.create(this.currentRfq).subscribe(resp => {
      this.getRfq();
      this.showRFQForm = false;
    }, err => { })
  }

  autocompleListFormatter = (data: any) => {
    return data['name']
  }

  validatefield(fieldId) {
    $("#" + fieldId).parsley().validate();
  }

  categoryChanged(e) {
    this.currentRfq.categoryId = e.id;
    this.currentRfq.category = e;
  }



  onAdded(event: any) {
    var form = new FormData();
    form.append("file", event.file, event.file.name);
    this.AttachmentService.upload(form, event.file.name, {}).subscribe((response: any) => {
      this.uploaded.push(response);
    }, (err) => {

    })
  }

  removeFile(event: any) {
    var toBeDeletedIndex = this.uploaded.findIndex(function (item) {
      return item.originalFileName === event.file.name
    });
    this.AttachmentServiceAPI.deleteById(this.uploaded[toBeDeletedIndex].id).subscribe((response: any) => {
      this.uploaded.splice(toBeDeletedIndex, 1)
    }, (err) => {
    })
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

    this.rfqs = undefined;
    this.RfquotationApi.getRFQs(this.currentUserCategories, this.currentAccountId, this.isBusinessUser).subscribe((response: any) => {
      this.rfqs = response.rfq;
    }, (err) => {

    })
  }

  enableRfq(rfqId, enable) {
    this.RfquotationApi.enableRFQ(rfqId, enable).subscribe((response: any) => {
      this.rfqs[this.rfqs.findIndex(function (rfq) {
        return rfq.id === rfqId
      })].enabled = enable;
    }, (err) => {

    })
  }


  deleteRfq(rfqId) {
    this.RfquotationApi.deleteRFQ(rfqId).subscribe((response: any) => {
      this.getRfq();
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

    this.RfquotationApi.addOffer(rfqId, offer).subscribe((response: any) => {
    }, (err) => {
    })
  }

}
