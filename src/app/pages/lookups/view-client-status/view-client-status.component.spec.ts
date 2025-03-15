import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientStatusComponent } from './view-client-status.component';

describe('ViewClientStatusComponent', () => {
  let component: ViewClientStatusComponent;
  let fixture: ComponentFixture<ViewClientStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewClientStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClientStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
