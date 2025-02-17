import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationFlowTypesComponent } from './communication-flow-types.component';

describe('CommunicationFlowTypesComponent', () => {
  let component: CommunicationFlowTypesComponent;
  let fixture: ComponentFixture<CommunicationFlowTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunicationFlowTypesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunicationFlowTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
