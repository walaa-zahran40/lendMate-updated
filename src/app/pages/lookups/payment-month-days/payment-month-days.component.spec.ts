import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMonthDaysComponent } from './payment-month-days.component';

describe('PaymentMonthDaysComponent', () => {
  let component: PaymentMonthDaysComponent;
  let fixture: ComponentFixture<PaymentMonthDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentMonthDaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMonthDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
