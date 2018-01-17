import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { isActivePipe } from './pipes/isActive.pipe';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [isActivePipe, HighlightDirective],
  exports: [isActivePipe, HighlightDirective,
    CommonModule, FormsModule]
})
export class SharedModule { }
