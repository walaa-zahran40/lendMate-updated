import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrAuthorityOfficeComponent } from './cr-authority-office.component';

describe('CrAuthorityOfficeComponent', () => {
  let component: CrAuthorityOfficeComponent;
  let fixture: ComponentFixture<CrAuthorityOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrAuthorityOfficeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrAuthorityOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
