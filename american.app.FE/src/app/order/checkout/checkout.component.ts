import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import "rxjs/add/operator/takeWhile";

import {UserService} from '../../core/services/user.service/user.service';
import {Product, ProductApi, OrderApi} from '../../common/BE.SDKs/Products';
import {LoopBackConfig as attachementApiConfig} from '../../common/BE.SDKs/attachment';
import {AccountApi, ShoppingCartApi} from '../../common/BE.SDKs/AccountManager';

declare var $: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  loading = false;
  orderId: any;
  orderReference: any;
  userAccount: any;
  products = [];
  productId: any;
  attachmentServer: any;
  isPrototype: boolean;
  alive: any = true;
  step = 1;
  discount = 0.00;
  taxes = 0.00;
  proceed = ['', 'Proceed to payment', 'Confirm Payment', 'Place Order'];
  selectedDelivery;
  deliveryOptions = [
    {
      id: 0,
      title: "Delivery Within the US",
      description: "",
      fees: 0
    },
    {
      id: 1,
      title: "Standard Delivery 4-6 business days",
      description: "World wide",
      fees: 5.25
    },
    {
      id: 2,
      title: "Next Day & Evening Delivery",
      description: "Available only within the US",
      fees: 11.31
    }
  ];

  address = {};
  paymentMethod = 'card';
  paymentMethods = {
    free: "No payment needed. Free Order",
    card: "Credit Card",
    paypal: "Paypal Account"
  };
  formValidation;
  order = {
    ownerId: "",
    isPrototype: true,
    paymentInfo: {
      method: "",
      token: "",
      total: 0
    },
    shippingInfo: {
      method: "",
      address: {}
    },
    shipments: []
  };

  @ViewChild('stripe') stripeCo;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productApi: ProductApi,
              private orderApi: OrderApi,
              private AccountApi: AccountApi,
              private ShoppingCartApi: ShoppingCartApi,
              private auth: UserService) {

    this.userAccount = this.auth.account;
    this.order.ownerId = this.userAccount.id;

    this.route.params.takeWhile(() => this.alive).subscribe(params => {
      if (params['id']) {
        this.isPrototype = true;
        this.productId = params['id'];
        this.productApi.findById(this.productId, {include: ["attachments"]})
          .takeWhile(() => this.alive)
          .subscribe((response: Product) => {
            this.products.push(response);
            if(this.products && this.products.length){
              if (this.products[0].discount &&
                this.products[0].discount.isActive &&
                new Date(this.products[0].discount.start_date) <= new Date() &&
                new Date(this.products[0].discount.end_date) >= new Date()) {
                this.products[0].activeDiscount = this.products[0].discount;
                this.discount += this.products[0].activeDiscount.sale_value;
              } else {
                this.products[0].activeDiscount = false;
              }
            }

            this.order.shipments.push({
              shippingFees: 0,
              sellerId: response.accountId,
              items: [
                {
                  quantity: 1,
                  total: response['prototypePrice'],
                  productId: response.id
                }
              ]
            })
          })
      } else {
        this.AccountApi.getCartItems(this.userAccount.accountDataId).subscribe(response => {
          if (response.cartItems.cartItems.length) {
            this.products = response.cartItems.cartItems.map(function (item) {
              this.order.shipments.push({
                shippingFees: 0,
                sellerId: item.product.accountId,
                items: [
                  {
                    quantity: 1,
                    total: item.product.price,
                    productId: item.productId
                  }
                ]
              })
              item.product.orderQuantity = item.quantity;
              if (item.product.discount &&
                item.product.discount.isActive &&
                new Date(item.product.discount.start_date) <= new Date() &&
                new Date(item.product.discount.end_date) >= new Date()) {
                item.product.activeDiscount = item.product.discount;
                this.discount += item.product.activeDiscount.sale_value * item.product.orderQuantity;
              } else {
                item.product.activeDiscount = false;
              }
              return item.product;
            }.bind(this));
          } else {
            let redirect = this.auth.redirectUrl ? this.auth.redirectUrl : '/home';
            this.router.navigate([redirect]);
          }

        })


      }
    })

  }

  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();
    this.selectedDelivery = this.deliveryOptions[0];
  }

  formLoaded() {
    this.formValidation = $('#shippingForm').parsley({trigger: "change keyup"});
  }

  ngOnDestroy() {
    this.alive = false;
  }

  goNext() {
    switch (this.step) {
      //Proceed to Payment
      case 1: {
        if (!this.formValidation.validate())
          return;
        ++this.step;
        if (this.getTotal() == 0) {
          this.paymentMethod = 'free';
          ++this.step;
        }
      }
        break;
      //Review Order
      case 2: {
        this.loading = true;
        this.stripeCo.createToken();
      }
        break;
      //Proceed to Payment
      case 3: {
        this.placeOrder();
      }
        break;
    }
  }

  goTo(step) {
    if (this.step < 4 && this.step > step)
      this.step = step;
  }

  deliverySelected(e) {
    this.selectedDelivery = e;
  }

  getSubTotal() {
    return this.products.reduce((previous, current) => {
      let price = this.isPrototype ? current.prototypePrice : current.price * current.orderQuantity;
      return previous + price;
    }, 0);
  }

  getTotal() {
    return (this.getSubTotal() + this.taxes + this.selectedDelivery.fees - this.discount);
  }

  tokenCreated(token) {
    this.loading = false;
    this.order.paymentInfo.token = token;
    ++this.step;
  }

  placeOrder(): any {
    this.loading = true;
    this.order.paymentInfo.method = this.paymentMethod;
    this.order.paymentInfo.total = this.getTotal();
    this.order.shippingInfo.address = this.address;
    this.order.shippingInfo.method = this.selectedDelivery.title;
    this.orderApi.placeOrder(this.order)
      .takeWhile(() => this.alive)
      .subscribe(response => {
        this.productApi.incrementProductSells(this.productId)
          .takeWhile(() => this.alive)
          .subscribe(response => {

          })
        this.ShoppingCartApi.deleteCartItem({accountDataId: this.auth.account.accountData.id}).subscribe(res => {
          this.auth.account.accountData.cartItemId = [];
          this.auth.setAccount(this.auth.account)
          this.loading = false;
          this.orderReference = response.order.orderNo;
          this.orderId = response.order.id;
          ++this.step;
        })
      })
  }

}
