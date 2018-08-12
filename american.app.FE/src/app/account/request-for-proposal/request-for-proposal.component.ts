import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/takeWhile";

import { RfpApi, RfqApi, OfferApi, Rfp, Rfq } from "../../common/BE.SDKs/quotations";
import { SysCodeApi } from '../../common/BE.SDKs/sysCodes';
import { UserService } from '../../core/services/user.service/user.service';
import { AttachmentApi, LoopBackConfig as attachementApiConfig } from '../../common/BE.SDKs/attachment';
import { AttachmentService } from '../../core/services/attachment.service/attachment.service';
declare var $: any;

@Component({
  selector: 'app-request-for-proposal',
  templateUrl: './request-for-proposal.component.html',
  styleUrls: ['./request-for-proposal.component.scss']
})
export class RequestForProposalComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.alive = false;
  }

  alive: boolean = true;

  offer = {};
  rfps;
  rfqs;
  isBusinessUser;
  currentAccountId;
  currentUserCategories = [];
  currentRfp: Rfp = new Rfp();
  currentRfq: Rfq = new Rfq();
  currentRfpCategory;
  categories = [];
  formValidation;
  showRFPForm;
  attachmentServer: any;
  showOfferForm;

  uploadIconHtml = "<i class='fa fa-upload'></i>";
  removeHtml = "<i class='fa fa-times'></i>";
  uploaded = [];

  constructor(
    private auth: UserService,
    private RfproposalApi: RfpApi,
    private RfquataionApi: RfqApi,
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

    this.SysCodeApi.getAllSubIndustries()
      .takeWhile(() => this.alive)
      .subscribe((response: any) => {
        this.categories = response.subIndustries;
      }, (err) => { });
    this.getRfp();
    this.getRfq();
  }

  formLoaded(id) {
    this.formValidation = $('#' + id).parsley({ trigger: "change keyup" });
  }

  saveRFP() {
    if (!this.formValidation.validate())
      return;
    this.currentRfp.accountId = this.currentAccountId;
    this.currentRfp.attachmentIds = this.uploaded.map(function (item) { return item.id });
    delete this.currentRfp.category;
    this.RfproposalApi.addRFP(this.currentRfp)
      .takeWhile(() => this.alive)
      .subscribe(resp => {
        this.getRfp();
        this.showRFPForm = false;
        this.currentRfp = new Rfp();
      }, err => { })


  }

  sendOffer(rfpId) {
    this.offer['accountId'] = this.currentAccountId;
    this.offer['rfpId'] = rfpId;
    this.RfproposalApi.addRFPOffer(rfpId, this.offer)
      .takeWhile(() => this.alive)
      .subscribe((response: any) => {
        this.getRfp();
        this.currentRfp['showOfferForm'] = false;
      }, (err) => {
      })
  }


  sendRfqOffer(rfqId) {
    this.offer['accountId'] = this.currentAccountId;
    this.offer['rfqId'] = rfqId;
    this.RfquataionApi.addOffer(rfqId, this.offer)
      .takeWhile(() => this.alive)
      .subscribe((response: any) => {
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
    this.currentRfp.categoryId = e.id;
    this.currentRfp.category = e;
  }

  onAdded(event: any) {
    var form = new FormData();
    form.append("file", event.file, event.file.name);
    this.AttachmentService.upload(form, event.file.name, {})
      .takeWhile(() => this.alive)
      .subscribe((response: any) => {
        this.uploaded.push(response);
      }, (err) => {

      })
  }

  removeFile(event: any) {
    var toBeDeletedIndex = this.uploaded.findIndex(function (item) {
      return item.originalFileName === event.file.name
    });
    this.AttachmentServiceAPI.deleteById(this.uploaded[toBeDeletedIndex].id)
      .takeWhile(() => this.alive)
      .subscribe((response: any) => {
        this.uploaded.splice(toBeDeletedIndex, 1)
      }, (err) => {
      })
  }

  getRfp() {
    this.rfps = undefined;
    this.RfproposalApi.getRFPs({ catIds: this.currentUserCategories, accountId: this.currentAccountId, isBusiness: this.isBusinessUser })
      .takeWhile(() => this.alive)
      .subscribe((response: any) => {
        this.rfps = response.rfp.map(function (rfp) {
          let myOffers = rfp.offers.filter(function (offer) {
            return offer.accountId == this.currentAccountId
          }.bind(this));

          let myBest = myOffers[0] ? myOffers[0].price : 0;

          myOffers.forEach(offer => {
            if (offer.price < myBest)
              myBest = offer.price;
          });

          rfp.myBestOffer = myBest;
          rfp.myOffers = myOffers;
          return rfp;
        }.bind(this));
      }, (err) => {
      })
  }


  getRfq() {
    this.rfqs = undefined;
    this.RfquataionApi.getRFQs({ accountId: this.currentAccountId, isBusiness: this.isBusinessUser })
      .takeWhile(() => this.alive)
      .subscribe((response: any) => {
        this.rfqs = response.rfq;
      }, (err) => {
      })
  }
}
