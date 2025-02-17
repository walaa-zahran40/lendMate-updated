import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTypeCategoriesComponent } from './asset-type-categories.component';

describe('AssetTypeCategoriesComponent', () => {
  let component: AssetTypeCategoriesComponent;
  let fixture: ComponentFixture<AssetTypeCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetTypeCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetTypeCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
