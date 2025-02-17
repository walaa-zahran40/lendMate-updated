import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchAddressesComponent } from './branch-addresses.component';

describe('BranchAddressesComponent', () => {
  let component: BranchAddressesComponent;
  let fixture: ComponentFixture<BranchAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchAddressesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
