import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, filter, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { ConditionExpression } from '../../../store/condition-expressions/condition-expression.model';
import { ConditionExpressionsFacade } from '../../../store/condition-expressions/condition-expressions.facade';

@Component({
  selector: 'app-view-condition-expressions',
  standalone: false,
  templateUrl: './view-condition-expressions.component.html',
  styleUrl: './view-condition-expressions.component.scss',
})
export class ViewConditionExpressionsComponent {
  tableDataInside: ConditionExpression[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  //   export interface ConditionExpression {
  //   id: number;
  //   fieldName: string;
  //   value: string;
  //   operator: number;
  // }

  readonly colsInside = [
    { field: 'fieldName', header: 'Field Name' },
    { field: 'value', header: 'Value' },
    { field: 'operator', header: 'Operator' },
  ];
  showDeleteModal: boolean = false;
  selectedConditionExpressionId: number | null = null;
  originalConditionExpressions: ConditionExpression[] = [];
  filteredConditionExpressions: ConditionExpression[] = [];
  conditionExpressions$!: Observable<ConditionExpression[]>;

  constructor(
    private router: Router,
    private facade: ConditionExpressionsFacade
  ) {}
  ngOnInit() {
    this.facade.loadHistory();
    this.facade.operationSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((op) => op?.entity === 'ConditionExpression')
      )
      .subscribe(() => this.facade.loadHistory());
    this.conditionExpressions$ = this.facade.history$;

    this.conditionExpressions$
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe((address) => {
        //const activeCodes = address.filter((code) => code.isActive);
        const sorted = [...address].sort((a, b) => b?.id - a?.id);
        this.originalConditionExpressions = sorted;
        this.filteredConditionExpressions = [...sorted];
      });
  }

  onAddConditionExpression() {
    this.router.navigate(['/lookups/add-condition-expressions']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteConditionExpression(conditionExpressionId: any): void {
    console.log(
      '[View] onDeleteConditionExpression() – opening modal for id=',
      conditionExpressionId
    );
    this.selectedIds = [conditionExpressionId];
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
    this.conditionExpressions$ = this.facade.all$;
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
    this.selectedConditionExpressionId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredConditionExpressions =
      this.originalConditionExpressions.filter((conditionExpression) =>
        Object.values(conditionExpression).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditConditionExpression(conditionExpression: ConditionExpression) {
    this.router.navigate(
      ['/lookups/edit-condition-expressions', conditionExpression.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewConditionExpression(ct: ConditionExpression) {
    this.router.navigate(['/lookups/edit-condition-expressions', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
