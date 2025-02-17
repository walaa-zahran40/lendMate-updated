import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesDropdownComponent } from './currencies-dropdown.component';

describe('CurrenciesDropdownComponent', () => {
  let component: CurrenciesDropdownComponent;
  let fixture: ComponentFixture<CurrenciesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrenciesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrenciesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
