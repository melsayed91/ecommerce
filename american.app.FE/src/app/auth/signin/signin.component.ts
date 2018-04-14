import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import "rxjs/add/operator/takeWhile";

import { UserService } from '../../core/services/user.service/user.service';
import { NotifyService } from '../../core/services/notify.service/notify.service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';
declare var $: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.alive = false;
  }

  alive: boolean = true;

  loading: boolean;

  email;
  password;
  loginFeedback;
  constructor(
    private router: Router,
    private auth: UserService,
    private NotifyService: NotifyService,
    private socialAuthService: AuthService) { }

  ngOnInit() {
    // function tt(){
    //   alert('ff')
    // }
    // window.fbAsyncInit = function() {
    //   FB.init({
    //     appId      : '1613101348745849',
    //     cookie     : true,
    //     xfbml      : true,
    //     version    : 'v2.12'
    //   });
    //
    //   FB.AppEvents.logPageView();
    //
    // };
    // (function(d, s, id){
    //   var js, fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) {return;}
    //   js = d.createElement(s); js.id = id;
    //   js.src = "https://connect.facebook.net/en_US/sdk.js";
    //   fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));
  }
  socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
      }
    );
  }
  checkStatus(){

    // FB.getLoginStatus((response) => {
    //   debugger;
    //   var x= 0
    //   //statusChangeCallback(response);
    // });
  }

  // googleSignIn(googleUser){
  //   debugger;
  //   // Useful data for your client-side scripts:
  //   var profile = googleUser.getBasicProfile();
  //   console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  //   console.log('Full Name: ' + profile.getName());
  //   console.log('Given Name: ' + profile.getGivenName());
  //   console.log('Family Name: ' + profile.getFamilyName());
  //   console.log("Image URL: " + profile.getImageUrl());
  //   console.log("Email: " + profile.getEmail());
  //
  //   // The ID token you need to pass to your backend:
  //   var id_token = googleUser.getAuthResponse().id_token;
  //   console.log("ID Token: " + id_token);
  // }
  signin() {
    if ($('.ng-invalid').length > 0 || $('.has-error').length > 0) {
      $(".ng-invalid").each(function (index) {
        $(this).closest('.form-group').addClass("has-error");
      });
      return;
    }
    this.loading = true;
    this.auth.userApi.login({ email: this.email, password: this.password })
      .takeWhile(() => this.alive)
      .subscribe((response) => {
      debugger;
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
