import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupPointsComponent } from './followup-points.component';

describe('FollowupPointsComponent', () => {
  let component: FollowupPointsComponent;
  let fixture: ComponentFixture<FollowupPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FollowupPointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowupPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
