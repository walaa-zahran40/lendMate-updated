import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleClaimsComponent } from './role-claims.component';

describe('RoleClaimsComponent', () => {
  let component: RoleClaimsComponent;
  let fixture: ComponentFixture<RoleClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoleClaimsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
