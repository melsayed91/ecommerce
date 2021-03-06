import { Component, OnInit, Input } from '@angular/core';
import {  UserService } from '../../core/services/user.service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() page;

  links = [
    {
      name: 'dashboard',
      redirectTo: '/account/dashboard',
      text: 'Dashboard',
      icon: 'line-chart'
    },
    {
      name: 'orders',
      redirectTo: '/account/orders',
      text: 'Orders & Requests',
      icon: 'file-text-o',
      showTo: 'Business'
    },
    {
      name: 'orders',
      redirectTo: '/account/orders',
      text: 'My Orders',
      icon: 'file-text-o',
      showTo: 'Individual'
    },
    {
      name: 'customers',
      redirectTo: '/account/customers',
      text: 'Customers Base',
      icon: 'address-card-o',
      showTo: 'Business'
    },
    {
      name: 'RFQs',
      redirectTo: '/account/rfps',
      text: 'RFQs & RFPs Feed',
      icon: 'bullhorn',
      showTo: 'Business'
    },
    {
      name: 'RFQs',
      redirectTo: '/account/rfps',
      text: 'My RFQs & RFPs',
      icon: 'bullhorn',
      showTo: 'Individual'
    },
    {
      name: 'requests',
      redirectTo: '/account/requests',
      text: 'Requests Feed',
      icon: 'info',
      showTo: 'Business'
    },
    {
      name: 'profile',
      redirectTo: '/account/profile',
      text: 'Business Profile',
      icon: 'briefcase',
      showTo: 'Business'
    },
    {
      name: 'profile',
      redirectTo: '/account/profile',
      text: 'My Profile',
      icon: 'user-circle-o',
      showTo: 'Individual'
    },
    {
      name: 'settings',
      redirectTo: '/account/settings',
      text: 'Settings',
      icon: 'sliders'
    }
  ];

  viewLinks = [];
  userType;

  constructor(private auth: UserService) {
    this.userType = this.auth.account.accountType;
   }

  ngOnInit() {
    this.links.push({
      name: 'complaints',
      redirectTo: '/account/complaints',
      text: 'Complaints',
      icon: 'warning',
      showTo: this.auth.account.isAdmin ? 'Individual' : 'Business'
    })
    this.viewLinks = this.links.filter(function (link) { return !link.showTo || link.showTo == this.userType }.bind(this));
  }

}
