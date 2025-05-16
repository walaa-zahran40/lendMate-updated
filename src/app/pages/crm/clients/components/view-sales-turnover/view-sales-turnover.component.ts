import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, Observable, combineLatest, map, takeUntil, filter, tap } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Officer } from '../../../../../shared/interfaces/officer.interface';
import { ClientSalesTurnover } from '../../store/client-sales-turnovers/client-sales-turnovers.model';
import { ClientSalesTurnoversFacade } from '../../store/client-sales-turnovers/client-sales-turnovers.facade';



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
    { field: 'date', header: 'Start Date' }
  ];

  showDeleteModal = false;
  selectedClientSalesTurnoverId: number | null = null;
  originalClientSalesTurnovers: ClientSalesTurnover[] = [];
  filteredClientSalesTurnovers: ClientSalesTurnover[] = [];

  clientSalesTurnovers$!: Observable<ClientSalesTurnover[]>;

  constructor(
    private router: Router,
    private facade: ClientSalesTurnoversFacade,
    private route: ActivatedRoute,
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
        map((list) =>
          list
         
        )
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
   const routeId=this.route.snapshot.paramMap.get('clientId')
    this.router.navigate(
      ['crm/clients/add-sales-turnover', routeId],
      {
        queryParams: {
          mode: 'add',
          clientId: this.clientIdParam, // <-- use "clientId" here
        },
      }
    );
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
    this.selectedClientSalesTurnoverId = clientSalesTurnoverId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.selectedClientSalesTurnoverId != null) {
      this.facade.delete(this.selectedClientSalesTurnoverId, this.clientIdParam);
    }
    this.resetDeleteModal();
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
    this.filteredClientSalesTurnovers = this.originalClientSalesTurnovers.filter(
      (clientSales) =>
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
    this.router.navigate(
      ['crm/clients/edit-sales-turnover', clientSales.id],
      {
        queryParams: {
          mode: 'edit',
          clientId: this.clientIdParam, // <-- use "clientId" here
        },
      }
    );
  }

  onViewClientSalesTurnover(clientSales: ClientSalesTurnover) {
console.log('route',this.route.snapshot)
    this.router.navigate(
      ['crm/clients/edit-sales-turnover', clientSales.id],
      {
        queryParams: {
          mode: 'view',
          clientId: this.clientIdParam, // <-- and here
        },
      }
    );
  }
}
