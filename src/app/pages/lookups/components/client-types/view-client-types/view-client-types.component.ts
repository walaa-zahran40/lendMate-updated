import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { ClientType } from '../../../store/client-types/client-type.model';
import { ClientTypesFacade } from '../../../store/client-types/client-types.facade';

@Component({
  selector: 'app-view-client-types',
  standalone: false,
  templateUrl: './view-client-types.component.html',
  styleUrl: './view-client-types.component.scss',
})
export class ViewClientTypesComponent {
  tableDataInside: ClientType[] = [];
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
  selectedClientTypeId: number | null = null;
  originalClientTypes: ClientType[] = [];
  filteredClientTypes: ClientType[] = [];
  clientTypes$!: Observable<ClientType[]>;

  constructor(private router: Router, private facade: ClientTypesFacade) {}
  ngOnInit() {
    this.facade.loadHistory();
    this.clientTypes$ = this.facade.history$;

    this.clientTypes$
      ?.pipe(takeUntil(this.destroy$))
      .subscribe((clientTypes) => {
        const sorted = [...clientTypes].sort((a, b) => b.id - a.id);
        this.originalClientTypes = sorted;
        this.filteredClientTypes = [...sorted];
      });
  }

  onAddClientType() {
    console.log('🔍 [Component] onAddClientType');
    this.router.navigate(['/lookups/add-client-types']);
  }

  ngOnDestroy() {
    console.log('🔍 [Component] ngOnDestroy - cleaning up');
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteClientTypeId(clientTypeId: any): void {
    console.log(
      '[View] onDeleteClientType() – opening modal for id=',
      clientTypeId
    );
    this.selectedClientTypeId = clientTypeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedClientTypeId
    );
    if (this.selectedClientTypeId !== null) {
      this.facade.delete(this.selectedClientTypeId);
      console.log('[View] confirmDelete() – facade.delete()');
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
    this.selectedClientTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredClientTypes = this.originalClientTypes.filter((clientType) =>
      Object.values(clientType).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditClientType(clientType: ClientType) {
    this.router.navigate(['/lookups/edit-client-types', clientType.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewClientType(ct: ClientType) {
    this.router.navigate(['/lookups/edit-client-types', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
