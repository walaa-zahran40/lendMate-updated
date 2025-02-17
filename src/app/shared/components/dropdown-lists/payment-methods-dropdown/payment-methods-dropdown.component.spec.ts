import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodsDropdownComponent } from './payment-methods-dropdown.component';

describe('PaymentMethodsDropdownComponent', () => {
  let component: PaymentMethodsDropdownComponent;
  let fixture: ComponentFixture<PaymentMethodsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentMethodsDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMethodsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
