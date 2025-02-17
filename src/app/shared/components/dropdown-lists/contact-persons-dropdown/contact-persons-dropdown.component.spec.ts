import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPersonsDropdownComponent } from './contact-persons-dropdown.component';

describe('ContactPersonsDropdownComponent', () => {
  let component: ContactPersonsDropdownComponent;
  let fixture: ComponentFixture<ContactPersonsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactPersonsDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactPersonsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
