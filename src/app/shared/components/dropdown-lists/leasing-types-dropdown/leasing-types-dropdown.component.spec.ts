import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasingTypesDropdownComponent } from './leasing-types-dropdown.component';

describe('LeasingTypesDropdownComponent', () => {
  let component: LeasingTypesDropdownComponent;
  let fixture: ComponentFixture<LeasingTypesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeasingTypesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeasingTypesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
