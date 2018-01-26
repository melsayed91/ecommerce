import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Ng2FileInputService, Ng2FileInputAction } from 'ng2-file-input';

import { SysUserApi } from '../../common/BE.SDKs/AccountManager';
import { AttachmentApi } from '../../common/BE.SDKs/attachment';
import { SysCodeApi } from '../../common/BE.SDKs/sysCodes';
import { NotifyService } from '../../core/services/notify.service/notify.service';
import { AttachmentService } from '../../core/services/attachment.service/attachment.service';

declare var $: any;

export class State {
  constructor(public name: string, public population: string, public flag: string) { }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('flyInOutUp', [
      state('in', style({ transform: 'translateY(0) rotateY(0)' })),
      transition(':enter', [
        style({ transform: 'translateY(-100%) rotateY(180deg)', opacity: "0", position: "absolute", right: "0" }),
        animate('200ms 300ms ease-in')
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ transform: 'translateY(-100%)', opacity: "0" }))
      ])
    ], ),
    trigger('flyInOutDown', [
      state('in', style({ transform: 'translateY(0)' })),
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: "0" }),
        animate('200ms 300ms ease-out')
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ transform: 'translateY(100%)', opacity: "0" }))
      ])
    ], )
  ]
})
export class RegisterComponent implements OnInit, AfterViewInit {
  isBusiness = true;
  previousStep = 0;
  step = 1;
  done = 100;
  loading: boolean;
  countries = [];
  uploadIconHtml = "<i class='fa fa-upload'></i>";
  removeHtml = "<i class='fa fa-times'></i>";
  industries = [];
  selectedIndustries = [];
  subIndustries = [
  ];
  selectedsubIndustries = [];
  userSubIndustries = [];
  userData = {};
  userCredentials = {};
  userType = "Individual";
  confirmPassword;
  formValidation;
  exitStep;
  subSearch;
  uploaded = [];
  constructor(private userService: SysUserApi,
    private router: Router,
    private route: ActivatedRoute,
    private NotifyService: NotifyService,
    private location: Location,
    private ng2FileInputService: Ng2FileInputService,
    private sysCodeService: SysCodeApi,
    private AttachmentService: AttachmentService,
    private AttachmentServiceAPI: AttachmentApi) {

    this.route.params.subscribe(params => {
      if (params['mode'])
        this.userType = params['mode'];
    })

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

    this.lookup("5a651615f22fe122e0862672", "industries", true)
    this.lookup("5a669889218e000a3c209a6e", "countries", true)

  }

  ngAfterViewInit() {
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

  formLoaded() {
    this.formValidation = $('#registerForm').parsley({ trigger: "change keyup" });
  }

  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  register() {
    if (!this.formValidation.validate())
      return;
    let user = {
      credentials: this.userCredentials,
      data: this.userData,
      categories: this.selectedsubIndustries.map(function (item) { return item.id }),
      userSubIndustries: this.userSubIndustries,
      userDocuments: this.uploaded.map(function (item) { return item.id }),
      userCategories: this.userSubIndustries,
      type: this.userType
    }
    this.loading = true;
    this.userService.register(user).subscribe((response) => {
      this.loading = false;
      this.step = this.done;
    }, (err) => {
      this.loading = false;
      if (err.message.includes('Email already exists')) {
        $('#fg-email').addClass("has-error");
      }
    })
  }

  autocompleListFormatter = (data: any) => {
    let html = `
                <i class='flag-icon flag-icon-${data.countryCode.toLowerCase()}'></i> 
                 &nbsp; | &nbsp; ${data.name}
              `;
    return html;
  }

  validatefield(fieldId) {
    $("#" + fieldId).parsley().validate();
  }

  countryChanged(e) {
    this.validatefield('country');
  }

  selectIndustry(industry) {
    if (industry.selected) {
      const index = this.selectedIndustries.findIndex(ind => ind.id == industry.id);

      this.subIndustries = this.subIndustries.reduce(function (prev, subIndustry, subIndustryIndex) {
        if (subIndustry.parentId !== industry.id)
          prev.push(subIndustry);
        return prev
      }.bind(this), []);

      this.selectedIndustries.splice(index, 1);
    }
    else if (this.selectedIndustries.length < 3) {
      this.lookup(industry.id, "subIndustries", false);
      this.selectedIndustries.push(industry);
    }
    else
      return;

    industry.selected = !industry.selected;
  }

  toggleSubIndustry(subIndustry) {
    if (this.selectedsubIndustries.findIndex(function (item) {
      return item.id === subIndustry.id
    }) == -1)
      this.selectedsubIndustries.push(subIndustry);
    else
      this.selectedsubIndustries.splice(this.selectedsubIndustries.findIndex(function (item) {
        return item.id === subIndustry.id
      }), 1)
  }

  addedSubCategory(e) {
    if (e) {
      this.userSubIndustries.push(e);
    }
    this.subSearch = null;
  }

  removeUserSubIndustry(index) {
    this.userSubIndustries.splice(index, 1);
  }
  enterPressedSubSearch() {
    if (this.subSearch) {
      this.userSubIndustries.push(this.subSearch);
      // this.selectedsubIndustries.push(this.subSearch);
    }
    this.subSearch = null;
    this.scrollToBottom('.industries.sub');
  }

  isNextValid() {
    switch (this.step) {
      case 1:
        return this.selectedIndustries.length > 0;
      case 2:
        return this.selectedsubIndustries.length > 0;
      case 3:
        return this.uploaded.filter(file => file.isLoaded).length > 0;
      default:
        return false;
    }
  }

  scrollToBottom(selector) {
    $(selector).animate({ scrollTop: $(selector).prop("scrollHeight") }, 1000);
  }

  goNext() {
    this.previousStep = this.step;
    ++this.step;
  }

  goBack() {
    this.previousStep = this.step;
    --this.step;
  }

  onAdded(event: any) {
    var form = new FormData();
    form.append("file", event.file, event.file.name);
    this.AttachmentService.upload(form, event.file.name, {}).subscribe((response: any) => {
      this.uploaded.push(response);
      this.scrollToBottom('.ulpoaded');
      setTimeout(() => {
        response.isLoaded = true;
      }, this.uploaded.length * 1000);
      console.log(this.uploaded)
    }, (err) => {

    })

  }

  removeFile(index, fileId) {
    this.AttachmentServiceAPI.deleteById(fileId).subscribe((response: any) => {
      this.uploaded.splice(index, 1)
    }, (err) => {
    })
  }

  getCurrentFiles() {
    let files = this.ng2FileInputService.getCurrentFiles('multiFilesInput');
    return files;
  }

}