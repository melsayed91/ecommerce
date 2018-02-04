import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../core/services/user.service/user.service';
import { NotifyService } from '../../core/services/notify.service/notify.service';
declare var $: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loading: boolean;

  email;
  password;
  loginFeedback;
  constructor(
    private router: Router,
    private auth: UserService,
    private NotifyService: NotifyService) { }

  ngOnInit() {
  }

  signin() {
    if ($('.ng-invalid').length > 0 || $('.has-error').length > 0) {
      $(".ng-invalid").each(function (index) {
        $(this).closest('.form-group').addClass("has-error");
      });
      return;
    }
    this.loading = true;
    this.auth.userApi.login({ email: this.email, password: this.password }).subscribe((response) => {
      this.auth.setAccount(response.account);
      this.auth.setTokenOfAllSDKs(response);
      let redirect = this.auth.redirectUrl ? this.auth.redirectUrl : '/home';
      this.router.navigate([redirect]);
    },
      (err) => {
        this.loading = false;
        if (err.code == 'LOGIN_FAILED')
          this.loginFeedback = 'Oops! Incorrect Email or Password';
        if (err.code == 'LOGIN_FAILED_EMAIL_NOT_VERIFIED')
          this.loginFeedback = 'Account Not Activated! Please check your email.';
      })
  }

}
