import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasingMandateDetailsComponent } from './leasing-mandate-details.component';

describe('LeasingMandateDetailsComponent', () => {
  let component: LeasingMandateDetailsComponent;
  let fixture: ComponentFixture<LeasingMandateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeasingMandateDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeasingMandateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
