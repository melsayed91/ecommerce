import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import "rxjs/add/operator/takeWhile";

import { SysCodeApi } from '../../../common/BE.SDKs/sysCodes';
import { UserService } from '../../../core/services/user.service/user.service';
import { SysUserApi, AccountDataApi, AccountData } from '../../../common/BE.SDKs/AccountManager';
import { AttachmentApi, LoopBackConfig as attachementApiConfig } from '../../../common/BE.SDKs/attachment';
import { AttachmentService } from '../../../core/services/attachment.service/attachment.service';

declare var $: any;

@Component({
  selector: 'profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit, OnDestroy {
  alive: boolean = true;
  bioLoading: boolean;
  userAccount;
  accountData;
  profileData;
  isEditMode = false;
  countries = [];
  user;
  formValidation;
  attachmentServer;
  pictureLoading;
  userBio;
  constructor(private auth: UserService,
    private accountApi: AccountDataApi,
    private sysCodeService: SysCodeApi,
    private AttachmentService: AttachmentService,
    private AttachmentServiceAPI: AttachmentApi) {
  }

  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();
    this.userAccount = this.auth.account;
    this.user = this.auth.userApi.getCachedCurrent();
    this.accountData = this.userAccount.accountData;
    this.userBio = this.accountData.bio ? this.accountData.bio.toString() : "";
    this.profileData = { ...this.accountData };
    this.lookup("5a669889218e000a3c209a6e", "countries", true)
  }
  ngOnDestroy() {
    this.alive = false;
  }
  bioEdited() {
    if (this.userBio != this.accountData.bio) {
      this.accountData.bio = this.userBio;
      this.bioLoading = true;
      this.accountApi.updateAccountData(this.accountData.id, { bio: this.userBio })
        .takeWhile(() => this.alive)
        .subscribe((response: any) => {
          this.bioLoading = false;
          this.auth.setAccountData(this.accountData);
        })
    }
  }

  formLoaded() {
    this.formValidation = $('#editProfileForm').parsley({ trigger: "change keyup" });
  }

  lookup(key, obj, overwrite) {
    this.sysCodeService.findByParent(key)
      .takeWhile(() => this.alive)
      .subscribe((response: any) => {
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
    if (!this.formValidation.validate())
      return;

    if (this.profileData.country)
      this.profileData.countryId = this.profileData.country.id;

    this.accountApi.updateAccountData(this.accountData.id, this.profileData)
      .takeWhile(() => this.alive)
      .subscribe((response) => {
        this.accountApi.getAccountData(this.userAccount.accountDataId)
          .takeWhile(() => this.alive)
          .subscribe((response) => {
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

  triggerUpload() {
    $('#profilePicture').click();
  }

  uploadPicture(fileInput: any) {
    this.pictureLoading = true;
    if (fileInput.target.files && fileInput.target.files[0]) {
      var file = fileInput.target.files[0];
      var form = new FormData();
      form.append("file", file, file.name);
      this.AttachmentService.upload(form, file.name, {})
        .takeWhile(() => this.alive)
        .subscribe((response: any) => {
          this.accountData.profileImage = response;

          this.accountApi.updateAccountData(this.accountData.id, { profileImageId: response.id })
            .takeWhile(() => this.alive)
            .subscribe((response: any) => {
              this.pictureLoading = false;
              this.auth.setAccountData(this.accountData);
            })
        }, (err) => {

        })
    }
  }


}
