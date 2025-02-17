import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientStatusesComponent } from './client-statuses.component';

describe('ClientStatusesComponent', () => {
  let component: ClientStatusesComponent;
  let fixture: ComponentFixture<ClientStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientStatusesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
