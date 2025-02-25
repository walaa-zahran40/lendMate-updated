import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyViewOnlyComponent } from './company-view-only.component';

describe('CompanyViewOnlyComponent', () => {
  let component: CompanyViewOnlyComponent;
  let fixture: ComponentFixture<CompanyViewOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyViewOnlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyViewOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
