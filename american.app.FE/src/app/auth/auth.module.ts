import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../common/shared/material.module';
import { SelectModule } from 'ng2-select';

import { RegisterRoutes } from './routing';

import { RegisterComponent } from "./register/register.component";
import { SigninComponent } from './signin/signin.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RegisterRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [RegisterComponent, SigninComponent]
})
export class AuthModule {

  constructor() { }
}
