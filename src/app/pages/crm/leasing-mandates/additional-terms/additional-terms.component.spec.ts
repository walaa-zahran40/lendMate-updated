import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalTermsComponent } from './additional-terms.component';

describe('AdditionalTermsComponent', () => {
  let component: AdditionalTermsComponent;
  let fixture: ComponentFixture<AdditionalTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionalTermsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
