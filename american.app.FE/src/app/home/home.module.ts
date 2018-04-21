import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeRoutes } from './routing';
import { HomeComponent } from './welcome/home.component';
import { ServicesComponent } from './services/services.component';
import { HelpComponent } from './helpcenter/help.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [HomeComponent, ServicesComponent,HelpComponent]
})
export class HomeModule { }
