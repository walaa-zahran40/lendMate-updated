import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Subject,
  Observable,
  combineLatest,
  map,
  takeUntil,
  forkJoin,
} from 'rxjs';
import { TableComponent } from '../../../../../../../../../shared/components/table/table.component';
import { ClientLegal } from '../../../../../../store/client-legals/client-legal.model';
import { ClientLegalsFacade } from '../../../../../../store/client-legals/client-legals.facade';
import { LegalForm } from '../../../../../../../../legals/store/legal-forms/legal-form.model';
import { LegalFormLaw } from '../../../../../../../../legals/store/legal-form-laws/legal-form-law.model';
import {
  loadLegalForm,
  loadLegalForms,
} from '../../../../../../../../legals/store/legal-forms/legal-forms.actions';
import { selectLegalForms } from '../../../../../../../../legals/store/legal-forms/legal-forms.selectors';
import { loadLegalFormLaws } from '../../../../../../../../legals/store/legal-form-law/legal-form-law.actions';
import { selectLegalFormLaws } from '../../../../../../../../legals/store/legal-form-laws/legal-form-laws.selectors';

@Component({
  selector: 'app-view-client-legal',
  standalone: false,
  templateUrl: './view-client-legal.component.html',
  styleUrl: './view-client-legal.component.scss',
})
export class ViewClientLegalsComponent {
  tableDataInside: ClientLegal[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  clientIdParam!: any;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'legalForm', header: 'legal Form' },
    { field: 'legalFormLaw', header: 'legal Form law' },
    { field: 'isStampDuty', header: 'is Stamp Duty' },
  ];
  showDeleteModal: boolean = false;
  selectedLegalId: number | null = null;
  originalLegals: ClientLegal[] = [];
  filteredLegals: ClientLegal[] = [];
  clientLegals$!: Observable<ClientLegal[]>;
  legalFormsList$!: Observable<LegalForm[]>;
  legalFormLawsList$!: Observable<LegalFormLaw[]>;

  constructor(
    private router: Router,
    private facade: ClientLegalsFacade,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    const raw = this.route.snapshot.paramMap.get('clientId');
    this.clientIdParam = raw !== null ? Number(raw) : undefined;
    this.facade.loadClientLegalsByClientId(this.clientIdParam);
    this.clientLegals$ = this.facade.items$;

    this.store.dispatch(loadLegalForms());
    this.store.dispatch(loadLegalFormLaws());

    this.legalFormsList$ = this.store.select(selectLegalForms);
    this.legalFormLawsList$ = this.store.select(selectLegalFormLaws);

    combineLatest([
      this.clientLegals$,
      this.legalFormsList$,
      this.legalFormLawsList$,
    ])
      .pipe(
        map(([clientLegals, legalFormsList, legalFormLawsList]) =>
          clientLegals
            .map((clientLegal) => ({
              ...clientLegal,
              legalForm:
                legalFormsList.find((c) => c.id === clientLegal.legalFormId)
                  ?.name || '—',
              legalFormLaw:
                legalFormLawsList.find(
                  (c) => c.id === clientLegal.legalFormLawId
                )?.name || '—',
            }))
            .filter((clientLegal) => clientLegal.isActive)
            .sort((a, b) => b.id - a.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalLegals = enriched;
        this.filteredLegals = [...enriched];
      });
  }

  onAddLegal() {
    const clientIdParam = this.route.snapshot.paramMap.get('clientId');

    this.router.navigate(['/crm/clients/add-client-legals'], {
      queryParams: { mode: 'add', clientId: clientIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteLegal(clientLegalId: any): void {
    console.log(
      '[View] onDeleteLegale() – opening modal for id=',
      clientLegalId
    );
    this.selectedLegalId = clientLegalId;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedLegalId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredLegals = this.originalLegals.filter((clientLegal) =>
      Object.values(clientLegal).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditLegal(clientLegal: ClientLegal) {
    this.router.navigate(['/crm/clients/edit-client-legals', clientLegal.id], {
      queryParams: {
        mode: 'edit',
        clientId: this.clientIdParam, // <-- use "currencyId" here
      },
    });
  }
  onViewLegal(ct: ClientLegal) {
    this.router.navigate(['/crm/clients/edit-client-legals', ct.id], {
      queryParams: {
        mode: 'view',
        clientId: this.clientIdParam, // <-- use "currencyId" here
      },
    });
  }
  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) =>
      this.facade.delete(id, this.clientIdParam)
    );

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
    this.clientLegals$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
