import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandateStatusActionDropdownComponent } from './mandate-status-action-dropdown.component';

describe('MandateStatusActionDropdownComponent', () => {
  let component: MandateStatusActionDropdownComponent;
  let fixture: ComponentFixture<MandateStatusActionDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MandateStatusActionDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MandateStatusActionDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
