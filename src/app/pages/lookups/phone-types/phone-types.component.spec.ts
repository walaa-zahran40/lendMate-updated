import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneTypesComponent } from './phone-types.component';

describe('PhoneTypesComponent', () => {
  let component: PhoneTypesComponent;
  let fixture: ComponentFixture<PhoneTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhoneTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
