import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, combineLatest, map } from 'rxjs';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TaxOfficesFacade } from '../../store/tax_offices/tax_offices.facade';
import { TaxOffice } from '../../store/tax_offices/tax_office.model';
import { Governorate } from '../../store/governorates/governorate.model';
import { Store } from '@ngrx/store';
import { selectAllGovernorates } from '../../store/governorates/governorates.selectors';

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
    this.taxOffices$ = this.facade.all$;
    this.governoratesList$ = this.store.select(selectAllGovernorates); // Add this line
    this.facade.loadAll();
    this.store.dispatch({ type: '[Governorates] Load All' });

    combineLatest([this.taxOffices$, this.governoratesList$])
      .pipe(
        map(([taxOffices, governorates]) =>
          taxOffices
            .map((ss) => ({
              ...ss,
              governorateName:
                governorates.find((s) => s.id === ss.governorateId)?.name ||
                '—',
            }))
            .sort((a, b) => b.id - a.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((normalizedSubSectors) => {
        this.filteredTaxOffices = normalizedSubSectors;
        this.originalTaxOffices = normalizedSubSectors;
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
    this.selectedTaxOfficeId = taxOfficeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedTaxOfficeId
    );
    if (this.selectedTaxOfficeId !== null) {
      this.facade.delete(this.selectedTaxOfficeId);
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
