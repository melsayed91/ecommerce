import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RegisterRoutes } from './routing';
import { FormsModule } from '@angular/forms';
import {RegisterComponent} from "./register/register.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RegisterRoutes),
    FormsModule
  ] ,
  declarations: [RegisterComponent]
})
export class RegisterModule {

  constructor(

  ) {  }
}
