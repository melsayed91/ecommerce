import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../common/shared/material.module';
import { SharedVendorsModule, SharedDirectivesModule } from '../common/shared/shared.module';

import { SelectModule } from 'ng2-select';
import { Ng2FileInputModule } from 'ng2-file-input';

import { RegisterRoutes } from './routing';

import { RegisterComponent } from "./register/register.component";
import { SigninComponent } from './signin/signin.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RegisterRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedVendorsModule,
    Ng2FileInputModule.forRoot(),
    SharedDirectivesModule
  ],
  declarations: [RegisterComponent, SigninComponent]
})
export class AuthModule {

  constructor() { }
}
