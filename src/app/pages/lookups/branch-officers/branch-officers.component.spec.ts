import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOfficersComponent } from './branch-officers.component';

describe('BranchOfficersComponent', () => {
  let component: BranchOfficersComponent;
  let fixture: ComponentFixture<BranchOfficersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchOfficersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
