import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTypesDropdownComponent } from './company-types-dropdown.component';

describe('CompanyTypesDropdownComponent', () => {
  let component: CompanyTypesDropdownComponent;
  let fixture: ComponentFixture<CompanyTypesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyTypesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyTypesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
