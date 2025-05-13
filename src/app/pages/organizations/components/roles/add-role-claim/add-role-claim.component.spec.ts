import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleClaimComponent } from './add-role-claim.component';

describe('AddRoleClaimComponent', () => {
  let component: AddRoleClaimComponent;
  let fixture: ComponentFixture<AddRoleClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRoleClaimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoleClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
