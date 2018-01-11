import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RegisterRoutes } from './routing';
import {RegisterComponent} from "./register/register.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RegisterRoutes)
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
