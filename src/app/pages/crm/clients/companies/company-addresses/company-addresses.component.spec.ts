import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAddressesComponent } from './company-addresses.component';

describe('CompanyAddressesComponent', () => {
  let component: CompanyAddressesComponent;
  let fixture: ComponentFixture<CompanyAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyAddressesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
