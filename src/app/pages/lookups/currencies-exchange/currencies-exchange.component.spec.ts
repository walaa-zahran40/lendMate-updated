import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesExchangeComponent } from './currencies-exchange.component';

describe('CurrenciesExchangeComponent', () => {
  let component: CurrenciesExchangeComponent;
  let fixture: ComponentFixture<CurrenciesExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrenciesExchangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrenciesExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
