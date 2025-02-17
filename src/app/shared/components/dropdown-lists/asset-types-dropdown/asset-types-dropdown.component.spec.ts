import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTypesDropdownComponent } from './asset-types-dropdown.component';

describe('AssetTypesDropdownComponent', () => {
  let component: AssetTypesDropdownComponent;
  let fixture: ComponentFixture<AssetTypesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetTypesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetTypesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
