import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardAgreementComponent } from './wizard-agreement.component';

describe('WizardAgreementComponent', () => {
  let component: WizardAgreementComponent;
  let fixture: ComponentFixture<WizardAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WizardAgreementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WizardAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
