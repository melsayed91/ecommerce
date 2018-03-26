import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Routes
import { OrderRoutes } from './routing';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { StripeComponent } from './stripe/stripe.component';

import { SharedDirectivesModule } from '../common/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(OrderRoutes),
    SharedDirectivesModule
  ],
  declarations: [
    CartComponent,
    CheckoutComponent,
    StripeComponent
  ]
})
export class OrderModule { }
