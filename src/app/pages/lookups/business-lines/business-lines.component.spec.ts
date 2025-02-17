import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessLinesComponent } from './business-lines.component';

describe('BusinessLinesComponent', () => {
  let component: BusinessLinesComponent;
  let fixture: ComponentFixture<BusinessLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessLinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
