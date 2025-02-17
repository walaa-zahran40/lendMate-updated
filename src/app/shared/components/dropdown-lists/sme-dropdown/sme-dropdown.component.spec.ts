import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeDropdownComponent } from './sme-dropdown.component';

describe('SmeDropdownComponent', () => {
  let component: SmeDropdownComponent;
  let fixture: ComponentFixture<SmeDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmeDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
