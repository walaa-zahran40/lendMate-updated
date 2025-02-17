import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationFlowTypesDropdownComponent } from './communication-flow-types-dropdown.component';

describe('CommunicationFlowTypesDropdownComponent', () => {
  let component: CommunicationFlowTypesDropdownComponent;
  let fixture: ComponentFixture<CommunicationFlowTypesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunicationFlowTypesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunicationFlowTypesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
