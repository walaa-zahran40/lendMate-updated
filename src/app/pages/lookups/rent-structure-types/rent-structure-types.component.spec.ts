import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentStructureTypesComponent } from './rent-structure-types.component';

describe('RentStructureTypesComponent', () => {
  let component: RentStructureTypesComponent;
  let fixture: ComponentFixture<RentStructureTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentStructureTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentStructureTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
