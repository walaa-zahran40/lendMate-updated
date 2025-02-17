import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernorateDropdownComponent } from './governorate-dropdown.component';

describe('GovernorateDropdownComponent', () => {
  let component: GovernorateDropdownComponent;
  let fixture: ComponentFixture<GovernorateDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GovernorateDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovernorateDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
