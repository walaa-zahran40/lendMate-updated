import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallTypesComponent } from './call-types.component';

describe('CallTypesComponent', () => {
  let component: CallTypesComponent;
  let fixture: ComponentFixture<CallTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
