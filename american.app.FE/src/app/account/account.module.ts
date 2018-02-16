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
import { ProductsComponent } from './profile/tabs/products/products.component';
import { InfoComponent } from './profile/tabs/info/info.component';
import { GalleryComponent } from './profile/tabs/gallery/gallery.component';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RegisterRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedVendorsModule,
    SharedDirectivesModule,
    Ng2FileInputModule.forRoot()
  ],
  declarations: [
    dashboardComponent,
    NavbarComponent,
    ProfileComponent,
    SettingsComponent,
    RequestForProposalComponent,
    ProductsComponent,
    InfoComponent,
    GalleryComponent,
    ProfileInfoComponent]
})
export class AccountModule {

  constructor() { }
}
