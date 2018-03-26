import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RfqApi, Rfq, Offer } from "../../../common/BE.SDKs/quotations";
import { UserService } from '../../../core/services/user.service/user.service';
import { LoopBackConfig as attachementApiConfig } from '../../../common/BE.SDKs/attachment';
declare var $: any;
declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any[];
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class QuatationDetailsComponent implements OnInit, AfterViewInit {

  attachmentServer: any;
  quatation;
  product;
  quatationId: string;
  selectedImage;
  showOfferForm = false;
  isBusinessUser;
  currentAccountId;
  expiryDate;
  quantity = 1;
  formValidation;
  offer: Offer = new Offer();
  showRFQForm = false;
  currentRfq: Rfq = new Rfq();
  private subs = [];
  rfqStatus = {
    "open": "5a87059a8a8d811ea8e8434c",
    "offered": "5a8705ad8a8d811ea8e8434e",
    "rejected": "5a8705c38a8d811ea8e8434f",
    "finished": "5a8705cd8a8d811ea8e84350"
  };
  offerStatus = {
    "open": "5a947bacc639c71f6875ee71",
    "approved": "5a947bb4c639c71f6875ee72",
    "rejected": "5a947bbbc639c71f6875ee73"
  };
  constructor(
    private auth: UserService,
    private route: ActivatedRoute,
    private RfquataionApi: RfqApi) { }
  public dataTable: DataTable;
  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();
    this.currentAccountId = this.auth.account.id;
    this.isBusinessUser = this.auth.account.accountType == "Business";
    this.getQuatation();
  }
  ngAfterViewInit() {
    $('#offersTable').DataTable({
      'pagingType': 'full_numbers',
      'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
      responsive: true,
      searching: false,
      bPaginate: false,
      ordering: false
    });

    const table = $('#offersTable').DataTable();
  }
  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
  scrollTo(selector) {
    $('html, body').animate({ scrollTop: $(selector).offset().top }, 1000);
  }

  openOfferForm() {
    this.showOfferForm = true;
  }
  closeOfferForm() {
    this.showOfferForm = false;
    this.offer = new Offer();
  }
  getQuatation() {

    this.subs.push(
      this.route.params.subscribe(params => {
        this.quatationId = params['id'];
        this.subs.push(
          this.RfquataionApi.findById(this.quatationId, {
            include: ['offers', { 'account': 'accountData' }, { 'product': 'attachments' }, 'status', 'productOwner']
          }).subscribe(response => {
            this.quatation = response;
            this.product = this.quatation.product;
            this.selectedImage = this.quatation.product.attachments[0];
            this.quantity = this.quatation.product.moq;
            this.dataTable = {
              headerRow: ['Description', 'Price', 'Creation Date', 'Expiry Date'],
              footerRow: ['Description', 'Price', 'Creation Date', 'Expiry Date'],
              dataRows: []
            };
            this.dataTable.dataRows = this.quatation.offers;
          })
        )
      })
    )

  }
  SaveOffer() {
    this.offer.accountId = this.currentAccountId;
    this.offer.rfqId = this.quatation.id;
    this.offer.expiryDate = this.expiryDate;
    this.RfquataionApi.addOffer(this.quatation.id, this.offer).subscribe((result) => {
      this.saveOfferCallBack('Your Offer has been Submitted')
    })
  }

  acceptOffer() {

  }

  reopenQuataion(offer) {
    this.RfquataionApi.lastPriceRFQ(this.quatation.id, offer.id, this.currentAccountId).subscribe((result) => {
      this.saveOfferCallBack('Your Request for last price has been submitted')
    })
  }

  rejectQuataion(offer) {
    this.RfquataionApi.cancelRFQ(this.quatation.id,offer.id, this.currentAccountId).subscribe((result) => {
      this.saveOfferCallBack('Your Quatation has been Canceled')
    })
  }

  saveOfferCallBack(msg) {
    this.getQuatation();
    this.closeOfferForm();
    $.notify({
      icon: 'notifications',
      message: msg
    }, {
        type: 'info',
        timer: 2000,
        placement: {
          from: 'top',
          align: 'right'
        }
      });
  }

  formLoaded(id) {
    this.formValidation = $('#' + id).parsley({ trigger: "change keyup" });
  }
  validatefield(fieldId) {
    $("#" + fieldId).parsley().validate();
  }
}
