import { Component, OnInit } from '@angular/core';
import { SysUserApi } from '../../common/BE.SDKs/Authorization';
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

  constructor(private SysUserService: SysUserApi,
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
    this.SysUserService.login({ email: this.email, password: this.password }).subscribe((response) => {
      this.loading = false;
      this.NotifyService.showSuccessMessage('Welcome!', 'You are now Logged in to your account!');

    },
      (err) => {
        debugger;
        if (err.code == 'LOGIN_FAILED')
          this.NotifyService.showErrorMessage('Oops!', 'Incorrect Email or Password');
        if (err.code == 'LOGIN_FAILED_EMAIL_NOT_VERIFIED')
          this.NotifyService.showErrorMessage('Account Not Activated!', 'Please check your email.');
        this.loading = false;
      })
  }
}
