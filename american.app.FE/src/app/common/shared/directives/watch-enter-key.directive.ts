/* tslint:disable */

import { Directive, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({ selector: '[watch-enter-key]' })

export class watchEnterKeyDirective {

  @Output() onEnterPressed = new EventEmitter();

  constructor(el: ElementRef) { }

  @HostListener('keydown', ['$event']) onkeydown(event) {
    if (event.keyCode == 13) { //Enter Clicked
      this.onEnterPressed.emit();
    }
  }

}
