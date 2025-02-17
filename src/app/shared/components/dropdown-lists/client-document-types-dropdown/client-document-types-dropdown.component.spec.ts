import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDocumentTypesDropdownComponent } from './client-document-types-dropdown.component';

describe('ClientDocumentTypesDropdownComponent', () => {
  let component: ClientDocumentTypesDropdownComponent;
  let fixture: ComponentFixture<ClientDocumentTypesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientDocumentTypesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDocumentTypesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
