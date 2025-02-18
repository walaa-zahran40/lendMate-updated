import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallTypesCommunicationComponent } from './call-types-communication.component';

describe('CallTypesCommunicationComponent', () => {
  let component: CallTypesCommunicationComponent;
  let fixture: ComponentFixture<CallTypesCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallTypesCommunicationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CallTypesCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
