import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandateStatusesComponent } from './mandate-statuses.component';

describe('MandateStatusesComponent', () => {
  let component: MandateStatusesComponent;
  let fixture: ComponentFixture<MandateStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MandateStatusesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MandateStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
