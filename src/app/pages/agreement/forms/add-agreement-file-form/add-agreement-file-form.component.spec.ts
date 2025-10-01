import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgreementFileFormComponent } from './add-agreement-file-form.component';

describe('AddAgreementFileFormComponent', () => {
  let component: AddAgreementFileFormComponent;
  let fixture: ComponentFixture<AddAgreementFileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAgreementFileFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAgreementFileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
