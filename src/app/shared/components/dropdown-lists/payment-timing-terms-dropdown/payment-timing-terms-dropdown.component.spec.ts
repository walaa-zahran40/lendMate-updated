import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTimingTermsDropdownComponent } from './payment-timing-terms-dropdown.component';

describe('PaymentTimingTermsDropdownComponent', () => {
  let component: PaymentTimingTermsDropdownComponent;
  let fixture: ComponentFixture<PaymentTimingTermsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentTimingTermsDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentTimingTermsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
