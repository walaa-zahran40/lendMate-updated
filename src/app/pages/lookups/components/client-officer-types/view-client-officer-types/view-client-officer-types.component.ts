import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { ClientOfficerType } from '../../../store/client-officer-types/client-officer-type.model';
import { ClientOfficerTypesFacade } from '../../../store/client-officer-types/client-officer-types.facade';

@Component({
  selector: 'app-view-client-officer-types',
  standalone: false,
  templateUrl: './view-client-officer-types.component.html',
  styleUrl: './view-client-officer-types.component.scss',
})
export class ViewClientOfficerTypesComponent {
  tableDataInside: ClientOfficerType[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedClientOfficerTypeId: number | null = null;
  originalClientOfficerTypes: ClientOfficerType[] = [];
  filteredClientOfficerTypes: ClientOfficerType[] = [];
  clientOfficerTypes$!: Observable<ClientOfficerType[]>;

  constructor(
    private router: Router,
    private facade: ClientOfficerTypesFacade
  ) {}
  ngOnInit() {
    this.facade.loadHistory();
    this.clientOfficerTypes$ = this.facade.history$;

    this.clientOfficerTypes$
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe((call) => {
        const sorted = [...call].sort((a, b) => b?.id - a?.id);
        this.originalClientOfficerTypes = sorted;
        this.filteredClientOfficerTypes = [...sorted];
      });
  }

  onAddClientOfficerType() {
    console.log('🔍 [Component] onAddClientOfficerType');
    this.router.navigate(['/lookups/add-client-officer-types']);
  }

  ngOnDestroy() {
    console.log('🔍 [Component] ngOnDestroy - cleaning up');
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteClientOfficerTypeId(clientOfficerTypeId: any): void {
    console.log(
      '[View] onDeleteClientOfficerType() – opening modal for id=',
      clientOfficerTypeId
    );
    this.selectedIds = [clientOfficerTypeId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedClientOfficerTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredClientOfficerTypes = this.originalClientOfficerTypes.filter(
      (clientOfficerType) =>
        Object.values(clientOfficerType).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditClientOfficerType(clientOfficerType: ClientOfficerType) {
    this.router.navigate(
      ['/lookups/edit-client-officer-types', clientOfficerType.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewClientOfficerType(ct: ClientOfficerType) {
    this.router.navigate(['/lookups/edit-client-officer-types', ct.id], {
      queryParams: { mode: 'view' },
    });
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
    this.clientOfficerTypes$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
