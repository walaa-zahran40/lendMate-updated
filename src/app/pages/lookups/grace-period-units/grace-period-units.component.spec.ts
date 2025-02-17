import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GracePeriodUnitsComponent } from './grace-period-units.component';

describe('GracePeriodUnitsComponent', () => {
  let component: GracePeriodUnitsComponent;
  let fixture: ComponentFixture<GracePeriodUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GracePeriodUnitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GracePeriodUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
