import { Component, OnInit } from '@angular/core';
declare var $: any;


@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  private serachMode;
  private searchPlaceHolder= "Search for Products and Suppliers...";
  private SearchText;

  constructor() { }

  ngOnInit() { 

    console.log(this.searchPlaceHolder.length)
  }

}
