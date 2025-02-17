import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalFormsComponent } from './legal-forms.component';

describe('LegalFormsComponent', () => {
  let component: LegalFormsComponent;
  let fixture: ComponentFixture<LegalFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LegalFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
