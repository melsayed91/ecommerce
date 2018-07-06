import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service/user.service';
import { SysCodeApi } from '../../common/BE.SDKs/sysCodes';
import { AccountDataApi } from '../../common/BE.SDKs/AccountManager';

declare var $: any;
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  userAccount;
  blacklistCustomers;
  showRelated;
  showNew;
  showHot;
  currentCountries = []
  countries = []
  enabledCategoriesData = []
  disabledCategoriesData = []
  disabledCategories = []
  enabledCategories = []
  ngOnDestroy(): void {
    this.alive = false;
  }

  alive: boolean = true;

  constructor(private auth: UserService, private sysCodeService: SysCodeApi, private accountDataApi: AccountDataApi) {
    this.userAccount = this.auth.account;

  }

  ngOnInit() {
    this.lookup("5a669889218e000a3c209a6e", "countries", true)
    this.sysCodeService.getAllSubIndustries()
      .takeWhile(() => this.alive)
      .subscribe((response: any) => {
        this.enabledCategoriesData = response.subIndustries;
        this.disabledCategoriesData = response.subIndustries;
        if (this.auth.account.accountData.searchSettings) {
          this.currentCountries = this.auth.account.accountData.searchSettings.countries;
          this.enabledCategories = this.auth.account.accountData.searchSettings.enabledCategories;
          this.disabledCategories = this.auth.account.accountData.searchSettings.disabledCategories;
          this.showRelated = this.auth.account.accountData.searchSettings.showRelated;
          this.showNew = this.auth.account.accountData.searchSettings.showNew;
          this.showHot = this.auth.account.accountData.searchSettings.showHot;
          // this.updateCategoriesDropdownlistsData();
        }
        else {
          this.auth.account.accountData.searchSettings = {};
        }
      }, (err) => {
      });

  }


  updateCategoriesDropdownlistsData() {
    if (this.enabledCategories.length) {
      this.disabledCategoriesData = this.disabledCategoriesData.filter(function (item) {
        return this.enabledCategories.indexOf(item.id) === -1;
      }.bind(this));
    }
    if (this.disabledCategories.length) {
      this.enabledCategoriesData = this.enabledCategoriesData.filter(function (item) {
        return this.disabledCategories.indexOf(item.id) === -1;
      }.bind(this));
    }
  }

  onCategoriesChange() {
    this.updateCategoriesDropdownlistsData();
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

  saveSettings() {
    this.accountDataApi.updateAccountData(this.auth.account.accountDataId,
      {
        $set: {
          'searchSettings.countries': this.currentCountries,
          'searchSettings.showRelated': this.showRelated,
          'searchSettings.showNew': this.showNew,
          'searchSettings.showHot': this.showHot,
          'searchSettings.enabledCategories': this.enabledCategories,
          'searchSettings.disabledCategories': this.disabledCategories,
        }

      })
      .takeWhile(() => this.alive)
      .subscribe((response: any) => {
        let previous = this.auth.account;

        previous.accountData.searchSettings.countries = this.currentCountries;
        previous.accountData.searchSettings.showRelated = this.showRelated;
        previous.accountData.searchSettings.showNew = this.showNew;
        previous.accountData.searchSettings.showHot = this.showHot;
        previous.accountData.searchSettings.enabledCategories = this.enabledCategories;
        previous.accountData.searchSettings.disabledCategories = this.disabledCategories;
        this.auth.setAccount(previous);

        $.notify({
          message: 'New Settings Have Been Applied!'
        }, {
            type: 'primary',
            timer: 1000,
            placement: {
              from: 'bottom',
              align: 'right'
            }
          });
      })
  }
}
