import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FacetsComponent } from './facets/facets.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { MaterialModule } from '../common/shared/material.module';
import { MatTooltipModule } from '@angular/material';
import { SearchRoutes } from './routing';
import { BarRatingModule } from "ngx-bar-rating";

@NgModule({
  imports: [
    RouterModule.forChild(SearchRoutes),
    CommonModule,
    MaterialModule,
    NouisliderModule,
    BarRatingModule,
    MatTooltipModule
  ],
  declarations: [ListComponent, FacetsComponent]
})
export class SearchModule {
  constructor() { }
}
