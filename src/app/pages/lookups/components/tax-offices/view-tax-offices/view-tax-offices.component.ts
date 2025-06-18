import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  Subject,
  Observable,
  takeUntil,
  combineLatest,
  map,
  filter,
  forkJoin,
} from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { TaxOfficesFacade } from '../../../store/tax_offices/tax_offices.facade';
import { TaxOffice } from '../../../store/tax_offices/tax_office.model';
import { Governorate } from '../../../store/governorates/governorate.model';
import { Store } from '@ngrx/store';
import { selectAllGovernorates } from '../../../store/governorates/governorates.selectors';

@Component({
  selector: 'app-view-tax-offices',
  standalone: false,
  templateUrl: './view-tax-offices.component.html',
  styleUrl: './view-tax-offices.component.scss',
})
export class ViewTaxOfficesComponent {
  tableDataInside: TaxOffice[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'governorateName', header: 'Governorate Name' },
    { field: 'address', header: 'Address' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedTaxOfficeId: number | null = null;
  originalTaxOffices: TaxOffice[] = [];
  filteredTaxOffices: TaxOffice[] = [];
  taxOffices$!: Observable<TaxOffice[]>;
  governoratesList$!: Observable<Governorate[]>;

  constructor(
    private router: Router,
    private facade: TaxOfficesFacade,
    private store: Store
  ) {}
  ngOnInit() {
    // 1️⃣ grab both streams
    this.taxOffices$ = this.facade.history$;
    this.governoratesList$ = this.store.select(selectAllGovernorates);

    // 2️⃣ kick off the loads
    this.facade.loadHistory();
    this.store.dispatch({ type: '[Governorates] Load All' });

    // 3️⃣ combine, enrich, sort, and subscribe
    combineLatest([this.taxOffices$, this.governoratesList$])
      .pipe(
        // only proceed when both have emitted at least once
        filter(([tos, govs]) => tos.length > 0 && govs.length > 0),
        map(
          ([taxOffices, governorates]) =>
            taxOffices
              .map((to) => ({
                ...to,
                governorateName:
                  governorates.find((g) => g.id === to.governorateId)?.name ||
                  '—',
              }))
              .sort((a, b) => b.id - a.id) // newest first
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((enrichedAndSorted) => {
        this.originalTaxOffices = enrichedAndSorted;
        this.filteredTaxOffices = [...enrichedAndSorted];
      });
  }

  onAddTaxOffice() {
    this.router.navigate(['/lookups/add-tax-offices']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteTaxOffice(taxOfficeId: any): void {
    console.log(
      '[View] onDeleteTaxOffice() – opening modal for id=',
      taxOfficeId
    );
    this.selectedIds = [taxOfficeId];
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
    this.taxOffices$ = this.facade.all$;
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
    this.selectedTaxOfficeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredTaxOffices = this.originalTaxOffices.filter((taxOffice) =>
      Object.values(taxOffice).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditTaxOffice(taxOffice: TaxOffice) {
    this.router.navigate(['/lookups/edit-tax-offices', taxOffice.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewTaxOffice(ct: TaxOffice) {
    this.router.navigate(['/lookups/edit-tax-offices', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
