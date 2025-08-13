import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkflowStatusComponent } from './add-workflow-status.component';

describe('AddWorkflowStatusComponent', () => {
  let component: AddWorkflowStatusComponent;
  let fixture: ComponentFixture<AddWorkflowStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddWorkflowStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWorkflowStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
