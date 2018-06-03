import { Component, OnInit, Input } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.scss']
})
export class FacetsComponent implements OnInit {
  priceRange = [];
  min_price = 0;
  max_price = 0;
  categories = [];
  @Input() aggregation: any;
  constructor() { }

  ngOnInit() {
    this.min_price = this.aggregation.min_price.value;
    this.max_price = this.aggregation.max_price.value;
    if (this.min_price === this.max_price) {
      this.min_price =0;
    }
    this.priceRange.push(this.min_price, this.max_price)
    this.categories = this.aggregation.categories.buckets
    // setTimeout(function(){
    //   const elemSidebar = <HTMLElement>document.querySelector('#categories_panel');
    //   var ps = new PerfectScrollbar(elemSidebar, { suppressScrollX: true });
    // },2000)
   
    
  }

}
