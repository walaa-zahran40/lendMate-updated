import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil } from 'rxjs';
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
  ];
  showDeleteModal: boolean = false;
  selectedClientOfficerTypeId: number | null = null;
  originalClientOfficerTypes: ClientOfficerType[] = [];
  filteredClientOfficerTypes: ClientOfficerType[] = [];
  clientOfficerTypes$!: Observable<ClientOfficerType[]>;

  constructor(private router: Router, private facade: ClientOfficerTypesFacade) {}
  ngOnInit() {
    this.facade.loadAll();
    this.clientOfficerTypes$ = this.facade.all$;

    this.clientOfficerTypes$?.pipe(takeUntil(this.destroy$))?.subscribe((call) => {
      // clientOfficerTypes is now clientOfficerTypes[], not any
      const activeCodes = call.filter((code) => code.isActive);
      const sorted = [...activeCodes].sort((a, b) => b?.id - a?.id);
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
    this.selectedClientOfficerTypeId = clientOfficerTypeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedClientOfficerTypeId
    );
    if (this.selectedClientOfficerTypeId !== null) {
      this.facade.delete(this.selectedClientOfficerTypeId);
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
}
