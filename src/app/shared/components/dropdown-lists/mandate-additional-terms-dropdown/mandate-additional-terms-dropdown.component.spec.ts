import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandateAdditionalTermsDropdownComponent } from './mandate-additional-terms-dropdown.component';

describe('MandateAdditionalTermsDropdownComponent', () => {
  let component: MandateAdditionalTermsDropdownComponent;
  let fixture: ComponentFixture<MandateAdditionalTermsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MandateAdditionalTermsDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MandateAdditionalTermsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
