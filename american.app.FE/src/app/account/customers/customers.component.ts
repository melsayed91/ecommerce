import { Component, OnInit } from '@angular/core';
import {UserService} from "../../core/services/user.service/user.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customersList;
  constructor(private auth: UserService) {
    debugger;
    this.customersList = this.auth.account.accountData.customers;
  }

  ngOnInit() {
  }

}
