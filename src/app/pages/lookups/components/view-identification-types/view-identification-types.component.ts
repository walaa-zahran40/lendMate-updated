import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { IdentificationType } from '../../store/identification-types/identification-type.model';
import { IdentificationTypesFacade } from '../../store/identification-types/identification-types.facade';

@Component({
  selector: 'app-view-identification-types',
  standalone: false,
  templateUrl: './view-identification-types.component.html',
  styleUrl: './view-identification-types.component.scss',
})
export class ViewIdentificationTypesComponent {
  tableDataInside: IdentificationType[] = [];
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
  selectedIdentificationTypeId: number | null = null;
  originalIdentificationType: IdentificationType[] = [];
  filteredIdentificationType: IdentificationType[] = [];
  IdentificationTypes$!: Observable<IdentificationType[]>;

  constructor(
    private router: Router,
    private facade: IdentificationTypesFacade
  ) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.IdentificationTypes$ = this.facade.all$;
    console.log('🟢 before loadAll, current store value:');
    this.IdentificationTypes$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadAll() to fetch IdentificationTypes');
    this.facade.loadAll();

    this.IdentificationTypes$?.pipe(takeUntil(this.destroy$)).subscribe(
      (IdentificationTypes) => {
        console.log(
          '🟢 subscribe: received IdentificationTypes array:',
          IdentificationTypes
        );

        // preserve immutability, then sort by id descending
        const sorted = [...IdentificationTypes].sort((a, b) => b.id - a.id);
        console.log('🟢 sorted (by id desc):', sorted);

        this.originalIdentificationType = sorted;
        console.log(
          '🟢 originalIdentificationType set to:',
          this.originalIdentificationType
        );

        this.filteredIdentificationType = [...sorted];
        console.log(
          '🟢 filteredIdentificationType set to:',
          this.filteredIdentificationType
        );
      }
    );
  }

  onAddIdentificationType() {
    this.router.navigate(['/lookups/add-identification-types']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteIdentificationType(IdentificationTypeId: any): void {
    console.log(
      '[View] onDeleteIdentificationType() – opening modal for id=',
      IdentificationTypeId
    );
    this.selectedIdentificationTypeId = IdentificationTypeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedIdentificationTypeId
    );
    if (this.selectedIdentificationTypeId !== null) {
      this.facade.delete(this.selectedIdentificationTypeId);
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
    this.selectedIdentificationTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredIdentificationType = this.originalIdentificationType.filter(
      (IdentificationTypes) =>
        Object.values(IdentificationTypes).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditIdentificationType(IdentificationType: IdentificationType) {
    this.router.navigate(
      ['/lookups/edit-identification-types', IdentificationType.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewIdentificationType(ct: IdentificationType) {
    this.router.navigate(['/lookups/edit-identification-types', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
