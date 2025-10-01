import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgreementContactPersonsComponent } from './view-agreement-contact-persons.component';

describe('ViewAgreementContactPersonsComponent', () => {
  let component: ViewAgreementContactPersonsComponent;
  let fixture: ComponentFixture<ViewAgreementContactPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAgreementContactPersonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAgreementContactPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
