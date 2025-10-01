import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgreementContactPersonComponent } from './add-agreement-contact-person.component';

describe('AddAgreementContactPersonComponent', () => {
  let component: AddAgreementContactPersonComponent;
  let fixture: ComponentFixture<AddAgreementContactPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAgreementContactPersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAgreementContactPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
