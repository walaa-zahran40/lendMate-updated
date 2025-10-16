import { Component, ViewChild } from '@angular/core';
import { Observable, Subject, takeUntil, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Currency } from '../../../store/currencies/currency.model';
import { CurrenciesFacade } from '../../../store/currencies/currencies.facade';

@Component({
  selector: 'app-view-currencies',
  standalone: false,
  templateUrl: './view-currencies.component.html',
  styleUrl: './view-currencies.component.scss',
})
export class ViewCurrenciesComponent {
  tableDataInside: Currency[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'iso', header: 'ISO' },
    { field: 'isDefault', header: 'Is Default' },
    { field: 'isActive', header: 'Is Active' },
  ];

  showDeleteModal = false;
  selectedCurrencyId: number | null = null;
  originalCurrencies: Currency[] = [];
  filteredCurrencies: Currency[] = [];
  currencies$!: Observable<Currency[]>;

  constructor(private router: Router, private facade: CurrenciesFacade) {}

  ngOnInit() {
    console.log('🟢 ngOnInit: start loading currencies');
    this.currencies$ = this.facade.history$;
    this.facade.loadHistory();

    this.currencies$.pipe(takeUntil(this.destroy$)).subscribe((currencies) => {
      const sorted = [...currencies].sort((a, b) => b?.id - a?.id);
      this.originalCurrencies = sorted;
      this.filteredCurrencies = [...sorted];
    });
  }

  onAddCurrency() {
    this.router.navigate(['/lookups/add-currencies']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteCurrency(currencyId: number): void {
    console.log(
      '[View] onDeleteCurrency() – opening modal for id=',
      currencyId
    );
    this.selectedIds = [currencyId];
    this.showDeleteModal = true;
  }

  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) => this.facade.delete(id));

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
    this.currencies$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedCurrencyId = null;
  }
  onAddSide(currencyId: any) {
    this.router.navigate(['/lookups/wizard-currencies', currencyId]);
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredCurrencies = this.originalCurrencies.filter((currency) =>
      Object.values(currency).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditCurrency(currency: Currency) {
    this.router.navigate(['/lookups/edit-currencies', currency.id], {
      queryParams: { mode: 'edit' },
    });
  }

  onViewCurrency(currency: Currency) {
    this.router.navigate(['/lookups/edit-currencies', currency.id], {
      queryParams: { mode: 'view' },
    });
  }
}
