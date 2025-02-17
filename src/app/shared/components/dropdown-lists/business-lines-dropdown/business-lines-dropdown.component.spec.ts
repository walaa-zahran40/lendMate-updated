import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessLinesDropdownComponent } from './business-lines-dropdown.component';

describe('BusinessLinesDropdownComponent', () => {
  let component: BusinessLinesDropdownComponent;
  let fixture: ComponentFixture<BusinessLinesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessLinesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessLinesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
