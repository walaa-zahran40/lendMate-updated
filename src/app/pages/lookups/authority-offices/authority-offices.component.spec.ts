import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorityOfficesComponent } from './authority-offices.component';

describe('AuthorityOfficesComponent', () => {
  let component: AuthorityOfficesComponent;
  let fixture: ComponentFixture<AuthorityOfficesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorityOfficesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorityOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
