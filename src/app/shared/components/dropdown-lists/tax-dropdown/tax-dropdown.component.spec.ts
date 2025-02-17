import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxDropdownComponent } from './tax-dropdown.component';

describe('TaxDropdownComponent', () => {
  let component: TaxDropdownComponent;
  let fixture: ComponentFixture<TaxDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
