import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuredByDropdownComponent } from './insured-by-dropdown.component';

describe('InsuredByDropdownComponent', () => {
  let component: InsuredByDropdownComponent;
  let fixture: ComponentFixture<InsuredByDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsuredByDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuredByDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
