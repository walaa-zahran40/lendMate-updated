import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOperationsComponent } from './page-operations.component';

describe('PageOperationsComponent', () => {
  let component: PageOperationsComponent;
  let fixture: ComponentFixture<PageOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageOperationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
