import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingFollowupComponent } from './meeting-followup.component';

describe('MeetingFollowupComponent', () => {
  let component: MeetingFollowupComponent;
  let fixture: ComponentFixture<MeetingFollowupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeetingFollowupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
