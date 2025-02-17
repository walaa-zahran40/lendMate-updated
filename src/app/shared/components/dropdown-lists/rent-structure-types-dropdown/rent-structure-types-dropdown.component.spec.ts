import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentStructureTypesDropdownComponent } from './rent-structure-types-dropdown.component';

describe('RentStructureTypesDropdownComponent', () => {
  let component: RentStructureTypesDropdownComponent;
  let fixture: ComponentFixture<RentStructureTypesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentStructureTypesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentStructureTypesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
