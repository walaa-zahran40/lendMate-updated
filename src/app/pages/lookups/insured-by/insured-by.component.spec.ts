import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuredByComponent } from './insured-by.component';

describe('InsuredByComponent', () => {
  let component: InsuredByComponent;
  let fixture: ComponentFixture<InsuredByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsuredByComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuredByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
