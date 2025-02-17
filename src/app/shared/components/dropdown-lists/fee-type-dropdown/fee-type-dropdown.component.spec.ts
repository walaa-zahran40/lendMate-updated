import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeTypeDropdownComponent } from './fee-type-dropdown.component';

describe('FeeTypeDropdownComponent', () => {
  let component: FeeTypeDropdownComponent;
  let fixture: ComponentFixture<FeeTypeDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeeTypeDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeTypeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
