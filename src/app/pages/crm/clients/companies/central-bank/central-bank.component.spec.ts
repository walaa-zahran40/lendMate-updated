import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralBankComponent } from './central-bank.component';

describe('CentralBankComponent', () => {
  let component: CentralBankComponent;
  let fixture: ComponentFixture<CentralBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CentralBankComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentralBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
