import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSectorsDropdownComponent } from './sub-sectors-dropdown.component';

describe('SubSectorsDropdownComponent', () => {
  let component: SubSectorsDropdownComponent;
  let fixture: ComponentFixture<SubSectorsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubSectorsDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubSectorsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
