import { Component, OnInit } from '@angular/core';
import { SysCodeApi } from '../../../../common/BE.SDKs/sysCodes';
import { SysUserApi, AccountDataApi } from '../../../../common/BE.SDKs/AccountManager';
import { UserService } from '../../../../core/services/user.service/user.service';

declare var $: any;


@Component({
  selector: 'profile-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  userAccount;
  accountData;
  profileData;
  isEditMode = false;
  countries = [];
  user;
  formValidation;

  constructor(private auth: UserService, private accountService: AccountDataApi, private sysCodeService: SysCodeApi) {
    this.userAccount = this.auth.account;
    this.user = this.auth.userApi.getCachedCurrent();
  }

  ngOnInit() {
     //has uppercase
     if (!window['Parsley'].hasValidator('uppercase'))
     window['Parsley'].addValidator('uppercase', {
       requirementType: 'number',
       validateString: function (value, requirement) {
         var uppercases = value.match(/[A-Z]/g) || [];
         return uppercases.length >= requirement;
       },
       messages: {
         en: 'Your password must contain at least (%s) uppercase letter.'
       }
     });

   //has lowercase
   if (!window['Parsley'].hasValidator('lowercase'))
     window['Parsley'].addValidator('lowercase', {
       requirementType: 'number',
       validateString: function (value, requirement) {
         var lowecases = value.match(/[a-z]/g) || [];
         return lowecases.length >= requirement;
       },
       messages: {
         en: 'Your password must contain at least (%s) lowercase letter.'
       }
     });

   //has number
   if (!window['Parsley'].hasValidator('number'))
     window['Parsley'].addValidator('number', {
       requirementType: 'number',
       validateString: function (value, requirement) {
         var numbers = value.match(/[0-9]/g) || [];
         return numbers.length >= requirement;
       },
       messages: {
         en: 'Your password must contain at least (%s) number.'
       }
     });

   //has special char
   if (!window['Parsley'].hasValidator('special'))
     window['Parsley'].addValidator('special', {
       requirementType: 'number',
       validateString: function (value, requirement) {
         var specials = value.match(/[^a-zA-Z0-9]/g) || [];
         return specials.length >= requirement;
       },
       messages: {
         en: 'Your password must contain at least (%s) special characters.'
       }
     });
     
    this.accountService.getAccountData(this.userAccount.accountDataId).subscribe((response) => {
      this.accountData = response.accountData;
      this.profileData = { ...response.accountData };
    }, (err) => {

    })
    this.lookup("5a669889218e000a3c209a6e", "countries", true)
  }
  lookup(key, obj, overwrite) {
    this.sysCodeService.findByParent(key).subscribe((response: any) => {
      if (overwrite)
        this[obj] = response.sysCode;
      else {

        this[obj] = this[obj].concat(response.sysCode);
      }

    }, (err) => {

    })
  }
  toggleEditProfile() {
    this.isEditMode = !this.isEditMode
  }
  formLoaded() {
    this.formValidation = $('#editProfileForm').parsley({ trigger: "change keyup" });
  }

  saveProfile() {
    if (!this.formValidation.validate())
      return;

    if (this.profileData.country)
      this.profileData.countryId = this.profileData.country.id;
    var toBeUpdated = {
      accountDataId: this.userAccount.accountDataId,
      updateQuery: this.profileData
    }
    this.accountService.updateAccountData(toBeUpdated).subscribe((response) => {
      this.accountService.getAccountData(this.userAccount.accountDataId).subscribe((response) => {
        this.accountData = response.accountData;
        this.profileData = { ...response.accountData };
        this.toggleEditProfile();
      }, (err) => {

      })

    }, (err) => {

    })
  }

  autocompleListFormatter = (data: any) => {
    let html = `
                <i class='flag-icon flag-icon-${data.countryCode.toLowerCase()}'></i> 
                 &nbsp; | &nbsp; ${data.name}
              `;
    return html;
  }


}
