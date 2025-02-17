import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTurnoverComponent } from './company-turnover.component';

describe('CompanyTurnoverComponent', () => {
  let component: CompanyTurnoverComponent;
  let fixture: ComponentFixture<CompanyTurnoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyTurnoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyTurnoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
