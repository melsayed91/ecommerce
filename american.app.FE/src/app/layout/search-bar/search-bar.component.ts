import { Component, OnInit } from '@angular/core';
declare var $: any;


@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  serachMode;
  constructor() { }

  ngOnInit() { }


}
