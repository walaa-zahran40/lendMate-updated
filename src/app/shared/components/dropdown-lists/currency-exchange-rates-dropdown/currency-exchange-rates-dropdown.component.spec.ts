import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyExchangeRatesDropdownComponent } from './currency-exchange-rates-dropdown.component';

describe('CurrencyExchangeRatesDropdownComponent', () => {
  let component: CurrencyExchangeRatesDropdownComponent;
  let fixture: ComponentFixture<CurrencyExchangeRatesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyExchangeRatesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyExchangeRatesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
