import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { PhoneType } from '../../../store/phone-types/phone-type.model';
import { PhoneTypesFacade } from '../../../store/phone-types/phone-types.facade';

@Component({
  selector: 'app-view-phone-types',
  standalone: false,
  templateUrl: './view-phone-types.component.html',
  styleUrl: './view-phone-types.component.scss',
})
export class ViewPhoneTypesComponent {
  tableDataInside: PhoneType[] = [];
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
  selectedPhoneTypeId: number | null = null;
  originalPhoneType: PhoneType[] = [];
  filteredPhoneType: PhoneType[] = [];
  PhoneTypes$!: Observable<PhoneType[]>;

  constructor(private router: Router, private facade: PhoneTypesFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.PhoneTypes$ = this.facade.history$;
    console.log('🟢 before loadHistory, current store value:');
    this.PhoneTypes$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadHistory() to fetch PhoneTypes');
    this.facade.loadHistory();

    this.PhoneTypes$?.pipe(takeUntil(this.destroy$))?.subscribe(
      (PhoneTypes) => {
        // PhoneTypes is now rentStructureType[], not any
        const sorted = [...PhoneTypes].sort((a, b) => b?.id - a?.id);
        this.originalPhoneType = sorted;
        this.filteredPhoneType = [...sorted];
      }
    );
  }

  onAddPhoneType() {
    this.router.navigate(['/lookups/add-phone-types']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeletePhoneType(PhoneTypeId: any): void {
    console.log(
      '[View] onDeletePhoneType() – opening modal for id=',
      PhoneTypeId
    );
    this.selectedIds = [PhoneTypeId];
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
    this.PhoneTypes$ = this.facade.all$;
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
    this.selectedPhoneTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredPhoneType = this.originalPhoneType.filter((PhoneTypes) =>
      Object.values(PhoneTypes).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditPhoneType(PhoneType: PhoneType) {
    this.router.navigate(['/lookups/edit-phone-types', PhoneType.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewPhoneType(ct: PhoneType) {
    this.router.navigate(['/lookups/edit-phone-types', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
