import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasingTypeComponent } from './leasing-type.component';

describe('LeasingTypeComponent', () => {
  let component: LeasingTypeComponent;
  let fixture: ComponentFixture<LeasingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeasingTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeasingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
