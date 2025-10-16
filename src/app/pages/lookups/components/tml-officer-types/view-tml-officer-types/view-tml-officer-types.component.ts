import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { TmlOfficerType } from '../../../store/tml-officer-types/tml-officer-type.model';
import { TmlOfficerTypesFacade } from '../../../store/tml-officer-types/tml-officer-types.facade';

@Component({
  selector: 'app-view-tml-officer-types',
  standalone: false,
  templateUrl: './view-tml-officer-types.component.html',
  styleUrl: './view-tml-officer-types.component.scss',
})
export class ViewTmlOfficerTypesComponent {
  tableDataInside: TmlOfficerType[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'isActive', header: 'Is Active' },
    { field: 'isDefault', header: 'Is Default' },
  ];
  showDeleteModal: boolean = false;
  selectedTmlOfficerTypeId: number | null = null;
  originalTmlOfficerType: TmlOfficerType[] = [];
  filteredTmlOfficerType: TmlOfficerType[] = [];
  TmlOfficerTypes$!: Observable<TmlOfficerType[]>;

  constructor(private router: Router, private facade: TmlOfficerTypesFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.TmlOfficerTypes$ = this.facade.history$ as Observable<
      TmlOfficerType[]
    >;
    this.facade.loadHistory();

    this.TmlOfficerTypes$.pipe(takeUntil(this.destroy$)).subscribe((list) => {
      this.originalTmlOfficerType = [...list].sort((a, b) => b.id - a.id);
      this.filteredTmlOfficerType = [...this.originalTmlOfficerType];
    });
  }

  onAddTmlOfficerType() {
    this.router.navigate(['/lookups/add-tml-officer-types']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteTmlOfficerType(TmlOfficerTypeId: any): void {
    console.log(
      '[View] onDeleteTmlOfficerType() – opening modal for id=',
      TmlOfficerTypeId
    );
    this.selectedIds = [TmlOfficerTypeId];
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
    this.TmlOfficerTypes$ = this.facade.all$;
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
    this.selectedTmlOfficerTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredTmlOfficerType = this.originalTmlOfficerType.filter(
      (TmlOfficerTypes) =>
        Object.values(TmlOfficerTypes).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditTmlOfficerType(TmlOfficerType: TmlOfficerType) {
    this.router.navigate(
      ['/lookups/edit-tml-officer-types', TmlOfficerType.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewTmlOfficerType(ct: TmlOfficerType) {
    this.router.navigate(['/lookups/edit-tml-officer-types', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
