import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { MeetingType } from '../../../store/meeting-types/meeting-type.model';
import { MeetingTypesFacade } from '../../../store/meeting-types/meeting-types.facade';

@Component({
  selector: 'app-view-meeting-types',
  standalone: false,
  templateUrl: './view-meeting-types.component.html',
  styleUrl: './view-meeting-types.component.scss',
})
export class ViewMeetingTypesComponent {
  tableDataInside: MeetingType[] = [];
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
  selectedMeetingTypeId: number | null = null;
  originalMeetingType: MeetingType[] = [];
  filteredMeetingType: MeetingType[] = [];
  MeetingTypes$!: Observable<MeetingType[]>;

  constructor(private router: Router, private facade: MeetingTypesFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.MeetingTypes$ = this.facade.history$;
    console.log('🟢 before loadHistory, current store value:');
    this.MeetingTypes$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadHistory() to fetch MeetingTypes');
    this.facade.loadHistory();

    this.MeetingTypes$?.pipe(takeUntil(this.destroy$))?.subscribe((meeting) => {
      // products is now meeting[], not any
      const sorted = [...meeting].sort((a, b) => b?.id - a?.id);
      this.originalMeetingType = sorted;
      this.filteredMeetingType = [...sorted];
    });
  }

  onAddMeetingType() {
    this.router.navigate(['/lookups/add-meeting-types']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteMeetingType(MeetingTypeId: any): void {
    console.log(
      '[View] onDeleteMeetingType() – opening modal for id=',
      MeetingTypeId
    );
    this.selectedIds = [MeetingTypeId];
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
    this.MeetingTypes$ = this.facade.all$;
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
    this.selectedMeetingTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredMeetingType = this.originalMeetingType.filter((MeetingTypes) =>
      Object.values(MeetingTypes).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditMeetingType(MeetingType: MeetingType) {
    this.router.navigate(['/lookups/edit-meeting-types', MeetingType.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewMeetingType(ct: MeetingType) {
    this.router.navigate(['/lookups/edit-meeting-types', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
