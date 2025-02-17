import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandateValidityUnitDropdownComponent } from './mandate-validity-unit-dropdown.component';

describe('MandateValidityUnitDropdownComponent', () => {
  let component: MandateValidityUnitDropdownComponent;
  let fixture: ComponentFixture<MandateValidityUnitDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MandateValidityUnitDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MandateValidityUnitDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
