import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReturnsComponent } from './returns.component';

describe('SaleComponent', () => {
  let component: ProductReturnsComponent;
  let fixture: ComponentFixture<ProductReturnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductReturnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
