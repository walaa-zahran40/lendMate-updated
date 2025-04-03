import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSectorDropdownComponent } from './sub-sector-dropdown.component';

describe('SubSectorDropdownComponent', () => {
  let component: SubSectorDropdownComponent;
  let fixture: ComponentFixture<SubSectorDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubSectorDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubSectorDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
