import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsDropdownComponent } from './operations-dropdown.component';

describe('OperationsDropdownComponent', () => {
  let component: OperationsDropdownComponent;
  let fixture: ComponentFixture<OperationsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationsDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
