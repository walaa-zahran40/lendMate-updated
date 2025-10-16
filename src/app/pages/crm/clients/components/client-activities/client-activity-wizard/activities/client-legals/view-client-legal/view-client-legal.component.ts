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
  of,
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
    const data = this.route.snapshot.data['list'] as {
      clientId: number;
      items: ClientLegal[];
      legalForms: LegalForm[];
      legalFormLaws: LegalFormLaw[];
    };

    this.clientIdParam = data.clientId;

    // 1) First render from resolver (no spinner flicker)
    const idToForm = new Map(data.legalForms.map((f) => [f.id, f.name]));
    const idToLaw = new Map(data.legalFormLaws.map((l) => [l.id, l.name]));

    const firstRender = (data.items ?? [])
      .map((it) => ({
        ...it,
        legalForm: idToForm.get(it.legalFormId) ?? '—',
        legalFormLaw: idToLaw.get(it.legalFormLawId) ?? '—',
      }))
      .filter((it) => it.isActive)
      .sort((a, b) => (b.id ?? 0) - (a.id ?? 0));

    this.originalLegals = firstRender;
    this.filteredLegals = [...firstRender];

    // 2) Subscribe to store for post-CRUD refresh
    this.facade.loadByClientId(this.clientIdParam);
    this.clientLegals$ = this.facade.items$;

    // If you want live mapping as items change, use resolver lookups:
    combineLatest([
      this.clientLegals$,
      of(data.legalForms),
      of(data.legalFormLaws),
    ])
      .pipe(
        map(([items, forms, laws]) => {
          const mapForm = new Map(forms.map((f) => [f.id, f.name]));
          const mapLaw = new Map(laws.map((l) => [l.id, l.name]));
          return (items ?? [])
            .filter((it) => it.clientId === this.clientIdParam)
            .map((it) => ({
              ...it,
              legalForm: mapForm.get(it.legalFormId) ?? '—',
              legalFormLaw: mapLaw.get(it.legalFormLawId) ?? '—',
            }))
            .filter((it) => it.isActive)
            .sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
        }),
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
    this.selectedIds = [clientLegalId];
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
