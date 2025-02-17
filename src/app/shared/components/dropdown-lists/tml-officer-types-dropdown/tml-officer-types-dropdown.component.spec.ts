import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmlOfficerTypesDropdownComponent } from './tml-officer-types-dropdown.component';

describe('TmlOfficerTypesDropdownComponent', () => {
  let component: TmlOfficerTypesDropdownComponent;
  let fixture: ComponentFixture<TmlOfficerTypesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmlOfficerTypesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TmlOfficerTypesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
