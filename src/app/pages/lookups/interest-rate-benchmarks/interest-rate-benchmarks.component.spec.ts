import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestRateBenchmarksComponent } from './interest-rate-benchmarks.component';

describe('InterestRateBenchmarksComponent', () => {
  let component: InterestRateBenchmarksComponent;
  let fixture: ComponentFixture<InterestRateBenchmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterestRateBenchmarksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestRateBenchmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
