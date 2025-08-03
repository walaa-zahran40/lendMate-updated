import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchasingOrderComponent } from './add-purchasing-order.component';

describe('AddPurchasingOrderComponent', () => {
  let component: AddPurchasingOrderComponent;
  let fixture: ComponentFixture<AddPurchasingOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPurchasingOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPurchasingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
