import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLicenseInformationComponent } from './add-license-information.component';

describe('AddLicenseInformationComponent', () => {
  let component: AddLicenseInformationComponent;
  let fixture: ComponentFixture<AddLicenseInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLicenseInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLicenseInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
