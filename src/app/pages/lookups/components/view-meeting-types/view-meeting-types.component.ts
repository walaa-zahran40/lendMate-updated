import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { MeetingType } from '../../store/meeting-types/meeting-type.model';
import { MeetingTypesFacade } from '../../store/meeting-types/meeting-types.facade';

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
  ];
  showDeleteModal: boolean = false;
  selectedMeetingTypeId: number | null = null;
  originalMeetingType: MeetingType[] = [];
  filteredMeetingType: MeetingType[] = [];
  MeetingTypes$!: Observable<MeetingType[]>;

  constructor(private router: Router, private facade: MeetingTypesFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.MeetingTypes$ = this.facade.all$;
    console.log('🟢 before loadAll, current store value:');
    this.MeetingTypes$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadAll() to fetch MeetingTypes');
    this.facade.loadAll();

    this.MeetingTypes$?.pipe(takeUntil(this.destroy$)).subscribe(
      (MeetingTypes) => {
        console.log('🟢 subscribe: received MeetingTypes array:', MeetingTypes);

        // preserve immutability, then sort by id descending
        const sorted = [...MeetingTypes].sort((a, b) => b.id - a.id);
        console.log('🟢 sorted (by id desc):', sorted);

        this.originalMeetingType = sorted;
        console.log('🟢 originalMeetingType set to:', this.originalMeetingType);

        this.filteredMeetingType = [...sorted];
        console.log('🟢 filteredMeetingType set to:', this.filteredMeetingType);
      }
    );
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
    this.selectedMeetingTypeId = MeetingTypeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedMeetingTypeId
    );
    if (this.selectedMeetingTypeId !== null) {
      this.facade.delete(this.selectedMeetingTypeId);
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
