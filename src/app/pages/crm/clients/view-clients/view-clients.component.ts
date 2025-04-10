import { Component } from '@angular/core';
import { Client } from '../../../../shared/interfaces/client.interface';
import { Router } from '@angular/router';
import { ClientsFacade } from '../state/clients/clients.facade';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-view-clients',
  standalone: false,
  templateUrl: './view-clients.component.html',
  styleUrl: './view-clients.component.scss',
})
export class ViewClientsComponent {
  tableDataInside: Client[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  clients$ = this.facade.clients$;
  rows: number = 10;
  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'businessActivity', header: 'Business Activity' },
    { field: 'isIscore', header: 'Iscore' },
    { field: 'taxId', header: 'Tax ID' },
    { field: 'code', header: 'Client Code' },
    { field: 'clientTypeCode', header: 'Type Code' },
    { field: 'shortName', header: 'Short Name' },
    { field: 'isActive', header: 'Active' },
  ];

  constructor(private router: Router, private facade: ClientsFacade) {}

  ngOnInit() {
    this.facade.loadClients();
  }

  onAddClient() {
    this.router.navigate(['/crm/clients/add-client']);
  }
  onAddSide() {
    this.router.navigate(['/crm/clients/client-activity-wizard']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteClient(clientId: number): void {
    console.log('clientid', clientId);
    if (confirm('Are you sure you want to delete this client?')) {
      this.facade.deleteClient(clientId);
    }
  }
}
