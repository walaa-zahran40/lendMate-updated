import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpPointsDropdownComponent } from './follow-up-points-dropdown.component';

describe('FollowUpPointsDropdownComponent', () => {
  let component: FollowUpPointsDropdownComponent;
  let fixture: ComponentFixture<FollowUpPointsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FollowUpPointsDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowUpPointsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
