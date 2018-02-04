import { Component, OnInit } from '@angular/core';
import { SysCodeApi } from '../../common/BE.SDKs/sysCodes';
import { UserService } from '../../core/services/user.service/user.service';
import { SysUserApi, AccountDataApi, AccountData } from '../../common/BE.SDKs/AccountManager';
import { AttachmentApi, LoopBackConfig as attachementApiConfig } from '../../common/BE.SDKs/attachment';
import { AttachmentService } from '../../core/services/attachment.service/attachment.service';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userAccount;
  accountData;
  profileData;
  isEditMode = false;
  countries = [];
  user;
  formValidation;
  attachmentServer;
  pictureLoading;

  constructor(private auth: UserService,
    private accountApi: AccountDataApi,
    private sysCodeService: SysCodeApi,
    private AttachmentService: AttachmentService,
    private AttachmentServiceAPI: AttachmentApi) {
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
  }
}
