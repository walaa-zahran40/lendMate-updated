import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrdropdownComponent } from './crdropdown.component';

describe('CrdropdownComponent', () => {
  let component: CrdropdownComponent;
  let fixture: ComponentFixture<CrdropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrdropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
