import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmlOfficerVisibleComponent } from './tml-officer.component';

describe('TmlOfficerVisibleComponent', () => {
  let component: TmlOfficerVisibleComponent;
  let fixture: ComponentFixture<TmlOfficerVisibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmlOfficerVisibleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmlOfficerVisibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
