import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { CommunicationType } from '../../../store/communication-types/communication-type.model';
import { CommunicationTypesFacade } from '../../../store/communication-types/communication-types.facade';

@Component({
  selector: 'app-view-communication-types',
  standalone: false,
  templateUrl: './view-communication-types.component.html',
  styleUrl: './view-communication-types.component.scss',
})
export class ViewCommunicationTypesComponent {
  tableDataInside: CommunicationType[] = [];
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
  selectedCommunicationTypeId: number | null = null;
  originalCommunicationTypes: CommunicationType[] = [];
  filteredCommunicationTypes: CommunicationType[] = [];
  communicationTypes$!: Observable<CommunicationType[]>;

  constructor(
    private router: Router,
    private facade: CommunicationTypesFacade
  ) {}
  ngOnInit() {
    this.facade.loadHistory();
    this.communicationTypes$ = this.facade.history$;

    this.communicationTypes$
      ?.pipe(takeUntil(this.destroy$))
      .subscribe((communicationTypes) => {
        const sorted = [...communicationTypes].sort((a, b) => b.id - a.id);
        this.originalCommunicationTypes = sorted;
        this.filteredCommunicationTypes = [...sorted];
      });
  }

  onAddCommunicationType() {
    console.log('🔍 [Component] onAddCommunicationType');
    this.router.navigate(['/lookups/add-communication-types']);
  }

  ngOnDestroy() {
    console.log('🔍 [Component] ngOnDestroy - cleaning up');
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteCommunicationTypeId(communicationTypeId: any): void {
    console.log(
      '[View] onDeleteCommunicationType() – opening modal for id=',
      communicationTypeId
    );
    this.selectedCommunicationTypeId = communicationTypeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedCommunicationTypeId
    );
    if (this.selectedCommunicationTypeId !== null) {
      this.facade.delete(this.selectedCommunicationTypeId);
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
    this.selectedCommunicationTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredCommunicationTypes = this.originalCommunicationTypes.filter(
      (communicationType) =>
        Object.values(communicationType).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditCommunicationType(communicationType: CommunicationType) {
    this.router.navigate(
      ['/lookups/edit-communication-types', communicationType.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewCommunicationType(ct: CommunicationType) {
    this.router.navigate(['/lookups/edit-communication-types', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
