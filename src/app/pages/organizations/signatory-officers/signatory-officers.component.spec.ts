import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatoryOfficersComponent } from './signatory-officers.component';

describe('SignatoryOfficersComponent', () => {
  let component: SignatoryOfficersComponent;
  let fixture: ComponentFixture<SignatoryOfficersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignatoryOfficersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignatoryOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
