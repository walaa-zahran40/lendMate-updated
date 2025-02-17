import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficersDropdownComponent } from './officers-dropdown.component';

describe('OfficersDropdownComponent', () => {
  let component: OfficersDropdownComponent;
  let fixture: ComponentFixture<OfficersDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfficersDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficersDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
