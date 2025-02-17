import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationTypeDropdownComponent } from './identification-type-dropdown.component';

describe('IdentificationTypeDropdownComponent', () => {
  let component: IdentificationTypeDropdownComponent;
  let fixture: ComponentFixture<IdentificationTypeDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdentificationTypeDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentificationTypeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
