import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgreementFileComponent } from './add-agreement-file.component';

describe('AddAgreementFileComponent', () => {
  let component: AddAgreementFileComponent;
  let fixture: ComponentFixture<AddAgreementFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAgreementFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAgreementFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
