import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';


export const OrderRoutes: Routes = [
    {
        path: 'mycart',
        component: CartComponent
    },
    {
        // order from shopping cart
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        // prototype order
        path: 'checkout/:id',
        component: CheckoutComponent
    }
];
