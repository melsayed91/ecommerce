import { Component, OnInit,Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RegisterModule } from '../register.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input()
  model: any = {firstName:'fff'};
  loading = false;
  constructor() { }

  ngOnInit() {
  }
  submitted = false;

  onSubmit() { this.submitted = true; }


}
