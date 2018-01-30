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

  offer = {};
  rfqs;
  isBusinessUser;
  currentAccountId;
  currentUserCategories = [];
  currentRfq: Rfq = new Rfq();
  currentRfqCategory;
  categories = [];
  formValidation;
  showRFQForm;
  attachmentServer: any;
  showOfferForm;

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
    this.attachmentServer = attachementApiConfig.getPath();
    this.currentAccountId = this.auth.account.id;
    this.isBusinessUser = this.auth.account.accountType == "Business";
    if (this.isBusinessUser)
      this.currentUserCategories = this.auth.account.accountData.categoryIds;
    this.SysCodeApi.getAllSubIndustries().subscribe((response: any) => {
      this.categories = response.subIndustries;
    }, (err) => { });
    this.getRfq();
  }

  formLoaded(id) {
    this.formValidation = $('#' + id).parsley({ trigger: "change keyup" });
  }

  saveRFQ() {
    if (!this.formValidation.validate())
      return;
    this.currentRfq.accountId = this.currentAccountId;
    this.currentRfq.attachmentIds = this.uploaded.map(function (item) { return item.id });
    delete this.currentRfq.category;
    this.RfquotationApi.addRFQ(this.currentRfq).subscribe(resp => {
      this.getRfq();
      this.showRFQForm = false;
      this.currentRfq = new Rfq();
    }, err => { })
  }

  sendOffer(rfqId) {

    this.offer['accountId'] = this.currentAccountId;
    this.RfquotationApi.addOffer(rfqId, this.offer).subscribe((response: any) => {
      this.getRfq();
      this.currentRfq['showOfferForm'] = false;
    }, (err) => {
    })
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
    this.rfqs = undefined;
    this.RfquotationApi.getRFQs({ catIds: this.currentUserCategories, accountId: this.currentAccountId, isBusiness: this.isBusinessUser }).subscribe((response: any) => {
      this.rfqs = response.rfq.map(function (rfq) {
        let myOffers = rfq.offers.filter(function (offer) {
          return offer.accountId == this.currentAccountId
        }.bind(this));
        
        let myBest = myOffers[0] ? myOffers[0].price : 0;

        myOffers.forEach(offer => {
          if (offer.price < myBest)
            myBest = offer.price;
        });

        rfq.myBestOffer = myBest;
        rfq.myOffers = myOffers;
        return rfq;
      }.bind(this));
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

}
