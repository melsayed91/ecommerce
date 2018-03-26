import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.alive = false;
  }

  alive: boolean = true;


  constructor() { }

  ngOnInit() {
  }

}
