import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeCalculationTypesComponent } from './fee-calculation-types.component';

describe('FeeCalculationTypesComponent', () => {
  let component: FeeCalculationTypesComponent;
  let fixture: ComponentFixture<FeeCalculationTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeeCalculationTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeCalculationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
