import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  selected_categories = [];
  selected_price_range = [];
  @Input() aggregation: any;
  @Output() filterApplied = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.min_price = this.aggregation.min_price.value;
    this.max_price = this.aggregation.max_price.value;
    if (this.min_price === this.max_price) {
      this.min_price = 0;
    }
    this.priceRange.push(this.min_price, this.max_price)
    this.categories = this.aggregation.categories.buckets
  }

  onCategorySelect(list) {
    this.selected_categories = list.selectedOptions.selected.map(function (item) {
      return {
        field: "category",
        value: item.value
      }
    });
  }

  onPriceChange(values) {

    this.selected_price_range = [{
      field: "price",
      value: values
    }];
  }
  applyFilters() {
    var filters = [];
    if (this.selected_categories.length > 0 && this.selected_price_range.length == 0) {
      filters = this.selected_categories;
    } else if (this.selected_categories.length == 0 && this.selected_price_range.length > 0) {
      filters = this.selected_price_range;
    } else if (this.selected_categories.length > 0 && this.selected_price_range.length > 0) {
      filters = this.selected_price_range.concat(this.selected_categories);
    }
    this.filterApplied.emit(filters)
  }

}
