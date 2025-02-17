import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsDropdownComponent } from './departments-dropdown.component';

describe('DepartmentsDropdownComponent', () => {
  let component: DepartmentsDropdownComponent;
  let fixture: ComponentFixture<DepartmentsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentsDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
