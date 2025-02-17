import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressTypesDropdownComponent } from './address-types-dropdown.component';

describe('AddressTypesDropdownComponent', () => {
  let component: AddressTypesDropdownComponent;
  let fixture: ComponentFixture<AddressTypesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressTypesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressTypesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
