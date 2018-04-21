import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeRoutes } from './routing';
import { HomeComponent } from './welcome/home.component';
import { ServicesComponent } from './services/services.component';
import { HelpComponent } from './helpcenter/help.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [HomeComponent, ServicesComponent,HelpComponent,ContactUsComponent]
})
export class HomeModule { }
