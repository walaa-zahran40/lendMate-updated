import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaDropdownComponent } from './area-dropdown.component';

describe('AreaDropdownComponent', () => {
  let component: AreaDropdownComponent;
  let fixture: ComponentFixture<AreaDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
