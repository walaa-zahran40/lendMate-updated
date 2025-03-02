import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFollowUpsPointsComponent } from './add-follow-ups-points.component';

describe('AddFollowUpsPointsComponent', () => {
  let component: AddFollowUpsPointsComponent;
  let fixture: ComponentFixture<AddFollowUpsPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFollowUpsPointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFollowUpsPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
