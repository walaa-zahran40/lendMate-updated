import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxOfficesComponent } from './tax-offices.component';

describe('TaxOfficesComponent', () => {
  let component: TaxOfficesComponent;
  let fixture: ComponentFixture<TaxOfficesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxOfficesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
