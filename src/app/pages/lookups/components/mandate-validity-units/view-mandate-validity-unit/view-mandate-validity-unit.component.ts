import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { MandateValidityUnitsFacade } from '../../../store/mandate-validity-units/mandate-validity-units.facade';
import { MandateValidityUnit } from '../../../store/mandate-validity-units/mandate-validity-unit.model';

@Component({
  selector: 'app-view-mandate-validity-unit',
  standalone: false,
  templateUrl: './view-mandate-validity-unit.component.html',
  styleUrl: './view-mandate-validity-unit.component.scss',
})
export class ViewMandateValidityUnitComponent {
  tableDataInside: MandateValidityUnit[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'validationMinValue', header: 'Validation Min Value' },
    { field: 'validationMaxValue', header: 'Validation Max Value' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedMandateValidityUnitId: number | null = null;
  originalMandateValidityUnits: MandateValidityUnit[] = [];
  filteredMandateValidityUnits: MandateValidityUnit[] = [];
  mandateValidityUnits$!: Observable<MandateValidityUnit[]>;

  constructor(
    private router: Router,
    private facade: MandateValidityUnitsFacade
  ) {}
  ngOnInit() {
    this.facade.loadHistory();
    this.mandateValidityUnits$ = this.facade.history$;

    this.mandateValidityUnits$
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe((mandate) => {
        // products is now rentStructureType[], not any
        const sorted = [...mandate].sort((a, b) => b?.id - a?.id);
        this.originalMandateValidityUnits = sorted;
        this.filteredMandateValidityUnits = [...sorted];
      });
  }

  onAddMandateValidityUnit() {
    this.router.navigate(['/lookups/add-mandate-validity-unit']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteMandateValidityUnit(mandateValidityUnitId: any): void {
    console.log(
      '[View] onDeleteMandateValidityUnit() – opening modal for id=',
      mandateValidityUnitId
    );
    this.selectedMandateValidityUnitId = mandateValidityUnitId;
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
    this.mandateValidityUnits$ = this.facade.all$;
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
    this.selectedMandateValidityUnitId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredMandateValidityUnits =
      this.originalMandateValidityUnits.filter((mandateValidityUnit) =>
        Object.values(mandateValidityUnit).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditMandateValidityUnit(mandateValidityUnit: MandateValidityUnit) {
    this.router.navigate(
      ['/lookups/edit-mandate-validity-unit', mandateValidityUnit.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewMandateValidityUnit(ct: MandateValidityUnit) {
    this.router.navigate(['/lookups/edit-mandate-validity-unit', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
