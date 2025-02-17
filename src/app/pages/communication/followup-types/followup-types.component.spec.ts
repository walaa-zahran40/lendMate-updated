import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpTypesComponent } from './followup-types.component';

describe('FollowUpTypesComponent', () => {
  let component: FollowUpTypesComponent;
  let fixture: ComponentFixture<FollowUpTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FollowUpTypesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FollowUpTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
