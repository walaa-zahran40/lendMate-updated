import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgreementRegistrationsComponent } from './view-agreement-registrations.component';

describe('ViewAgreementRegistrationsComponent', () => {
  let component: ViewAgreementRegistrationsComponent;
  let fixture: ComponentFixture<ViewAgreementRegistrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAgreementRegistrationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAgreementRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
