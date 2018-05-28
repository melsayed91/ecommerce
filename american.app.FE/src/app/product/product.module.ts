import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductRoutes } from './routing';

import { DetailsComponent } from './details/details.component';
import {BarRatingModule} from "ngx-bar-rating";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ProductRoutes),
    BarRatingModule
  ],
  declarations: [DetailsComponent]
})
export class ProductModule { }
