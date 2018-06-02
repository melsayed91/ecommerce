import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../core/services/user.service/user.service';
import {SysCodeApi} from '../../common/BE.SDKs/sysCodes';
import {AccountDataApi} from '../../common/BE.SDKs/AccountManager';

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

  ngOnDestroy(): void {
    this.alive = false;
  }

  alive: boolean = true;

  constructor(private auth: UserService, private sysCodeService: SysCodeApi, private accountDataApi: AccountDataApi) {
    this.userAccount = this.auth.account;

  }

  ngOnInit() {
    this.lookup("5a669889218e000a3c209a6e", "countries", true)

    if (this.auth.account.accountData.searchSettings) {
      this.currentCountries = this.auth.account.accountData.searchSettings.countries;
      this.showRelated = this.auth.account.accountData.searchSettings.showRelated;
      this.showNew = this.auth.account.accountData.searchSettings.showNew;
      this.showHot = this.auth.account.accountData.searchSettings.showHot;
    }
    else {
      this.auth.account.accountData.searchSettings = {};
    }
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
        }

      })
      .takeWhile(() => this.alive)
      .subscribe((response: any) => {
        let previous = this.auth.account;

        previous.accountData.searchSettings.countries = this.currentCountries;
        previous.accountData.searchSettings.showRelated = this.showRelated;
        previous.accountData.searchSettings.showNew = this.showNew;
        previous.accountData.searchSettings.showHot = this.showHot;
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
