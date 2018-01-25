import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Ng2FileInputService, Ng2FileInputAction } from 'ng2-file-input';

import { SysUserApi } from '../../common/BE.SDKs/AccountManager';
import { NotifyService } from '../../core/services/notify.service/notify.service';

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
  countries = [
    { value: 'Afghanistan', id: 'AF' },
    { value: 'Åland Islands', id: 'AX' },
    { value: 'Albania', id: 'AL' },
    { value: 'Algeria', id: 'DZ' },
    { value: 'American Samoa', id: 'AS' },
    { value: 'AndorrA', id: 'AD' },
    { value: 'Angola', id: 'AO' },
    { value: 'Anguilla', id: 'AI' },
    { value: 'Antarctica', id: 'AQ' },
    { value: 'Antigua and Barbuda', id: 'AG' },
    { value: 'Argentina', id: 'AR' },
    { value: 'Armenia', id: 'AM' },
    { value: 'Aruba', id: 'AW' },
    { value: 'Australia', id: 'AU' },
    { value: 'Austria', id: 'AT' },
    { value: 'Azerbaijan', id: 'AZ' },
    { value: 'Bahamas', id: 'BS' },
    { value: 'Bahrain', id: 'BH' },
    { value: 'Bangladesh', id: 'BD' },
    { value: 'Barbados', id: 'BB' },
    { value: 'Belarus', id: 'BY' },
    { value: 'Belgium', id: 'BE' },
    { value: 'Belize', id: 'BZ' },
    { value: 'Benin', id: 'BJ' },
    { value: 'Bermuda', id: 'BM' },
    { value: 'Bhutan', id: 'BT' },
    { value: 'Bolivia', id: 'BO' },
    { value: 'Bosnia and Herzegovina', id: 'BA' },
    { value: 'Botswana', id: 'BW' },
    { value: 'Bouvet Island', id: 'BV' },
    { value: 'Brazil', id: 'BR' },
    { value: 'British Indian Ocean Territory', id: 'IO' },
    { value: 'Brunei Darussalam', id: 'BN' },
    { value: 'Bulgaria', id: 'BG' },
    { value: 'Burkina Faso', id: 'BF' },
    { value: 'Burundi', id: 'BI' },
    { value: 'Cambodia', id: 'KH' },
    { value: 'Cameroon', id: 'CM' },
    { value: 'Canada', id: 'CA' },
    { value: 'Cape Verde', id: 'CV' },
    { value: 'Cayman Islands', id: 'KY' },
    { value: 'Central African Republic', id: 'CF' },
    { value: 'Chad', id: 'TD' },
    { value: 'Chile', id: 'CL' },
    { value: 'China', id: 'CN' },
    { value: 'Christmas Island', id: 'CX' },
    { value: 'Cocos (Keeling) Islands', id: 'CC' },
    { value: 'Colombia', id: 'CO' },
    { value: 'Comoros', id: 'KM' },
    { value: 'Congo', id: 'CG' },
    { value: 'Democratic Republic of the Congo', id: 'CD' },
    { value: 'Cook Islands', id: 'CK' },
    { value: 'Costa Rica', id: 'CR' },
    { value: 'Cote D\'Ivoire', id: 'CI' },
    { value: 'Croatia', id: 'HR' },
    { value: 'Cuba', id: 'CU' },
    { value: 'Cyprus', id: 'CY' },
    { value: 'Czech Republic', id: 'CZ' },
    { value: 'Denmark', id: 'DK' },
    { value: 'Djibouti', id: 'DJ' },
    { value: 'Dominica', id: 'DM' },
    { value: 'Dominican Republic', id: 'DO' },
    { value: 'Ecuador', id: 'EC' },
    { value: 'Egypt', id: 'EG' },
    { value: 'El Salvador', id: 'SV' },
    { value: 'Equatorial Guinea', id: 'GQ' },
    { value: 'Eritrea', id: 'ER' },
    { value: 'Estonia', id: 'EE' },
    { value: 'Ethiopia', id: 'ET' },
    { value: 'Falkland Islands (Malvinas)', id: 'FK' },
    { value: 'Faroe Islands', id: 'FO' },
    { value: 'Fiji', id: 'FJ' },
    { value: 'Finland', id: 'FI' },
    { value: 'France', id: 'FR' },
    { value: 'French Guiana', id: 'GF' },
    { value: 'French Polynesia', id: 'PF' },
    { value: 'French Southern Territories', id: 'TF' },
    { value: 'Gabon', id: 'GA' },
    { value: 'Gambia', id: 'GM' },
    { value: 'Georgia', id: 'GE' },
    { value: 'Germany', id: 'DE' },
    { value: 'Ghana', id: 'GH' },
    { value: 'Gibraltar', id: 'GI' },
    { value: 'Greece', id: 'GR' },
    { value: 'Greenland', id: 'GL' },
    { value: 'Grenada', id: 'GD' },
    { value: 'Guadeloupe', id: 'GP' },
    { value: 'Guam', id: 'GU' },
    { value: 'Guatemala', id: 'GT' },
    { value: 'Guernsey', id: 'GG' },
    { value: 'Guinea', id: 'GN' },
    { value: 'Guinea-Bissau', id: 'GW' },
    { value: 'Guyana', id: 'GY' },
    { value: 'Haiti', id: 'HT' },
    { value: 'Heard Island and Mcdonald Islands', id: 'HM' },
    { value: 'Holy See (Vatican City State)', id: 'VA' },
    { value: 'Honduras', id: 'HN' },
    { value: 'Hong Kong', id: 'HK' },
    { value: 'Hungary', id: 'HU' },
    { value: 'Iceland', id: 'IS' },
    { value: 'India', id: 'IN' },
    { value: 'Indonesia', id: 'ID' },
    { value: 'Iran', id: 'IR' },
    { value: 'Iraq', id: 'IQ' },
    { value: 'Ireland', id: 'IE' },
    { value: 'Isle of Man', id: 'IM' },
    { value: 'Israel', id: 'IL' },
    { value: 'Italy', id: 'IT' },
    { value: 'Jamaica', id: 'JM' },
    { value: 'Japan', id: 'JP' },
    { value: 'Jersey', id: 'JE' },
    { value: 'Jordan', id: 'JO' },
    { value: 'Kazakhstan', id: 'KZ' },
    { value: 'Kenya', id: 'KE' },
    { value: 'Kiribati', id: 'KI' },
    { value: 'North Korea', id: 'KP' },
    { value: 'South Korea', id: 'KR' },
    { value: 'Kuwait', id: 'KW' },
    { value: 'Kyrgyzstan', id: 'KG' },
    { value: 'Lao People\'S Democratic Republic', id: 'LA' },
    { value: 'Latvia', id: 'LV' },
    { value: 'Lebanon', id: 'LB' },
    { value: 'Lesotho', id: 'LS' },
    { value: 'Liberia', id: 'LR' },
    { value: 'Libyan Arab Jamahiriya', id: 'LY' },
    { value: 'Liechtenstein', id: 'LI' },
    { value: 'Lithuania', id: 'LT' },
    { value: 'Luxembourg', id: 'LU' },
    { value: 'Macao', id: 'MO' },
    { value: 'The Former Yugoslav Republic of Macedonia', id: 'MK' },
    { value: 'Madagascar', id: 'MG' },
    { value: 'Malawi', id: 'MW' },
    { value: 'Malaysia', id: 'MY' },
    { value: 'Maldives', id: 'MV' },
    { value: 'Mali', id: 'ML' },
    { value: 'Malta', id: 'MT' },
    { value: 'Marshall Islands', id: 'MH' },
    { value: 'Martinique', id: 'MQ' },
    { value: 'Mauritania', id: 'MR' },
    { value: 'Mauritius', id: 'MU' },
    { value: 'Mayotte', id: 'YT' },
    { value: 'Mexico', id: 'MX' },
    { value: 'Federated States of Micronesia', id: 'FM' },
    { value: 'Republic of Moldova', id: 'MD' },
    { value: 'Monaco', id: 'MC' },
    { value: 'Mongolia', id: 'MN' },
    { value: 'Montserrat', id: 'MS' },
    { value: 'Morocco', id: 'MA' },
    { value: 'Mozambique', id: 'MZ' },
    { value: 'Myanmar', id: 'MM' },
    { value: 'Namibia', id: 'NA' },
    { value: 'Nauru', id: 'NR' },
    { value: 'Nepal', id: 'NP' },
    { value: 'Netherlands', id: 'NL' },
    { value: 'Netherlands Antilles', id: 'AN' },
    { value: 'New Caledonia', id: 'NC' },
    { value: 'New Zealand', id: 'NZ' },
    { value: 'Nicaragua', id: 'NI' },
    { value: 'Niger', id: 'NE' },
    { value: 'Nigeria', id: 'NG' },
    { value: 'Niue', id: 'NU' },
    { value: 'Norfolk Island', id: 'NF' },
    { value: 'Northern Mariana Islands', id: 'MP' },
    { value: 'Norway', id: 'NO' },
    { value: 'Oman', id: 'OM' },
    { value: 'Pakistan', id: 'PK' },
    { value: 'Palau', id: 'PW' },
    { value: 'Palestine', id: 'PS' },
    { value: 'Panama', id: 'PA' },
    { value: 'Papua New Guinea', id: 'PG' },
    { value: 'Paraguay', id: 'PY' },
    { value: 'Peru', id: 'PE' },
    { value: 'Philippines', id: 'PH' },
    { value: 'Pitcairn', id: 'PN' },
    { value: 'Poland', id: 'PL' },
    { value: 'Portugal', id: 'PT' },
    { value: 'Puerto Rico', id: 'PR' },
    { value: 'Qatar', id: 'QA' },
    { value: 'Reunion', id: 'RE' },
    { value: 'Romania', id: 'RO' },
    { value: 'Russian Federation', id: 'RU' },
    { value: 'RWANDA', id: 'RW' },
    { value: 'Saint Helena', id: 'SH' },
    { value: 'Saint Kitts and Nevis', id: 'KN' },
    { value: 'Saint Lucia', id: 'LC' },
    { value: 'Saint Pierre and Miquelon', id: 'PM' },
    { value: 'Saint Vincent and the Grenadines', id: 'VC' },
    { value: 'Samoa', id: 'WS' },
    { value: 'San Marino', id: 'SM' },
    { value: 'Sao Tome and Principe', id: 'ST' },
    { value: 'Saudi Arabia', id: 'SA' },
    { value: 'Senegal', id: 'SN' },
    { value: 'Serbia and Montenegro', id: 'CS' },
    { value: 'Seychelles', id: 'SC' },
    { value: 'Sierra Leone', id: 'SL' },
    { value: 'Singapore', id: 'SG' },
    { value: 'Slovakia', id: 'SK' },
    { value: 'Slovenia', id: 'SI' },
    { value: 'Solomon Islands', id: 'SB' },
    { value: 'Somalia', id: 'SO' },
    { value: 'South Africa', id: 'ZA' },
    { value: 'South Georgia and the South Sandwich Islands', id: 'GS' },
    { value: 'Spain', id: 'ES' },
    { value: 'Sri Lanka', id: 'LK' },
    { value: 'Sudan', id: 'SD' },
    { value: 'Suriname', id: 'SR' },
    { value: 'Svalbard and Jan Mayen', id: 'SJ' },
    { value: 'Swaziland', id: 'SZ' },
    { value: 'Sweden', id: 'SE' },
    { value: 'Switzerland', id: 'CH' },
    { value: 'Syrian Arab Republic', id: 'SY' },
    { value: 'Taiwan', id: 'TW' },
    { value: 'Tajikistan', id: 'TJ' },
    { value: 'Tanzania', id: 'TZ' },
    { value: 'Thailand', id: 'TH' },
    { value: 'Timor-Leste', id: 'TL' },
    { value: 'Togo', id: 'TG' },
    { value: 'Tokelau', id: 'TK' },
    { value: 'Tonga', id: 'TO' },
    { value: 'Trinidad and Tobago', id: 'TT' },
    { value: 'Tunisia', id: 'TN' },
    { value: 'Turkey', id: 'TR' },
    { value: 'Turkmenistan', id: 'TM' },
    { value: 'Turks and Caicos Islands', id: 'TC' },
    { value: 'Tuvalu', id: 'TV' },
    { value: 'Uganda', id: 'UG' },
    { value: 'Ukraine', id: 'UA' },
    { value: 'United Arab Emirates', id: 'AE' },
    { value: 'United Kingdom', id: 'GB' },
    { value: 'United States', id: 'US' },
    { value: 'United States Minor Outlying Islands', id: 'UM' },
    { value: 'Uruguay', id: 'UY' },
    { value: 'Uzbekistan', id: 'UZ' },
    { value: 'Vanuatu', id: 'VU' },
    { value: 'Venezuela', id: 'VE' },
    { value: 'Viet Nam', id: 'VN' },
    { value: 'Virgin Islands, British', id: 'VG' },
    { value: 'Virgin Islands, U.S.', id: 'VI' },
    { value: 'Wallis and Futuna', id: 'WF' },
    { value: 'Western Sahara', id: 'EH' },
    { value: 'Yemen', id: 'YE' },
    { value: 'Zambia', id: 'ZM' },
    { value: 'Zimbabwe', id: 'ZW' }
  ];
  uploadIconHtml = "<i class='fa fa-upload'></i>";
  removeHtml = "<i class='fa fa-times'></i>";
  industries = [
    {
      id: '1',
      name: 'Agriculture & Food',
      icon: 'icon-leaf'
    },
    {
      id: '2',
      name: 'Apparel,Textiles & Accessories',
      icon: 'icon-t-shirt'
    },
    {
      id: '3',
      name: 'Auto & Transportation',
      icon: 'fa-car'
    },
    {
      id: '4',
      name: 'Bags, Shoes & Accessories',
      icon: 'fa-shopping-bag'
    },
    {
      id: '5',
      name: 'Electronics',
      icon: 'fa-tv'
    },
    {
      id: '6',
      name: 'Electrical Equipment & Telecoms',
      icon: 'icon-plug'
    },
    {
      id: '7',
      name: 'Gifts, Sports & Toys',
      icon: 'icon-gift'
    },
    {
      id: '8',
      name: 'Health & Beauty',
      icon: 'fa-heartbeat'
    },
    {
      id: '9',
      name: 'Home, Lights & Construction',
      icon: 'icon-home-outline'
    },
    {
      id: '10',
      name: 'Machinery, Industrial Parts & Tools',
      icon: 'fa-gears'
    },
    {
      id: '11',
      name: 'Metallurgy, Chemicals, Rubber & Plastics',
      icon: 'icon-beaker'
    },
    {
      id: '12',
      name: 'Packaging, Advertising & Office',
      icon: 'fa-cubes'
    }
  ];
  selectedIndustries = [];
  subIndustries = [
    'Ex optio possimus',
    'Dolorem ipsum quia',
    'Aliqua Hic in voluptas',
    'Architecto amet incididunt',
    'Rerum omnis',
    'Aliqua Hic in voluptas',
    'Architecto amet incididunt',
    'Rerum omnis',
    'Nostrud sed tempora',
    'Rerum omnis ea et id et eum culpa',
    'Nostrud sed tempora',
    'Rerum omnis ea et id et eum culpa',
    'Aliqua Hic in voluptas',
    'Architecto amet incididunt',
    'Rerum omnis',
    'Nostrud sed tempora',
    'Rerum omnis ea et id et eum culpa',
    'Architecto amet incididunt',
    'Rerum omnis',
    'Aliqua Hic in voluptas',
    'Architecto amet incididunt',
    'Rerum omnis',
    'Nostrud sed tempora'
  ];
  selectedsubIndustries = [];
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
    private ng2FileInputService: Ng2FileInputService) {

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
  }

  ngAfterViewInit() {
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
                <i class='flag-icon flag-icon-${data.id.toLowerCase()}'></i> 
                 &nbsp; | &nbsp; ${data.value}
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
      this.selectedIndustries.splice(index, 1);
    }
    else if (this.selectedIndustries.length < 3) {
      this.selectedIndustries.push(industry);
    }
    else
      return;

    industry.selected = !industry.selected;
  }

  toggleSubIndustry(subIndustry) {
    if (this.selectedsubIndustries.indexOf(subIndustry) == -1)
      this.selectedsubIndustries.push(subIndustry);
    else
      this.selectedsubIndustries.splice(this.selectedsubIndustries.indexOf(subIndustry), 1)
  }

  addedSubCategory(e) {
    if (e) {
      this.subIndustries.push(e);
      this.selectedsubIndustries.push(e);
    }
    this.subSearch = null;
  }

  enterPressedSubSearch() {
    if (this.subSearch) {
      this.subIndustries.push(this.subSearch);
      this.selectedsubIndustries.push(this.subSearch);
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
    this.uploaded.push(event.file);
    this.scrollToBottom('.ulpoaded');
    setTimeout(() => { event.file.isLoaded = true; }, this.uploaded.length * 1000);
  }

  removeFile(index) {
    this.uploaded.splice(index, 1)
  }

  getCurrentFiles() {
    let files = this.ng2FileInputService.getCurrentFiles('multiFilesInput');
    return files;
  }

}