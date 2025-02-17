import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandateStatusDropdownComponent } from './mandate-status-dropdown.component';

describe('MandateStatusDropdownComponent', () => {
  let component: MandateStatusDropdownComponent;
  let fixture: ComponentFixture<MandateStatusDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MandateStatusDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MandateStatusDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
