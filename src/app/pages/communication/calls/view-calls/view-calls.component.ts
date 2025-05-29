import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, filter, combineLatest } from 'rxjs';
import { Call } from '../../store/calls/call.model';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CallsFacade } from '../../store/calls/calls.facade';
import { Client } from '../../../crm/clients/store/_clients/allclients/client.model';
import { ClientsFacade } from '../../../crm/clients/store/_clients/allclients/clients.facade';
import { CallType } from '../../../lookups/store/call-types/call-type.model';
import { CallTypesFacade } from '../../../lookups/store/call-types/call-types.facade';


@Component({
  selector: 'app-view-calls',
  standalone: false,
  templateUrl: './view-calls.component.html',
  styleUrl: './view-calls.component.scss',
})
export class ViewCallsComponent {
  tableDataInside: Call[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'topic', header: 'Topic' },
    { field: 'clientName', header: 'client' },
    { field: 'callTypeName', header: 'callType' },
    { field: 'date', header: 'Date' },
  ];
  showDeleteModal: boolean = false;
  selectedCallId: number | null = null;
  originalCalls: Call[] = [];
  filteredCalls: Call[] = [];
  calls$!: Observable<Call[]>;

  clients!: Observable<Client[]>;
  callTypes!: Observable<CallType[]>;

  constructor(
    private router: Router,
     private facade: CallsFacade,
     private clientsFacade: ClientsFacade,
     private callTypesFacade: CallTypesFacade
    ) {}
  ngOnInit() {

     this.facade.loadAll(); 
    this.calls$ = this.facade.all$; 

    this.clientsFacade.loadAll(); 
    this.clients = this.clientsFacade.all$; 

    this.callTypesFacade.loadAll(); 
    this.callTypes = this.callTypesFacade.all$; 

  combineLatest([this.calls$, this.clients, this.callTypes])
  .pipe(takeUntil(this.destroy$))
  .subscribe(([calls, clients, callTypes]) => {
    const enriched: Call[] = calls.map(call => {
      const client = clients.find(c => c.id === call.communication?.clientId);
      const callType = callTypes.find(ct => ct.id === call.callTypeId);
      return {
        ...call,
        clientName: client?.name || 'N/A',
        callTypeName: callType?.name || 'N/A',
        topic : call.communication?.topic
      };
    });

    const sorted = enriched.sort((a, b) => b.id - a.id);
    this.originalCalls = sorted;
    this.filteredCalls = [...sorted];
    });
  }

  onAddCall() {
    this.router.navigate(['/communication/add-calls']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteCall(callId: any): void {
    console.log(
      '[View] onDeleteCall() – opening modal for id=',
      callId
    );
    this.selectedCallId = callId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedCallId
    );
    if (this.selectedCallId !== null) {
      this.facade.delete(this.selectedCallId);
      console.log('[View] confirmDelete() – facade.delete() called');
    } else {
      console.warn('[View] confirmDelete() – no id to delete');
    }
    this.resetDeleteModal();
  }
  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedCallId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredCalls = this.originalCalls.filter(
      (call) =>
        Object.values(call).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditCall(call: Call) {
    this.router.navigate(['/communication/edit-calls', call.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewCall(ct: Call) {
    this.router.navigate(['/communication/edit-calls', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
