import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmlOfficerTypesComponent } from './tml-officer-types.component';

describe('TmlOfficerTypesComponent', () => {
  let component: TmlOfficerTypesComponent;
  let fixture: ComponentFixture<TmlOfficerTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmlOfficerTypesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmlOfficerTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
