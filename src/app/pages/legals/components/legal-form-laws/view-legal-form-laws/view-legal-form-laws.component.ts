import { Component, ViewChild } from '@angular/core';
import { Observable, Subject, takeUntil, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { LegalFormLaw } from '../../../store/legal-form-laws/legal-form-law.model';
import { LegalFormLawsFacade } from '../../../store/legal-form-laws/legal-form-laws.facade';

@Component({
  selector: 'app-view-legal-form-laws',
  standalone: false,
  templateUrl: './view-legal-form-laws.component.html',
  styleUrl: './view-legal-form-laws.component.scss',
})
export class ViewLegalFormLawsComponent {
  tableDataInside: LegalFormLaw[] = [];
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
  selectedLegalFormLawId: number | null = null;
  originalLegalFormLaws: LegalFormLaw[] = [];
  filteredLegalFormLaws: LegalFormLaw[] = [];
  legalFormLaws$!: Observable<LegalFormLaw[]>;

  constructor(private router: Router, private facade: LegalFormLawsFacade) {}

  ngOnInit() {
    this.facade.loadAll();
    this.legalFormLaws$ = this.facade.items$;

    this.legalFormLaws$
      .pipe(takeUntil(this.destroy$))
      .subscribe((legalFormLaws) => {
        const activeCodes = legalFormLaws.filter((code) => code.isActive);
        const sorted = [...activeCodes].sort((a, b) => b.id - a.id);
        console.log('🟢 sorted legalFormLaws:', sorted);
        this.originalLegalFormLaws = sorted;
        this.filteredLegalFormLaws = [...sorted];
      });
  }

  onAddLegalFormLaw() {
    this.router.navigate(['/legals/add-legal-form-law']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteLegalFormLaw(legalFormLawId: number): void {
    console.log(
      '[View] onDeleteLegalFormLaw() – opening modal for id=',
      legalFormLawId
    );
    this.selectedLegalFormLawId = legalFormLawId;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedLegalFormLawId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredLegalFormLaws = this.originalLegalFormLaws.filter(
      (legalFormLaw) =>
        Object.values(legalFormLaw).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditLegalFormLaw(legalFormLaw: LegalFormLaw) {
    this.router.navigate(['/legals/edit-legal-form-law', legalFormLaw.id], {
      queryParams: { mode: 'edit' },
    });
  }

  onViewLegalFormLaw(legalFormLaw: LegalFormLaw) {
    this.router.navigate(['/legals/edit-legal-form-law', legalFormLaw.id], {
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
    this.legalFormLaws$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
