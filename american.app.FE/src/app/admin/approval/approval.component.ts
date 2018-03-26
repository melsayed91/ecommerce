import { Component, OnInit, OnDestroy } from '@angular/core';
import "rxjs/add/operator/takeWhile";

import { AccountApi } from '../../common/BE.SDKs/AccountManager';
import { ProductApi } from "../../common/BE.SDKs/Products";


@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss']
})
export class ApprovalComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.alive = false;
  }

  alive: boolean = true;


  companies = [];
  company = {};
  constructor(private AccountApi: AccountApi) { }

  ngOnInit() {
    this.loadCompanies();

  }

  loadCompanies(): any {
    this.AccountApi.getBusinessAccounts().takeWhile(() => this.alive).subscribe((response) => {

      this.companies = response.acc;
    }, (err) => {

      })
  }
  openProductForm(id) {
    this.AccountApi.approveBusinessAccount(id)
      .takeWhile(() => this.alive)
      .subscribe((response) => {
        this.loadCompanies();
      }, (err) => {

      })
  }

}
