import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuatationDetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: QuatationDetailsComponent;
  let fixture: ComponentFixture<QuatationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuatationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuatationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
