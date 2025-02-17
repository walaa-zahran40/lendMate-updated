import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientIdentitiesDropdownComponent } from './client-identities-dropdown.component';

describe('ClientIdentitiesDropdownComponent', () => {
  let component: ClientIdentitiesDropdownComponent;
  let fixture: ComponentFixture<ClientIdentitiesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientIdentitiesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientIdentitiesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
