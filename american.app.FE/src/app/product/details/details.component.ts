import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RfqApi, Rfq } from "../../common/BE.SDKs/quotations";
import "rxjs/add/operator/takeWhile";

import { ProductApi, ProductReviewApi } from '../../common/BE.SDKs/Products';
import { UserService } from '../../core/services/user.service/user.service';
import { LoopBackConfig as attachementApiConfig } from '../../common/BE.SDKs/attachment';
import { SpecificationApi } from '../../common/BE.SDKs/quotations';
import { ShoppingCartApi } from '../../common/BE.SDKs/AccountManager';

declare var $: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy, AfterViewInit {

  alive: boolean = true;
  attachmentServer: any;
  productReviews: any;
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
  related_products = [];
  isSearching = true;
  private subs = [];

  constructor(private auth: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private RfquataionApi: RfqApi,
    private productApi: ProductApi,
    private shoppingCartApi: ShoppingCartApi,
    private productReviewApi: ProductReviewApi,
    private specificationApi: SpecificationApi) {
  }

  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();
    if (this.auth.account)
      this.currentAccountId = this.auth.account.id;

    this.route.params
      .takeWhile(() => this.alive)
      .subscribe(params => {
        this.productId = params['id'];
        this.productApi.incrementProductViews(this.productId)
          .takeWhile(() => this.alive)
          .subscribe(response => {

          })
        this.productApi.findById(this.productId, {
          include: [
            "attachments",
            { "account": { "accountData": "profileImage" } }
          ]
        })
          .takeWhile(() => this.alive)
          .subscribe(response => {
            this.product = response;
            if (this.product.discount &&
              this.product.discount.isActive &&
              new Date(this.product.discount.start_date) <= new Date() &&
              new Date(this.product.discount.end_date) >= new Date()) {
              this.product.activeDiscount = this.product.discount;
            } else {
              this.product.activeDiscount = false;
            }
            this.selectedImage = this.product.attachments[0];
            this.quantity = this.product.moq;


            this.productApi.search({
              facets: [{
                field: "categoryId",
                value: this.product.categoryId
              }]
            }).takeWhile(() => this.alive)
              .subscribe(response => {
                this.isSearching = false;
                if (response.result.hits.total > 0) {


                  this.related_products = response.result.hits.hits.map(function (item) {
                    var currentProduct = item._source;
                    currentProduct._id = item._id
                    if (currentProduct.discount &&
                      currentProduct.discount.isActive &&
                      new Date(currentProduct.discount.start_date) <= new Date() &&
                      new Date(currentProduct.discount.end_date) >= new Date()) {
                      currentProduct.activeDiscount = currentProduct.discount;
                    } else {
                      currentProduct.activeDiscount = false;
                    }
                    return currentProduct;
                  });
                  

                  if (this.related_products.length > 6) {
                    setTimeout(function () {
                      $('#related-products').slick({ infinite: false, slidesToShow: 6, slidesToScroll: 4 });
                    })
                  }
                }
              });
          })
        this.productReviewApi.getReviews(this.productId)
          .takeWhile(() => this.alive)
          .subscribe(response => {
            this.productReviews = response.reviews;
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
    if (!this.auth.account) {
      let redirect = this.auth.redirectUrl ? this.auth.redirectUrl : '/home';
      this.router.navigate([redirect]);
      return;
    }
    this.currentRfq.accountId = this.currentAccountId;
    this.currentRfq['productId'] = this.product.id;
    this.currentRfq['productOwnerId'] = this.product.accountId;
    this.RfquataionApi.addRFQ(this.currentRfq).subscribe(resp => {
      this.showRFQForm = false;
      this.currentRfq = new Rfq();
    }, err => {
    })
  }

  ngAfterViewInit() {
  }

  toggleRequestSpecification() {
    this.requestSpecificationMode = !this.requestSpecificationMode;
  }

  requestSpecification() {
    if (!this.auth.account) {
      let redirect = this.auth.redirectUrl ? this.auth.redirectUrl : '/home';
      this.router.navigate([redirect]);
      return;
    }
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

  addProductToShoppingCart() {
    if (!this.auth.account) {
      let redirect = this.auth.redirectUrl ? this.auth.redirectUrl : '/auth/signin';
      this.router.navigate([redirect]);
      return;
    }
    this.shoppingCartApi.addCartItem({
      accountDataId: this.auth.account.accountDataId,
      productId: this.product.id,
      quantity: this.quantity
    }).subscribe(resp => {
      $.notify({
        message: 'We added <b>' + this.product.name + '</b> to your shopping cart!'
      }, {
          type: 'primary',
          timer: 1000,
          placement: {
            from: 'bottom',
            align: 'right'
          }
        });
      if (this.auth.account.accountData.cartItemId) {
        this.auth.account.accountData.cartItemId.push(resp.accountData)
      } else {
        this.auth.account.accountData.cartItemId = [resp.accountData]
      }
      this.auth.setAccount(this.auth.account)
    }, err => {
    })
  }
}
