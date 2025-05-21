import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  confirmLeave,
  confirmLeave2,
} from '../../../pages/crm/clients/store/client-form/client-form.actions';

@Component({
  selector: 'app-toolbar-form',
  standalone: false,
  templateUrl: './toolbar-form.component.html',
  styleUrl: './toolbar-form.component.scss',
})
export class ToolbarFormComponent {
  items!: MenuItem[];
  @Input() header!: string | boolean;
  @Input() backExists!: boolean;
  @Input() viewOnly!: boolean;
  @Input() backIcon!: string;
  @Input() closeIcon!: string;
  @Input() closeExists!: boolean;
  @Input() close2Exists!: boolean;
  constructor(
    private location: Location,
    private router: Router,
    private store: Store
  ) {}
  ngOnInit() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
      },
    ];
  }
  goBack() {
    this.location.back();
  }

  onCloseClick() {
    this.store.dispatch(confirmLeave());
  }
  onClose2Click() {
    this.store.dispatch(confirmLeave2());
  }
}
