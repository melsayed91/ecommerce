/* tslint:disable:member-ordering no-unused-variable */
import {
    ModuleWithProviders, NgModule,
    Optional, SkipSelf }       from '@angular/core';
  
  import { CommonModule }      from '@angular/common';
  
  // Application Singleton Services
  import { NotifyService } from './services/notify.service/notify.service';

  
  @NgModule({
    imports:      [ CommonModule ],
    declarations: [],
    exports:      [],
    providers:    [ NotifyService ]
  })
  export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
      if (parentModule) {
        throw new Error(
          'CoreModule is already loaded. Import it in the AppModule only');
      }
    }
  
  }