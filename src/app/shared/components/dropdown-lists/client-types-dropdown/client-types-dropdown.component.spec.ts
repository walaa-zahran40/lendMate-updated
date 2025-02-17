import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTypesDropdownComponent } from './client-types-dropdown.component';

describe('ClientTypesDropdownComponent', () => {
  let component: ClientTypesDropdownComponent;
  let fixture: ComponentFixture<ClientTypesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientTypesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientTypesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
