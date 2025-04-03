import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorDropdownComponent } from './sector-dropdown.component';

describe('SectorDropdownComponent', () => {
  let component: SectorDropdownComponent;
  let fixture: ComponentFixture<SectorDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectorDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectorDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
