import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgreementRegistrationComponent } from './add-agreement-registration.component';

describe('AddAgreementRegistrationComponent', () => {
  let component: AddAgreementRegistrationComponent;
  let fixture: ComponentFixture<AddAgreementRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAgreementRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAgreementRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
