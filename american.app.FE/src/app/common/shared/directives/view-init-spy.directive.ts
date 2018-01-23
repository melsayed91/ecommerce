/* tslint:disable */

import { Directive, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';

@Directive({ selector: '[view-init-spy]' })

export class viewInitSpyDirective implements AfterViewInit {

  @Output() onAfterViewInit = new EventEmitter();

  constructor(el: ElementRef) {}
  
  ngAfterViewInit() {
    this.onAfterViewInit.emit();
  }
}
