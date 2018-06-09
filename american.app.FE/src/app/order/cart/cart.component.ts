import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../core/services/user.service/user.service';
import { AttachmentApi, LoopBackConfig as attachementApiConfig } from '../../common/BE.SDKs/attachment';
import { AttachmentService } from '../../core/services/attachment.service/attachment.service';
import { AccountApi, ShoppingCartApi } from '../../common/BE.SDKs/AccountManager';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  currentAccount: any;
  cartItems: any;
  attachmentServer: any;
  totalAmount = 0;
  totalItems = 0;
  totalDiscount = 0;
  ngOnDestroy(): void {
    this.alive = false;
  }

  alive: boolean = true;


  constructor(private AccountApi: AccountApi, private auth: UserService, private ShoppingCartApi: ShoppingCartApi) {
  }

  ngOnInit() {
    if (this.auth.account) {
      this.currentAccount = this.auth.account;
      this.AccountApi.getCartItems(this.auth.account.accountDataId).subscribe((resp) => {
        this.cartItems = resp.cartItems.cartItems;
        this.calculate()
      })
    }


    this.attachmentServer = attachementApiConfig.getPath();

  }

  calculate() {
    this.totalItems = 0;
    this.totalAmount = 0;
    this.cartItems = this.cartItems.map(function (item) {
      if (item.product.discount &&
        item.product.discount.isActive &&
        new Date(item.product.discount.start_date) <= new Date() &&
        new Date(item.product.discount.end_date) >= new Date()) {
        this.totalDiscount += (item.product.discount.sale_value * item.quantity);
        item.product.activeDiscount = item.product.discount;
      } else {
        item.product.activeDiscount = false;
      }
      this.totalItems += item.quantity;
      this.totalAmount += item.product.price * item.quantity;
      return item;
    }.bind(this))
  }

  deleteCartItem(id) {

    this.ShoppingCartApi.deleteCartItem({
      accountDataId: this.auth.account.accountDataId,
      itemId: id
    }).subscribe((resp) => {
      this.auth.account.accountData.cartItemId = this.auth.account.accountData.cartItemId.filter(function (item) {
        return item !== id
      })
      this.auth.setAccount(this.auth.account)
      this.cartItems = this.cartItems.filter(function (item) {
        return item.id !== id
      })
      this.calculate()
    })
  }

  decrementQuantity(cartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity = cartItem.quantity - 1;
      this.ShoppingCartApi.updateQuantity({
        quantity: cartItem.quantity,
        itemId: cartItem.id
      }).subscribe((resp) => {
        this.cartItems = this.cartItems.map(function (item) {
          if (item.id === cartItem.id) {
            item.quantity = cartItem.quantity;
          }
          return item
        });
        this.calculate();
      });
    }
  }

  incrementQuantity(cartItem) {
    if (cartItem.quantity < cartItem.product.stock) {
      cartItem.quantity = cartItem.quantity + 1;
      this.ShoppingCartApi.updateQuantity({
        quantity: cartItem.quantity,
        itemId: cartItem.id
      }).subscribe((resp) => {
        this.cartItems = this.cartItems.map(function (item) {
          if (item.id === cartItem.id) {
            item.quantity = cartItem.quantity;
          }
          return item
        });
        this.calculate();
      });
    }
  }

}
