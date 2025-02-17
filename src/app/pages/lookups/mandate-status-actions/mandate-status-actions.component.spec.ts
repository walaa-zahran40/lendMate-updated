import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandateStatusActionsComponent } from './mandate-status-actions.component';

describe('MandateStatusActionsComponent', () => {
  let component: MandateStatusActionsComponent;
  let fixture: ComponentFixture<MandateStatusActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MandateStatusActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MandateStatusActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
