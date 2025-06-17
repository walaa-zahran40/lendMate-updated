import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, filter } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { InterestType } from '../../../store/interest-types/interest-type.model';
import { InterestTypesFacade } from '../../../store/interest-types/interest-types.facade';

@Component({
  selector: 'app-view-interest-types',
  standalone: false,
  templateUrl: './view-interest-types.component.html',
  styleUrl: './view-interest-types.component.scss',
})
export class ViewInterestTypesComponent {
  tableDataInside: InterestType[] = [];
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
  selectedInterestTypeId: number | null = null;
  originalInterestTypes: InterestType[] = [];
  filteredInterestTypes: InterestType[] = [];
  interestTypes$!: Observable<InterestType[]>;

  constructor(private router: Router, private facade: InterestTypesFacade) {}
  ngOnInit() {
    this.facade.loadHistory();
    this.facade.operationSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((op) => op?.entity === 'InterestType')
      )
      .subscribe(() => this.facade.loadHistory());
    this.interestTypes$ = this.facade.history$;

    this.interestTypes$
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe((interest) => {
        const sorted = [...interest].sort((a, b) => b?.id - a?.id);
        this.originalInterestTypes = sorted;
        this.filteredInterestTypes = [...sorted];
      });
  }

  onAddInterestType() {
    this.router.navigate(['/lookups/add-interest-types']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteInterestType(interestTypeId: any): void {
    console.log(
      '[View] onDeleteInterestType() – opening modal for id=',
      interestTypeId
    );
    this.selectedInterestTypeId = interestTypeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedInterestTypeId
    );
    if (this.selectedInterestTypeId !== null) {
      this.facade.delete(this.selectedInterestTypeId);
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
    this.selectedInterestTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredInterestTypes = this.originalInterestTypes.filter(
      (interestType) =>
        Object.values(interestType).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditInterestType(interestType: InterestType) {
    this.router.navigate(['/lookups/edit-interest-types', interestType.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewInterestType(ct: InterestType) {
    this.router.navigate(['/lookups/edit-interest-types', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
