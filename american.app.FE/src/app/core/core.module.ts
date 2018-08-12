/* tslint:disable:member-ordering no-unused-variable */
import {
  ModuleWithProviders, NgModule,
  Optional, SkipSelf
} from '@angular/core';

import { CommonModule } from '@angular/common';

// Application Singleton Services
import { NotifyService } from './services/notify.service/notify.service';
import { UserService } from './services/user.service/user.service';
import { AttachmentService } from './services/attachment.service/attachment.service';
import { AuthGuardService } from './services/auth.guard.service/auth-guard.service';


@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  providers: [
    NotifyService,
    UserService,
    AuthGuardService,
    AttachmentService]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}