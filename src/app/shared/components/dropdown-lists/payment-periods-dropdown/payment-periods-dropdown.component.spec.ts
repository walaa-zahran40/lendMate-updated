import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPeriodsDropdownComponent } from './payment-periods-dropdown.component';

describe('PaymentPeriodsDropdownComponent', () => {
  let component: PaymentPeriodsDropdownComponent;
  let fixture: ComponentFixture<PaymentPeriodsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentPeriodsDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentPeriodsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
