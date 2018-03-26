import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForProposalComponent } from './request-for-proposal.component';

describe('RequestForQuotationsComponent', () => {
  let component: RequestForProposalComponent;
  let fixture: ComponentFixture<RequestForProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestForProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestForProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
