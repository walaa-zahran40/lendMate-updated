import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgreementContactPersonFormComponent } from './add-agreement-contact-person-form.component';

describe('AddAgreementContactPersonFormComponent', () => {
  let component: AddAgreementContactPersonFormComponent;
  let fixture: ComponentFixture<AddAgreementContactPersonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAgreementContactPersonFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAgreementContactPersonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
