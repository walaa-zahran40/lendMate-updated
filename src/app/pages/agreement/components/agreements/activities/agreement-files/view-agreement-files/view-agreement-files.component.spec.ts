import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgreementFilesComponent } from './view-agreement-files.component';

describe('ViewAgreementFilesComponent', () => {
  let component: ViewAgreementFilesComponent;
  let fixture: ComponentFixture<ViewAgreementFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAgreementFilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAgreementFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
