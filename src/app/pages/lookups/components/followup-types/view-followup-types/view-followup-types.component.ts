import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, filter, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { FollowupTypesFacade } from '../../../store/followup-types/followup-types.facade';
import { FollowupType } from '../../../store/followup-types/folllowup-type.model';

@Component({
  selector: 'app-view-followup-types',
  standalone: false,
  templateUrl: './view-followup-types.component.html',
  styleUrl: './view-followup-types.component.scss',
})
export class ViewFollowUpTypesComponent {
  tableDataInside: FollowupType[] = [];
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
  selectedFollowupTypeId: number | null = null;
  originalFollowupTypes: FollowupType[] = [];
  filteredFollowupTypes: FollowupType[] = [];
  followupTypes$!: Observable<FollowupType[]>;

  constructor(private router: Router, private facade: FollowupTypesFacade) {}
  ngOnInit() {
    this.facade.loadHistory();
    this.facade.operationSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((op) => op?.entity === 'FollowupType')
      )
      .subscribe(() => this.facade.loadHistory());
    this.followupTypes$ = this.facade.history$;

    this.followupTypes$
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe((followup) => {
        const sorted = [...followup].sort((a, b) => b?.id - a?.id);
        this.originalFollowupTypes = sorted;
        this.filteredFollowupTypes = [...sorted];
      });
  }

  onAddFollowupType() {
    this.router.navigate(['/lookups/add-followup-types']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteFollowupType(followupTypeId: any): void {
    console.log(
      '[View] onDeleteFollowupType() – opening modal for id=',
      followupTypeId
    );
    this.selectedFollowupTypeId = followupTypeId;
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
    this.followupTypes$ = this.facade.all$;
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
    this.selectedFollowupTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredFollowupTypes = this.originalFollowupTypes.filter(
      (followupType) =>
        Object.values(followupType).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditFollowupType(followupType: FollowupType) {
    this.router.navigate(['/lookups/edit-followup-types', followupType.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewFollowupType(ct: FollowupType) {
    this.router.navigate(['/lookups/edit-followup-types', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
