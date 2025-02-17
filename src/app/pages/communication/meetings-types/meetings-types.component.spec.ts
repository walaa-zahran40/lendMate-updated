import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsTypesComponent } from './meetings-types.component';

describe('MeetingsTypesComponent', () => {
  let component: MeetingsTypesComponent;
  let fixture: ComponentFixture<MeetingsTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeetingsTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
