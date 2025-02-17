import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPhoneNumbersComponent } from './company-phone-numbers.component';

describe('CompanyPhoneNumbersComponent', () => {
  let component: CompanyPhoneNumbersComponent;
  let fixture: ComponentFixture<CompanyPhoneNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyPhoneNumbersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyPhoneNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
