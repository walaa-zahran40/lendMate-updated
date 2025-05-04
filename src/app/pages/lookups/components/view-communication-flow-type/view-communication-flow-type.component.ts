import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CommunicationFlowType } from '../../store/communication-flow-types/communication-flow-type.model';
import { CommunicationFlowTypesFacade } from '../../store/communication-flow-types/communication-flow-types.facade';

@Component({
  selector: 'app-view-communication-flow-type',
  standalone: false,
  templateUrl: './view-communication-flow-type.component.html',
  styleUrl: './view-communication-flow-type.component.scss',
})
export class ViewCommunicationFlowTypeComponent {
  tableDataInside: CommunicationFlowType[] = [];
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
  selectedCommunicationFlowTypeId: number | null = null;
  originalCommunicationFlowTypes: CommunicationFlowType[] = [];
  filteredCommunicationFlowTypes: CommunicationFlowType[] = [];
  communicationFlowTypes$!: Observable<CommunicationFlowType[]>;

  constructor(
    private router: Router,
    private facade: CommunicationFlowTypesFacade
  ) {}
  ngOnInit() {
    this.facade.loadAll();
    this.communicationFlowTypes$ = this.facade.all$;

    this.communicationFlowTypes$
      ?.pipe(takeUntil(this.destroy$))
      .subscribe((communicationFlowTypes) => {
        // communicationFlowTypes is now communicationFlowType[], not any
        const sorted = [...communicationFlowTypes].sort((a, b) => b.id - a.id);
        this.originalCommunicationFlowTypes = sorted;
        this.filteredCommunicationFlowTypes = [...sorted];
      });
  }

  onAddCommunicationFlowType() {
    console.log('🔍 [Component] onAddCommunicationFlowType');
    this.router.navigate(['/lookups/add-communication-flow-types']);
  }

  ngOnDestroy() {
    console.log('🔍 [Component] ngOnDestroy - cleaning up');
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteCommunicationFlowTypeId(communicationFlowTypeId: any): void {
    console.log(
      '[View] onDeleteCommunicationFlowType() – opening modal for id=',
      communicationFlowTypeId
    );
    this.selectedCommunicationFlowTypeId = communicationFlowTypeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedCommunicationFlowTypeId
    );
    if (this.selectedCommunicationFlowTypeId !== null) {
      this.facade.delete(this.selectedCommunicationFlowTypeId);
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
    this.selectedCommunicationFlowTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredCommunicationFlowTypes =
      this.originalCommunicationFlowTypes.filter((communicationFlowType) =>
        Object.values(communicationFlowType).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditCommunicationFlowType(communicationFlowType: CommunicationFlowType) {
    this.router.navigate(
      ['/lookups/edit-communication-flow-types', communicationFlowType.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewCommunicationFlowType(ct: CommunicationFlowType) {
    this.router.navigate(['/lookups/edit-communication-flow-types', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
