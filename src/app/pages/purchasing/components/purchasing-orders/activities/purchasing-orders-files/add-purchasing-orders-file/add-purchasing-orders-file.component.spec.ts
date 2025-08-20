import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchasingOrdersFileComponent } from './add-purchasing-orders-file.component';

describe('AddPurchasingOrdersFileComponent', () => {
  let component: AddPurchasingOrdersFileComponent;
  let fixture: ComponentFixture<AddPurchasingOrdersFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPurchasingOrdersFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPurchasingOrdersFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
