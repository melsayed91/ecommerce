import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../common/shared/material.module';

import { RegisterRoutes } from './routing';

import { SharedDirectivesModule, SharedVendorsModule } from '../common/shared/shared.module'
import { Ng2FileInputModule } from 'ng2-file-input';

import { dashboardComponent } from "./dashboard/dashboard.component";
import { NavbarComponent } from './nav-bar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { RequestForProposalComponent } from './request-for-proposal/request-for-proposal.component';
import { QuatationDetailsComponent } from './request-for-proposal/details/details.component';
import { ProductsComponent } from './profile/tabs/products/products.component';
import { InfoComponent } from './profile/tabs/info/info.component';
import { GalleryComponent } from './profile/tabs/gallery/gallery.component';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';
import { RequestsComponent } from './requests/requests.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './orders/details/details.component';
import { CustomersComponent } from './customers/customers.component';
import { BarRatingModule } from "ngx-bar-rating";
import { SaleComponent } from './profile/tabs/products/sale/sale.component';
import { ProductReturnsComponent } from './orders/details/returns/returns.component';
import { FieldErrorDisplayComponent } from './profile/tabs/products/sale/field-error-display/field-error-display.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { ReturnsComponent } from './returns/returns.component';
import { ReturnsDetailsComponent } from './returns/details/details.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RegisterRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedVendorsModule,
    SharedDirectivesModule,
    Ng2FileInputModule.forRoot(),
    BarRatingModule
  ],
  declarations: [
    dashboardComponent,
    NavbarComponent,
    ProfileComponent,
    SettingsComponent,
    RequestForProposalComponent,
    QuatationDetailsComponent,
    ProductsComponent,
    InfoComponent,
    GalleryComponent,
    ProfileInfoComponent,
    RequestsComponent,
    ProfileInfoComponent,
    OrdersComponent,
    OrderDetailsComponent,
    CustomersComponent,
    SaleComponent,
    ProductReturnsComponent,
    FieldErrorDisplayComponent,
    ComplaintsComponent,
    ReturnsComponent,
    ReturnsDetailsComponent],
  entryComponents: [SaleComponent, ProductReturnsComponent]
})
export class AccountModule {

  constructor() { }
}
