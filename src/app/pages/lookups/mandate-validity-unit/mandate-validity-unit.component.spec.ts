import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandateValidityUnitComponent } from './mandate-validity-unit.component';

describe('MandateValidityUnitComponent', () => {
  let component: MandateValidityUnitComponent;
  let fixture: ComponentFixture<MandateValidityUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MandateValidityUnitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MandateValidityUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
