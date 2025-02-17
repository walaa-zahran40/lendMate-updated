import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallActionTypesDropdownComponent } from './call-action-types-dropdown.component';

describe('CallActionTypesDropdownComponent', () => {
  let component: CallActionTypesDropdownComponent;
  let fixture: ComponentFixture<CallActionTypesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallActionTypesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallActionTypesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
