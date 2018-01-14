import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeRoutes } from './routing';
import { HomeComponent } from './welcome/home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
