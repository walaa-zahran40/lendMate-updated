import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, filter, combineLatest, of, map } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Condition } from '../../../store/conditions/condition.model';
import { ConditionsFacade } from '../../../store/conditions/conditions.facade';
import { ConditionExpressionsFacade } from '../../../store/condition-expressions/condition-expressions.facade';
import { ConditionExpression } from '../../../store/condition-expressions/condition-expressions.model';

@Component({
  selector: 'app-view-conditions',
  standalone: false,
  templateUrl: './view-conditions.component.html',
  styleUrl: './view-conditions.component.scss',
})
export class ViewConditionsComponent {
  tableDataInside: Condition[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'description', header: 'description' },
    { field: 'functionName', header: 'functionName' },
    { field: 'fieldName', header: 'Expression Field Name' },
    { field: 'conditionType', header: 'conditionType' },
  ];

  showDeleteModal: boolean = false;
  selectedConditionId: number | null = null;
  originalConditions: Condition[] = [];
  filteredConditions: Condition[] = [];
  conditions$!: Observable<Condition[]>;
  conditionExpressions$!: Observable<ConditionExpression[]>;
  

  constructor(
    private router: Router, 
    private facade: ConditionsFacade ,
    private conditionExpressionsFacade: ConditionExpressionsFacade){}

  ngOnInit() {
    this.conditionExpressionsFacade.loadAll();
    this.conditionExpressions$ = this.conditionExpressionsFacade.all$;
    
    this.facade.loadAll();
    this.conditions$ = this.facade.all$;

    // Combine fee types with their corresponding calculation type names
    combineLatest<[Condition[], any[]]>([
      this.conditions$ ?? of([]),
      this.conditionExpressions$ ?? of([]),
    ])
      .pipe(
        map(([conditions, conditionExpressions]) => {
          console.log('📦 Raw feeTypes:', conditions);
          console.log('📦 Raw feeCalcTypes:', conditionExpressions);

          return conditions
            .map((ss) => {
              console.log('ss', ss);
              const match = conditionExpressions.find(
                (s) => s.id === ss.conditionExpressionId
              );

              console.log(
                `🔍 Matching calc type for feeType ID ${ss.id} (feeCalculationTypeId: ${ss.conditionExpressionId}):`,
                match
              );

              return {
                ...ss,
                fieldName:
                  conditionExpressions.find((s) => s.id === ss.conditionExpressionId)
                    ?.fieldName || '—',

                  };
                })
            .sort((a, b) => b.id - a.id);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        console.log('result', result);
        this.filteredConditions = result;
        this.originalConditions = result;
      });
  }

  onAddCondition() {
    this.router.navigate(['/lookups/add-conditions']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteCondition(conditionId: any): void {
    console.log(
      '[View] onDeleteCondition() – opening modal for id=',
      conditionId
    );
    this.selectedConditionId = conditionId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedConditionId
    );
    if (this.selectedConditionId !== null) {
      this.facade.delete(this.selectedConditionId);
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
    this.selectedConditionId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredConditions = this.originalConditions.filter(
      (condition) =>
        Object.values(condition).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditCondition(condition: Condition) {
    this.router.navigate(['/lookups/edit-conditions', condition.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewCondition(ct: Condition) {
    this.router.navigate(['/lookups/edit-conditions', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
