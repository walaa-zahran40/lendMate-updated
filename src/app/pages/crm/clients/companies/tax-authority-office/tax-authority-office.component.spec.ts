import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxAuthorityOfficeComponent } from './tax-authority-office.component';

describe('TaxAuthorityOfficeComponent', () => {
  let component: TaxAuthorityOfficeComponent;
  let fixture: ComponentFixture<TaxAuthorityOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxAuthorityOfficeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxAuthorityOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
