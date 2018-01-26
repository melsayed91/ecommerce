import { Component, OnInit } from '@angular/core';
import { SysCodeApi } from '../../../../common/BE.SDKs/sysCodes';
import { SysUserApi, AccountDataApi } from '../../../../common/BE.SDKs/AccountManager';
import { UserService } from '../../../../core/services/user.service/user.service';
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
  constructor(private auth: UserService, private accountService: AccountDataApi, private sysCodeService: SysCodeApi) {
    this.userAccount = this.auth.account;
    this.user = this.auth.userApi.getCachedCurrent();
   }

  ngOnInit() {
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

  saveProfile() {
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
