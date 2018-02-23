import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {SpecificationApi} from '../../common/BE.SDKs/quotations';
import {UserService} from '../../core/services/user.service/user.service';
import {AttachmentService} from '../../core/services/attachment.service/attachment.service';
import {AttachmentApi, LoopBackConfig as attachementApiConfig} from '../../common/BE.SDKs/attachment';

declare var $: any;

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  specificationsRequests = [];
  attachmentServer: any;
  formValidation: any;

  constructor(private specificationApi: SpecificationApi,
              private auth: UserService,
              private AttachmentService: AttachmentService,
              private AttachmentServiceAPI: AttachmentApi,
              private router: Router) {
  }

  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();
    this.loadSpecificationsRequests();
  }

  formLoaded(id) {
    this.formValidation = $('#' + id).parsley({trigger: "change keyup"});
  }

  loadSpecificationsRequests(): any {
    this.specificationApi.getSpecifications(this.auth.account.id).subscribe((response) => {
      this.specificationsRequests = response.specifications;
    }, (err) => {

    })
  }



  sendReply(specification) {
    this.specificationApi.replyToSpecification({specificationId: specification.id, reply: specification.reply})
      .subscribe(response => {

      })
  }

  navigateTo(destination: string) {
    this.router.navigate([destination]);
  }
}
