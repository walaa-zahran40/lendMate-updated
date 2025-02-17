import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeCalculationTypeDropdownComponent } from './fee-calculation-type-dropdown.component';

describe('FeeCalculationTypeDropdownComponent', () => {
  let component: FeeCalculationTypeDropdownComponent;
  let fixture: ComponentFixture<FeeCalculationTypeDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeeCalculationTypeDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeCalculationTypeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
