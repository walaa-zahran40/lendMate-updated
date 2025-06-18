import { Component, ViewChild } from '@angular/core';
import { Observable, Subject, takeUntil, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { LegalForm } from '../../../store/legal-forms/legal-form.model';
import { LegalFormsFacade } from '../../../store/legal-forms/legal-forms.facade';

@Component({
  selector: 'app-view-legal-forms',
  standalone: false,
  templateUrl: './view-legal-forms.component.html',
  styleUrl: './view-legal-forms.component.scss',
})
export class ViewLegalFormsComponent {
  tableDataInside: LegalForm[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
  ];

  showDeleteModal = false;
  selectedLegalFormId: number | null = null;
  originalLegalForms: LegalForm[] = [];
  filteredLegalForms: LegalForm[] = [];
  legalForms$!: Observable<LegalForm[]>;

  constructor(private router: Router, private facade: LegalFormsFacade) {}

  ngOnInit() {
    this.facade.loadAll();
    this.legalForms$ = this.facade.items$;
    this.legalForms$?.pipe(takeUntil(this.destroy$))?.subscribe((legal) => {
      const activeCodes = legal.filter((code) => code.isActive);
      const sorted = [...activeCodes].sort((a, b) => b?.id - a?.id);
      this.originalLegalForms = sorted;
      this.filteredLegalForms = [...sorted];
    });
  }

  onAddLegalForm() {
    this.router.navigate(['/legals/add-legal-form']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteLegalForm(legalFormId: number): void {
    console.log(
      '[View] onDeleteLegalForm() – opening modal for id=',
      legalFormId
    );
    this.selectedLegalFormId = legalFormId;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedLegalFormId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredLegalForms = this.originalLegalForms.filter((legalForm) =>
      Object.values(legalForm).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditLegalForm(legalForm: LegalForm) {
    this.router.navigate(['/legals/edit-legal-form', legalForm.id], {
      queryParams: { mode: 'edit' },
    });
  }

  onViewLegalForm(legalForm: LegalForm) {
    this.router.navigate(['/legals/edit-legal-form', legalForm.id], {
      queryParams: { mode: 'view' },
    });
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
    this.legalForms$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
