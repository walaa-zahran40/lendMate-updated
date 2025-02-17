import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMonthDaysDropdownComponent } from './payment-month-days-dropdown.component';

describe('PaymentMonthDaysDropdownComponent', () => {
  let component: PaymentMonthDaysDropdownComponent;
  let fixture: ComponentFixture<PaymentMonthDaysDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentMonthDaysDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMonthDaysDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
