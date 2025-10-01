import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgreementOfficerComponent } from './add-agreement-officer.component';

describe('AddAgreementOfficerComponent', () => {
  let component: AddAgreementOfficerComponent;
  let fixture: ComponentFixture<AddAgreementOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAgreementOfficerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAgreementOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
