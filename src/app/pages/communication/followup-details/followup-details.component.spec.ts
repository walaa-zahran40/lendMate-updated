import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupDetailsComponent } from './followup-details.component';

describe('FollowupDetailsComponent', () => {
  let component: FollowupDetailsComponent;
  let fixture: ComponentFixture<FollowupDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FollowupDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
