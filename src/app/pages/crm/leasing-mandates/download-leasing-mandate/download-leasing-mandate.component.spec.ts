import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadLeasingMandateComponent } from './download-leasing-mandate.component';

describe('DownloadLeasingMandateComponent', () => {
  let component: DownloadLeasingMandateComponent;
  let fixture: ComponentFixture<DownloadLeasingMandateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadLeasingMandateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadLeasingMandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
