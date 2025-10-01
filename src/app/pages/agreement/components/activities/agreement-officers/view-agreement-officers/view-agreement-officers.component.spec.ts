import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgreementOfficersComponent } from './view-agreement-officers.component';

describe('ViewAgreementOfficersComponent', () => {
  let component: ViewAgreementOfficersComponent;
  let fixture: ComponentFixture<ViewAgreementOfficersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAgreementOfficersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAgreementOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
