import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLegalFormLawComponent } from './view-legal-form-law.component';

describe('ViewLegalFormLawComponent', () => {
  let component: ViewLegalFormLawComponent;
  let fixture: ComponentFixture<ViewLegalFormLawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewLegalFormLawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLegalFormLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
