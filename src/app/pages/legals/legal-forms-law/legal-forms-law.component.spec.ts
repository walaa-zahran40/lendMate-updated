import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalFormsLawComponent } from './legal-forms-law.component';

describe('LegalFormsLawComponent', () => {
  let component: LegalFormsLawComponent;
  let fixture: ComponentFixture<LegalFormsLawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LegalFormsLawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalFormsLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
