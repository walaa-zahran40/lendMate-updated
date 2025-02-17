import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientStatusesDropdownComponent } from './client-statuses-dropdown.component';

describe('ClientStatusesDropdownComponent', () => {
  let component: ClientStatusesDropdownComponent;
  let fixture: ComponentFixture<ClientStatusesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientStatusesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientStatusesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
