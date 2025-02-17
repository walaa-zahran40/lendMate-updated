import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeClientCodeComponent } from './sme-client-code.component';

describe('SmeClientCodeComponent', () => {
  let component: SmeClientCodeComponent;
  let fixture: ComponentFixture<SmeClientCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmeClientCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmeClientCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
