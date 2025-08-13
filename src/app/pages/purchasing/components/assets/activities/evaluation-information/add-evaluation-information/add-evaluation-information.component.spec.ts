import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEvaluationInformationComponent } from './add-evaluation-information.component';

describe('AddEvaluationInformationComponent', () => {
  let component: AddEvaluationInformationComponent;
  let fixture: ComponentFixture<AddEvaluationInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEvaluationInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEvaluationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
