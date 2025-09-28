import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { EvaluationInformationFacade } from '../../../../../store/evaluation-information/evaluation-information.facade';
import { EvaluationInformation } from '../../../../../store/evaluation-information/evaluation-information.model';

@Component({
  selector: 'app-view-evaluation-information',
  standalone: false,
  templateUrl: './view-evaluation-information.component.html',
  styleUrl: './view-evaluation-information.component.scss',
})
export class ViewEvaluationInformationComponent {
  tableDataInside: EvaluationInformation[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    {
      field: 'assetEvaluationDescription',
      header: 'Asset Evaluation Description',
    },
    { field: 'evaluationDate', header: 'Evaluation Date' },
    { field: 'isActive', header: 'Is Active' },
  ];

  showDeleteModal = false;
  selectedEvaluationInformationId: number | null = null;
  originalEvaluationInformation: EvaluationInformation[] = [];
  filteredEvaluationInformation: EvaluationInformation[] = [];
  evaluationInformation$!: Observable<EvaluationInformation[]>;
  routeId = this.route.snapshot.params['id'];
  constructor(
    private router: Router,
    private facade: EvaluationInformationFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.facade.loadAll();
    this.evaluationInformation$ = this.facade.all$;

    this.evaluationInformation$
      .pipe(takeUntil(this.destroy$))
      .subscribe((evaluationInformation) => {
        // const activeCodes = evaluationInformation.filter((code) => code.isActive);
        const sorted = evaluationInformation.sort((a, b) => b.id - a.id);
        // console.log('🟢 sorted evaluationInformation:', sorted);
        this.originalEvaluationInformation = sorted;
        this.filteredEvaluationInformation = [...sorted];
      });
  }

  onAddEvaluationInformation() {
    this.router.navigate([
      `/purchasing/assets/activities/add-evaluation-information/${this.routeId}`,
    ]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteEvaluationInformation(evaluationInformationId: number): void {
    console.log(
      '[View] onDeleteEvaluationInformation() – opening modal for id=',
      evaluationInformationId
    );
    this.selectedIds = [evaluationInformationId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedEvaluationInformationId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredEvaluationInformation =
      this.originalEvaluationInformation.filter((evaluationInformation) =>
        Object.values(evaluationInformation).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditEvaluationInformation(evaluationInformation: EvaluationInformation) {
    this.router.navigate(
      [
        '/purchasing/assets/activities/edit-evaluation-information',
        evaluationInformation.id,
      ],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }

  onViewEvaluationInformation(evaluationInformation: EvaluationInformation) {
    this.router.navigate(
      [
        '/purchasing/assets/activities/edit-evaluation-information',
        evaluationInformation.id,
      ],
      {
        queryParams: { mode: 'view' },
      }
    );
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
    this.evaluationInformation$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
