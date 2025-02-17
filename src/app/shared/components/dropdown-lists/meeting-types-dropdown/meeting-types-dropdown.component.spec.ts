import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingTypesDropdownComponent } from './meeting-types-dropdown.component';

describe('MeetingTypesDropdownComponent', () => {
  let component: MeetingTypesDropdownComponent;
  let fixture: ComponentFixture<MeetingTypesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeetingTypesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingTypesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
