import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallTypesDropdownComponent } from './call-types-dropdown.component';

describe('CallTypesDropdownComponent', () => {
  let component: CallTypesDropdownComponent;
  let fixture: ComponentFixture<CallTypesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallTypesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallTypesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
