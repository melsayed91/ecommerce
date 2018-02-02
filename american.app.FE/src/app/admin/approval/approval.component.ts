import { Component, OnInit } from '@angular/core';
import { AccountApi } from '../../common/BE.SDKs/AccountManager';
import {ProductApi} from "../../common/BE.SDKs/Products";


@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss']
})
export class ApprovalComponent implements OnInit {

  companies = [];
  company ={};
  constructor(private AccountApi: AccountApi) { }

  ngOnInit() {
    this.companies =[{id:"1",name : "company 1" , status: true},{id:"2",name : "company 2" , status: false}]

    this.loadCompanies();

  }

  loadCompanies(): any {
    this.AccountApi.getBusinessAccounts().subscribe((response) => {
      this.companies =[{id:"1",name : "company 1" , status: true},{id:"2",name : "company 2" , status: false}]
    }, (err) => {

    })
  }
  openProductForm(id) {
    this.AccountApi.approveBusinessAccount(id).subscribe((response) => {

      this.loadCompanies();
    }, (err) => {

    })
  }

}
