import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallActionTypesComponent } from './call-action-types.component';

describe('CallActionTypeComponent', () => {
  let component: CallActionTypesComponent;
  let fixture: ComponentFixture<CallActionTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallActionTypesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CallActionTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
