import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Pipes
import { isActivePipe } from './pipes/isActive.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [isActivePipe],
  exports: [isActivePipe,
    CommonModule, FormsModule]
})
export class SharedPipesModule { }


// Directives
import { HighlightDirective } from './directives/highlight.directive';
import { viewInitSpyDirective } from './directives/view-init-spy.directive';
import { watchEnterKeyDirective } from './directives/watch-enter-key.directive';
import { PhoneNumberValidatorDirective } from './directives/phone-number-validator.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [HighlightDirective, viewInitSpyDirective, watchEnterKeyDirective, PhoneNumberValidatorDirective],
  exports: [HighlightDirective, viewInitSpyDirective, watchEnterKeyDirective, PhoneNumberValidatorDirective,
    CommonModule, FormsModule]
})
export class SharedDirectivesModule { }



// Vendors Modules from github
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { MomentModule } from 'angular2-moment';

@NgModule({
  imports: [CommonModule, Ng2AutoCompleteModule, MomentModule],
  declarations: [],
  exports: [CommonModule, FormsModule, Ng2AutoCompleteModule, MomentModule]
})
export class SharedVendorsModule { }


