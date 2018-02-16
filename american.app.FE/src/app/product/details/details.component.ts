import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RfqApi, Rfq } from "../../common/BE.SDKs/quotations";
import { ProductApi } from '../../common/BE.SDKs/Products';
import { UserService } from '../../core/services/user.service/user.service';
import { LoopBackConfig as attachementApiConfig } from '../../common/BE.SDKs/attachment';
declare var $: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  attachmentServer: any;
  product;
  productId: string;
  selectedImage;
  currentAccountId;
  quantity = 1;
  formValidation;
  showRFQForm = false;
  currentRfq: Rfq = new Rfq();
  private subs = [];

  constructor(
    private auth: UserService,
    private route: ActivatedRoute,
    private RfquataionApi: RfqApi,
    private productApi: ProductApi) { }

  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();
    this.currentAccountId = this.auth.account.id;
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
          })
        )
      })
    )
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
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

}
