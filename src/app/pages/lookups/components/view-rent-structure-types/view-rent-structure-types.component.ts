import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { RentStructureType } from '../../store/rent-structure-types/rent-structure-type.model';
import { RentStructureTypesFacade } from '../../store/rent-structure-types/rent-structure-types.facade';

@Component({
  selector: 'app-view-rent-structure-types',
  standalone: false,
  templateUrl: './view-rent-structure-types.component.html',
  styleUrl: './view-rent-structure-types.component.scss',
})
export class ViewRentStructureTypesComponent {
  tableDataInside: RentStructureType[] = [];
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
  selectedRentStructureTypeId: number | null = null;
  originalRentStructureType: RentStructureType[] = [];
  filteredRentStructureType: RentStructureType[] = [];
  RentStructureTypes$!: Observable<RentStructureType[]>;

  constructor(
    private router: Router,
    private facade: RentStructureTypesFacade
  ) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.RentStructureTypes$ = this.facade.all$;
    console.log('🟢 before loadAll, current store value:');
    this.RentStructureTypes$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadAll() to fetch RentStructureTypes');
    this.facade.loadAll();

    this.RentStructureTypes$?.pipe(takeUntil(this.destroy$)).subscribe(
      (RentStructureTypes) => {
        console.log(
          '🟢 subscribe: received RentStructureTypes array:',
          RentStructureTypes
        );

        // preserve immutability, then sort by id descending
        const sorted = [...RentStructureTypes].sort((a, b) => b.id - a.id);
        console.log('🟢 sorted (by id desc):', sorted);

        this.originalRentStructureType = sorted;
        console.log(
          '🟢 originalRentStructureType set to:',
          this.originalRentStructureType
        );

        this.filteredRentStructureType = [...sorted];
        console.log(
          '🟢 filteredRentStructureType set to:',
          this.filteredRentStructureType
        );
      }
    );
  }

  onAddRentStructureType() {
    this.router.navigate(['/lookups/add-rent-structure-types']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteRentStructureType(RentStructureTypeId: any): void {
    console.log(
      '[View] onDeleteRentStructureType() – opening modal for id=',
      RentStructureTypeId
    );
    this.selectedRentStructureTypeId = RentStructureTypeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedRentStructureTypeId
    );
    if (this.selectedRentStructureTypeId !== null) {
      this.facade.delete(this.selectedRentStructureTypeId);
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
    this.selectedRentStructureTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredRentStructureType = this.originalRentStructureType.filter(
      (RentStructureTypes) =>
        Object.values(RentStructureTypes).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditRentStructureType(RentStructureType: RentStructureType) {
    this.router.navigate(
      ['/lookups/edit-rent-structure-types', RentStructureType.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewRentStructureType(ct: RentStructureType) {
    this.router.navigate(['/lookups/edit-rent-structure-types', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
