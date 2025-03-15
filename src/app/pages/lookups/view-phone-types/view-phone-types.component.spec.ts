import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPhoneTypesComponent } from './view-phone-types.component';

describe('ViewPhoneTypesComponent', () => {
  let component: ViewPhoneTypesComponent;
  let fixture: ComponentFixture<ViewPhoneTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPhoneTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPhoneTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
