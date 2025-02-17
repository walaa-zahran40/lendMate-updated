import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernoratesComponent } from './governorates.component';

describe('GovernoratesComponent', () => {
  let component: GovernoratesComponent;
  let fixture: ComponentFixture<GovernoratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GovernoratesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovernoratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
