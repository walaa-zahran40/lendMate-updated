import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  Subject,
  Observable,
  takeUntil,
  tap,
  combineLatest,
  map,
  forkJoin,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { SignatoryOfficer } from '../../../store/signatory-officers/signatory-officer.model';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Officer } from '../../../store/officers/officer.model';
import { SignatoryOfficersFacade } from '../../../store/signatory-officers/signatory-officers.facade';
import { OfficersFacade } from '../../../store/officers/officers.facade';
import { selectOfficers } from '../../../store/officers/officers.selectors';

@Component({
  selector: 'app-view-signatory-officers',
  standalone: false,
  templateUrl: './view-signatory-officers.component.html',
  styleUrl: './view-signatory-officers.component.scss',
})
export class ViewSignatoryOfficersComponent {
  tableDataInside: SignatoryOfficer[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'officerName', header: 'Officer' },
    { field: 'isActive', header: 'IsActive' },
    { field: 'startDate', header: 'Start Date' },
  ];
  showDeleteModal: boolean = false;
  selectedSignatoryOfficerId: number | null = null;
  originalSignatoryOfficers: SignatoryOfficer[] = [];
  filteredSignatoryOfficers: SignatoryOfficer[] = [];
  signatoryOfficers$!: Observable<SignatoryOfficer[]>;
  officersList$!: Observable<Officer[]>;

  constructor(
    private router: Router,
    private facade: SignatoryOfficersFacade,
    private officersFacade: OfficersFacade,
    private store: Store
  ) {}
  ngOnInit() {
    this.facade.loadAll();
    this.signatoryOfficers$ = this.facade.all$;

    this.officersList$ = this.store.select(selectOfficers);
    this.officersFacade.loadAll();

    combineLatest([this.signatoryOfficers$, this.officersList$])
      .pipe(
        map(([signatoryOfficers, officers]) =>
          signatoryOfficers
            .map((signatoryOfficer) => ({
              ...signatoryOfficer,
              officerName:
                officers.find((c) => c.id === signatoryOfficer.officerId)
                  ?.name || '—',
            }))
            .sort((a, b) => b.id - a.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalSignatoryOfficers = enriched;
        this.filteredSignatoryOfficers = [...enriched];
      });
  }

  onAddSignatoryOfficer() {
    console.log('🔍 [Component] onAddSignatoryOfficer');
    this.router.navigate(['/organizations/add-signatory-officer']);
  }

  ngOnDestroy() {
    console.log('🔍 [Component] ngOnDestroy - cleaning up');
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteSignatoryOfficerId(signatoryofficerId: any): void {
    console.log(
      '[View] onDeleteSignatoryOfficer() – opening modal for id=',
      signatoryofficerId
    );
    this.selectedIds = [signatoryofficerId];
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
    this.signatoryOfficers$ = this.facade.all$;
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
    this.selectedSignatoryOfficerId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredSignatoryOfficers = this.originalSignatoryOfficers.filter(
      (signatoryofficer) =>
        Object.values(signatoryofficer).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditSignatoryOfficer(signatoryofficer: SignatoryOfficer) {
    this.router.navigate(
      ['/organizations/edit-signatory-officer', signatoryofficer.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewSignatoryOfficer(ct: SignatoryOfficer) {
    this.router.navigate(['/organizations/edit-signatory-officer', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
