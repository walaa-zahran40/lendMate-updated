import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMandateOfficerComponent } from './add-mandate-officer.component';

describe('AddMandateOfficerComponent', () => {
  let component: AddMandateOfficerComponent;
  let fixture: ComponentFixture<AddMandateOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMandateOfficerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMandateOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
