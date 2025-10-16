import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  Subject,
  Observable,
  combineLatest,
  of,
  map,
  takeUntil,
  forkJoin,
} from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Evaluator } from '../../../store/evaluators/evaluator.model';
import { EvaluatorsFacade } from '../../../store/evaluators/evaluators.facade';

@Component({
  selector: 'app-view-evaluators',
  standalone: false,
  templateUrl: './view-evaluators.component.html',
  styleUrl: './view-evaluators.component.scss',
})
export class ViewEvaluatorsComponent {
  tableDataInside: Evaluator[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'isActive', header: 'Is Active' },
  ];

  showDeleteModal: boolean = false;
  selectedEvaluatorId: number | null = null;
  originalEvaluators: Evaluator[] = [];
  filteredEvaluators: Evaluator[] = [];
  evaluators$!: Observable<Evaluator[]>;
  readonly evaluatorTypes = [
    { id: 1, value: 'Expression' },
    { id: 2, value: 'Function' },
    { id: 3, value: 'Both' },
  ];

  constructor(private router: Router, private facade: EvaluatorsFacade) {}

  ngOnInit() {
    this.facade.loadHistory();
    this.evaluators$ = this.facade.history$;

    // Combine fee types with their corresponding calculation type names
    combineLatest<[Evaluator[]]>([this.evaluators$ ?? of([])])
      .pipe(
        map(([evaluators]) => {
          console.log('📦 Raw feeTypes:', evaluators);

          return evaluators
            .map((ss) => {
              console.log('ss', ss);

              return {
                ...ss,
              };
            })
            .sort((a, b) => b.id - a.id);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        console.log('result', result);
        this.filteredEvaluators = result;
        this.originalEvaluators = result;
      });
  }

  onAddEvaluator() {
    this.router.navigate(['/lookups/add-evaluator']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteEvaluator(evaluatorId: any): void {
    console.log(
      '[View] onDeleteEvaluator() – opening modal for id=',
      evaluatorId
    );
    this.selectedIds = [evaluatorId];
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
    this.evaluators$ = this.facade.all$;
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
    this.selectedEvaluatorId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredEvaluators = this.originalEvaluators.filter((evaluator) =>
      Object.values(evaluator).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditEvaluator(evaluator: Evaluator) {
    this.router.navigate(['/lookups/edit-evaluator', evaluator.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewEvaluator(ct: Evaluator) {
    this.router.navigate(['/lookups/edit-evaluator', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
