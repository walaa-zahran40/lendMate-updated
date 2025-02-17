import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalFormDropdownComponent } from './legal-form-dropdown.component';

describe('LegalFormDropdownComponent', () => {
  let component: LegalFormDropdownComponent;
  let fixture: ComponentFixture<LegalFormDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LegalFormDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalFormDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
