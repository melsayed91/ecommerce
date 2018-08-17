import { Component, Inject, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import * as moment from 'moment';
import { AttachmentApi, LoopBackConfig as attachementApiConfig } from '../../../../common/BE.SDKs/attachment';
import { AttachmentService } from '../../../../core/services/attachment.service/attachment.service';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl, FormControl } from "@angular/forms";
@Component({
  selector: 'app-retruns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.scss']
})
export class ProductReturnsComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.alive = false;
  }
  uploadIconHtml = "<i class='fa fa-upload'></i>";
  removeHtml = "<i class='fa fa-times'></i>";
  alive: boolean = true;
  attachmentServer: any;
  productReturnForm: FormGroup;
  return_reasons: {}
  uploaded = [];
  constructor(
    private AttachmentService: AttachmentService,
    private AttachmentServiceAPI: AttachmentApi,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductReturnsComponent>,
    @Inject(MAT_DIALOG_DATA) { return_reason, description }
  ) {
    this.productReturnForm = fb.group({
      return_reason: [return_reason, Validators.required],
      description: [description]

    });
  }

  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();
    this.return_reasons = this.dialogRef._containerInstance._config.data.return_reasons
  }



  save() {
    if (this.productReturnForm.valid) {
      var attachmentIds = [];
      if (this.uploaded && this.uploaded.length) {
        attachmentIds = this.uploaded.map(function (item) {
          return item.id
        })
      }
      this.dialogRef.close({ form: this.productReturnForm.value, attachmentIds: attachmentIds });
    } else {
      this.validateAllFormFields(this.productReturnForm);
    }
  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  close() {
    this.dialogRef.close();
  }


  onAdded(event: any) {
    var form = new FormData();
    form.append("file", event.file, event.file.name);
    this.AttachmentService.upload(form, event.file.name, {})
      .takeWhile(() => this.alive)
      .subscribe((response: any) => {
        this.uploaded.push(response);
      }, (err) => {

      })
  }

  removeFile(event: any) {
    var toBeDeletedIndex = this.uploaded.findIndex(function (item) {
      return item.originalFileName === event.file.name
    });
    this.AttachmentServiceAPI.deleteById(this.uploaded[toBeDeletedIndex].id)
      .takeWhile(() => this.alive)
      .subscribe((response: any) => {
        this.uploaded.splice(toBeDeletedIndex, 1)
      }, (err) => {
      })
  }
}
