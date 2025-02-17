import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorsDropdownComponent } from './sectors-dropdown.component';

describe('SectorsDropdownComponent', () => {
  let component: SectorsDropdownComponent;
  let fixture: ComponentFixture<SectorsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectorsDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectorsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
