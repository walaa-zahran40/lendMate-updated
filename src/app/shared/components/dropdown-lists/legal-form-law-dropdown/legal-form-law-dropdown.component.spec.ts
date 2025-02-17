import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalFormLawDropdownComponent } from './legal-form-law-dropdown.component';

describe('LegalFormLawDropdownComponent', () => {
  let component: LegalFormLawDropdownComponent;
  let fixture: ComponentFixture<LegalFormLawDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LegalFormLawDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalFormLawDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
