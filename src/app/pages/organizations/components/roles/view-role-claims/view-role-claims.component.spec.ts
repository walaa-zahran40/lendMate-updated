import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRoleClaimsComponent } from './view-role-claims.component';

describe('ViewRoleClaimsComponent', () => {
  let component: ViewRoleClaimsComponent;
  let fixture: ComponentFixture<ViewRoleClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewRoleClaimsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRoleClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
