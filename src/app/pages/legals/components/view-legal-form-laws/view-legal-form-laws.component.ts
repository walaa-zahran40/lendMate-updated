  import { Component, ViewChild } from '@angular/core';
  import { Observable, Subject, takeUntil } from 'rxjs';
  import { Router } from '@angular/router';
  import { TableComponent } from '../../../../shared/components/table/table.component';
import { LegalFormLaw } from '../../store/legal-form-laws/legal-form-law.model';
import { LegalFormLawsFacade } from '../../store/legal-form-laws/legal-form-laws.facade';

  
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
  
      this.legalFormLaws$.pipe(takeUntil(this.destroy$)).subscribe((legalFormLaws) => {
        const sorted = [...legalFormLaws].sort((a, b) => b.id - a.id);
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
  
    confirmDelete() {
      console.log(
        '[View] confirmDelete() – about to dispatch delete for id=',
        this.selectedLegalFormLawId
      );
      if (this.selectedLegalFormLawId !== null) {
        this.facade.delete(this.selectedLegalFormLawId);
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
      this.selectedLegalFormLawId = null;
    }

    onSearch(keyword: string) {
      const lower = keyword.toLowerCase();
      this.filteredLegalFormLaws = this.originalLegalFormLaws.filter((legalFormLaw) =>
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
  }
  