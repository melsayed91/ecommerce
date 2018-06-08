import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import * as moment from 'moment';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl, FormControl } from "@angular/forms";
@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {


  saleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SaleComponent>,
    @Inject(MAT_DIALOG_DATA) { sale_type, sale_value, start_date,
      end_date, notes }
  ) {
    this.saleForm = fb.group({
      sale_type: [sale_type, Validators.required],
      sale_value: [sale_value, Validators.compose([Validators.required, Validators.min(1)])],
      start_date: [start_date, Validators.compose([Validators.required])],
      end_date: [end_date, Validators.required],
      notes: [notes]
    });
  }

  ngOnInit() {
  }
  startDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      var date_now = new Date(),
        selected_date = new Date(control.value);
      date_now.setHours(0, 0, 0);
      selected_date.setHours(0, 0, 0);
      const forbidden = selected_date < date_now;
      return forbidden ? { 'invalidStartDate': { value: control.value, message: 'Start Date must be greater than or qual today' } } : null;
    };
  }

  endDateValidator(start_date: Date, end_date: Date): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      var date_now = new Date();
      const forbidden = end_date >= date_now && end_date < start_date;
      return forbidden ? { 'invalidEndDate': { value: control.value, message: 'End date must be greater than or equal to start date' } } : null;
    };
  }


  save() {
    if (this.saleForm.valid) {
      this.dialogRef.close(this.saleForm.value);
    } else {
      this.validateAllFormFields(this.saleForm);
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
}
