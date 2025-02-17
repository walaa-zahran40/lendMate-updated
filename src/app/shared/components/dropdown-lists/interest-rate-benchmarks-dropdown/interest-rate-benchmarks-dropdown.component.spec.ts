import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestRateBenchmarksDropdownComponent } from './interest-rate-benchmarks-dropdown.component';

describe('InterestRateBenchmarksDropdownComponent', () => {
  let component: InterestRateBenchmarksDropdownComponent;
  let fixture: ComponentFixture<InterestRateBenchmarksDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterestRateBenchmarksDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestRateBenchmarksDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
