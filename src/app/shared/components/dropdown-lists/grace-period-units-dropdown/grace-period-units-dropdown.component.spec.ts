import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GracePeriodUnitsDropdownComponent } from './grace-period-units-dropdown.component';

describe('GracePeriodUnitsDropdownComponent', () => {
  let component: GracePeriodUnitsDropdownComponent;
  let fixture: ComponentFixture<GracePeriodUnitsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GracePeriodUnitsDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GracePeriodUnitsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
