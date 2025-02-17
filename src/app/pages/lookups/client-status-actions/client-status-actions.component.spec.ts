import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientStatusActionsComponent } from './client-status-actions.component';

describe('ClientStatusActionsComponent', () => {
  let component: ClientStatusActionsComponent;
  let fixture: ComponentFixture<ClientStatusActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientStatusActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientStatusActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
