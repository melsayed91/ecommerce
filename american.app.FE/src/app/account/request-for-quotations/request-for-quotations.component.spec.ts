import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForQuotationsComponent } from './request-for-quotations.component';

describe('RequestForQuotationsComponent', () => {
  let component: RequestForQuotationsComponent;
  let fixture: ComponentFixture<RequestForQuotationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestForQuotationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestForQuotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
