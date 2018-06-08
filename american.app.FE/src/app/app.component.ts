import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import Scrollbar from 'smooth-scrollbar';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    $.material.init();
   // var ps = new PerfectScrollbar('html');
    var el = <HTMLElement>document.body
    Scrollbar.init(el);

  }

}
