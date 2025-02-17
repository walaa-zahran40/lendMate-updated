import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTypeCategoriesDropdownComponent } from './asset-type-categories-dropdown.component';

describe('AssetTypeCategoriesDropdownComponent', () => {
  let component: AssetTypeCategoriesDropdownComponent;
  let fixture: ComponentFixture<AssetTypeCategoriesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetTypeCategoriesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetTypeCategoriesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
