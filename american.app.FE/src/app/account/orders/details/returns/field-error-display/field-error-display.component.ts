import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'control-messages',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.css']
})
export class FieldErrorDisplayComponent {

  @Input() control: FormControl;

  @Input() display: string;


  config = {
    'required': 'is required'
  };

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        if (this.config[propertyName]) {
          return `${this.display} ${this.config[propertyName]}`
        } else {
          return this.control.errors[propertyName].message
        }
      }
    }
    return null;
  }
}
