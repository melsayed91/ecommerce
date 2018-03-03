import {Component, OnInit,AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ProductApi} from '../../common/BE.SDKs/Products';
import {LoopBackConfig as attachementApiConfig} from '../../common/BE.SDKs/attachment';

import {SpecificationApi} from '../../common/BE.SDKs/quotations';
import {UserService} from '../../core/services/user.service/user.service';
declare var $: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit,AfterViewInit{

  attachmentServer: any;
  product;
  productId: string;
  selectedImage;
  quantity;
  requestSpecificationMode = false;
  requestSpecificationLoading = false;
  requestSpecificationModel = {};
  formValidation;

  private subs = [];
  constructor(private auth: UserService,
              private route: ActivatedRoute,
              private productApi: ProductApi,
              private specificationApi: SpecificationApi) {
  }

  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();
    this.subs.push(
      this.route.params.subscribe(params => {
        this.productId = params['id'];
        this.subs.push(
          this.productApi.findById(this.productId, {
            include: [
              "attachments",
              { "account": { "accountData": "profileImage" } }
            ]
          }).subscribe(response => {
            this.product = response;
            this.selectedImage = this.product.attachments[0];
            this.quantity=this.product.moq;
          })
        )
      })
    )
  }


  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
  scrollTo(selector) {
    debugger;
    $('html, body').animate({ scrollTop: $(selector).offset().top }, 1000);
  }

  formLoaded(id) {
    debugger;
    this.formValidation = $('#' + id).parsley({ trigger: "change keyup" });
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
