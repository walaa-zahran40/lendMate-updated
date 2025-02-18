import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasingMandatesComponent } from './leasing-mandates.component';

describe('LeasingMandatesComponent', () => {
  let component: LeasingMandatesComponent;
  let fixture: ComponentFixture<LeasingMandatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeasingMandatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeasingMandatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
