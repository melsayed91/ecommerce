import { Component, OnInit, OnDestroy,AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RfqApi, Rfq } from "../../common/BE.SDKs/quotations";
import "rxjs/add/operator/takeWhile";

import { ProductApi } from '../../common/BE.SDKs/Products';
import { UserService } from '../../core/services/user.service/user.service';
import {LoopBackConfig as attachementApiConfig } from '../../common/BE.SDKs/attachment';
import {SpecificationApi} from '../../common/BE.SDKs/quotations';
declare var $: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy,AfterViewInit {

  alive: boolean = true;
  attachmentServer: any;
  product;
  productId: string;
  selectedImage;
  currentAccountId;
  quantity = 1;
  formValidation;
  showRFQForm = false;
  currentRfq: Rfq = new Rfq();
  requestSpecificationMode = false;
  requestSpecificationLoading = false;
  requestSpecificationModel = {};

  private subs = [];
  constructor(private auth: UserService,
    private route: ActivatedRoute,
    private RfquataionApi: RfqApi,
              private productApi: ProductApi,
              private specificationApi: SpecificationApi) {
  }

  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();
    this.currentAccountId = this.auth.account.id;

    this.route.params
      .takeWhile(() => this.alive)
      .subscribe(params => {
        this.productId = params['id'];

        this.productApi.findById(this.productId, {
          include: [
            "attachments",
            { "account": { "accountData": "profileImage" } }
          ]
        })
          .takeWhile(() => this.alive)
          .subscribe(response => {
            this.product = response;
            this.selectedImage = this.product.attachments[0];
            this.quantity = this.product.moq;
          })
      })
  }


  ngOnDestroy() {
    this.alive = false;
  }
  scrollTo(selector) {
    $('html, body').animate({ scrollTop: $(selector).offset().top }, 1000);
  }
  formLoaded(id) {
    this.formValidation = $('#' + id).parsley({ trigger: "change keyup" });
  }
  validatefield(fieldId) {
    $("#" + fieldId).parsley().validate();
  }
  addRfq() {
    this.currentRfq.accountId = this.currentAccountId;
    this.currentRfq['productId'] = this.product.id;
    this.currentRfq['productOwnerId'] = this.product.accountId;
    this.RfquataionApi.addRFQ(this.currentRfq).subscribe(resp => {
      this.showRFQForm = false;
      this.currentRfq = new Rfq();
    }, err => { })
  }

  ngAfterViewInit() {
  }
  toggleRequestSpecification() {
    this.requestSpecificationMode = !this.requestSpecificationMode;
  }

  requestSpecification() {

    this.requestSpecificationLoading = true;
    this.specificationApi.addSpecification({
      productId: this.product.id,
      description: this.requestSpecificationModel['description'],
      accountId: this.auth.account.id,
      productOwnerId: this.product.accountId,
    }).subscribe(response => {
      this.requestSpecificationMode = false;
      this.requestSpecificationLoading = false;
      this.requestSpecificationModel = {};
    })
  }
}
