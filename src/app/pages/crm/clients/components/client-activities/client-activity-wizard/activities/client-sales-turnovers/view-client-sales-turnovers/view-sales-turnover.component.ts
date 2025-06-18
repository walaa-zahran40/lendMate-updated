import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable, takeUntil, tap, map, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../../../../../shared/components/table/table.component';
import { ClientSalesTurnoversFacade } from '../../../../../../store/client-sales-turnovers/client-sales-turnovers.facade';
import { ClientSalesTurnover } from '../../../../../../store/client-sales-turnovers/client-sales-turnovers.model';

@Component({
  selector: 'app-view-sales-turnover',
  standalone: false,
  templateUrl: './view-sales-turnover.component.html',
  styleUrl: './view-sales-turnover.component.scss',
})
export class ViewSalesTurnoverComponent implements OnInit, OnDestroy {
  tableDataInside: ClientSalesTurnover[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();
  clientIdParam!: any;

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'amount', header: 'Amount' },
    { field: 'date', header: 'Start Date' },
  ];

  showDeleteModal = false;
  selectedClientSalesTurnoverId: number | null = null;
  originalClientSalesTurnovers: ClientSalesTurnover[] = [];
  filteredClientSalesTurnovers: ClientSalesTurnover[] = [];

  clientSalesTurnovers$!: Observable<ClientSalesTurnover[]>;

  constructor(
    private router: Router,
    private facade: ClientSalesTurnoversFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // 1) grab the param
    const raw = this.route.snapshot.paramMap.get('clientId');
    this.clientIdParam = raw !== null ? Number(raw) : undefined;
    console.log('[View] ngOnInit → clientIdParam =', this.clientIdParam);

    this.facade.loadByClientId(this.clientIdParam);
    this.clientSalesTurnovers$ = this.facade.items$;

    if (this.clientIdParam == null || isNaN(this.clientIdParam)) {
      console.error(
        '❌ Missing or invalid clientIdParam! Cannot load exchange rates.'
      );
      return;
    }

    this.clientSalesTurnovers$
      .pipe(
        takeUntil(this.destroy$),
        tap((list) => console.log('🧾 list before map:', list)),
        map((list) => list)
      )
      .subscribe((sales) => {
        console.log('📦 Raw sales data:', sales);

        const sorted = [...sales].sort((a, b) => b?.id - a?.id);
        this.originalClientSalesTurnovers = sorted;
        this.filteredClientSalesTurnovers = [...sorted];
        console.log('filtered', this.filteredClientSalesTurnovers);
      });
  }

  onAddClientSalesTurnover() {
    console.log('edioyt', this.clientIdParam);
    const routeId = this.route.snapshot.paramMap.get('clientId');
    this.router.navigate(['crm/clients/add-sales-turnover', routeId], {
      queryParams: {
        mode: 'add',
        clientId: this.clientIdParam, // <-- use "clientId" here
      },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteClientSalesTurnover(clientSalesTurnoverId: number): void {
    console.log(
      '[View] onDeleteClientSalesTurnover() – opening modal for id=',
      clientSalesTurnoverId
    );
    this.selectedIds = [clientSalesTurnoverId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedClientSalesTurnoverId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredClientSalesTurnovers =
      this.originalClientSalesTurnovers.filter((clientSales) =>
        Object.values(clientSales).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditClientSalesTurnover(clientSales: ClientSalesTurnover) {
    console.log('edioyt', this.clientIdParam);
    this.router.navigate(['crm/clients/edit-sales-turnover', clientSales.id], {
      queryParams: {
        mode: 'edit',
        clientId: this.clientIdParam, // <-- use "clientId" here
      },
    });
  }

  onViewClientSalesTurnover(clientSales: ClientSalesTurnover) {
    console.log('route', this.route.snapshot);
    this.router.navigate(['crm/clients/edit-sales-turnover', clientSales.id], {
      queryParams: {
        mode: 'view',
        clientId: this.clientIdParam, // <-- and here
      },
    });
  }
  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) =>
      this.facade.delete(id, this.clientIdParam)
    );

    forkJoin(deleteCalls).subscribe({
      next: () => {
        this.selectedIds = [];
        this.showDeleteModal = false; // CLOSE MODAL HERE
        this.refreshCalls();
      },
      error: (err) => {
        this.showDeleteModal = false; // STILL CLOSE IT
      },
    });
  }

  refreshCalls() {
    this.facade.loadAll();
    this.clientSalesTurnovers$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
