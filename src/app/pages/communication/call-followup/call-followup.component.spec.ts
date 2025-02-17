import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallFollowupComponent } from './call-followup.component';

describe('CallFollowupComponent', () => {
  let component: CallFollowupComponent;
  let fixture: ComponentFixture<CallFollowupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallFollowupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
