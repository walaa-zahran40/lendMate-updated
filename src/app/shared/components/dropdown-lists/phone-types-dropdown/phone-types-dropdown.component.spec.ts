import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneTypesDropdownComponent } from './phone-types-dropdown.component';

describe('PhoneTypesDropdownComponent', () => {
  let component: PhoneTypesDropdownComponent;
  let fixture: ComponentFixture<PhoneTypesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhoneTypesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneTypesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
