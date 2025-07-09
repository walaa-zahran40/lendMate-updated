import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  map,
  Subject,
  takeUntil,
  tap,
  take,
  filter,
  forkJoin,
  switchMap,
} from 'rxjs';
import { TableComponent } from '../../../../../../../../../../../shared/components/table/table.component';
import { loadOfficers } from '../../../../../../../../../../organizations/store/officers/officers.actions';
import { OfficersFacade } from '../../../../../../../../../../organizations/store/officers/officers.facade';
import { Clone } from '../../../../../../../../../leasing-mandates/store/clone/clone.model';
import { ClonesFacade } from '../../../../../../../../../leasing-mandates/store/clone/clones.facade';
import { ClientsFacade } from '../../../../../../../../store/_clients/allclients/clients.facade';
import { loadClientContactPersonsByClientId } from '../../../../../../../../store/client-contact-persons/client-contact-persons.actions';
import { ClientContactPersonsFacade } from '../../../../../../../../store/client-contact-persons/client-contact-persons.facade';
import { ClientsClonesFacade } from '../../../../../../../../store/client-leasing-mandates/activities/clone/client-clones.facade';

@Component({
  selector: 'app-view-child-mandates',
  standalone: false,
  templateUrl: './view-child-mandates.component.html',
  styleUrl: './view-child-mandates.component.scss',
})
export class ViewChildMandatesComponent {
  tableDataInside: Clone[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  leasingMandates$ = this.facade.all$;
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;
  clients$ = this.clientsFacade.all$;
  selectedRowForDownload: Clone | null = null;
  showDownloadPopup = false;

  readonly colsInside = [
    { field: 'description', header: 'Description' },
    { field: 'clientName', header: 'Client Name' },
    { field: 'date', header: 'Start Date' },
  ];
  showDeleteModal: boolean = false;
  selectedLeasingMandateId: number | null = null;
  originalLeasingMandates: any[] = [];
  filteredLeasingMandates: Clone[] = [];
  contactPersonsDropdown: any;
  officersDropdown: any[] = [];
  languagesDropdown: any[] = [];
  routeId = this.route.snapshot.params['clientId'];
  leasingRouteId = this.route.snapshot.params['leasingMandatesId'];
  constructor(
    private router: Router,
    private clientsFacade: ClientsFacade,
    private facade: ClientsClonesFacade,
    private store: Store,
    private route: ActivatedRoute,
    private facadeContact: ClientContactPersonsFacade,
    private officersFacade: OfficersFacade
  ) {}
  ngOnInit() {
    console.log('route', this.route.snapshot);
    const clientId = +this.route.snapshot.paramMap.get('clientId')!;

    // ① kick off client-list + clone-by-client load
    this.clientsFacade.loadAll();
    this.officersFacade.loadAll(); // if you need officers too
    this.facade.loadByClientId(clientId);

    // 🔍 DEBUG: watch loading & error flags
    this.facade.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => console.log('🔄 clones loading:', loading));
    this.facade.error$.pipe(takeUntil(this.destroy$)).subscribe((err) => {
      if (err) console.error('❌ error loading clones:', err);
    });

    // 🔍 DEBUG: raw clones array
    this.leasingMandates$
      .pipe(takeUntil(this.destroy$))
      .subscribe((list) => console.log('🗃️ raw clones list:', list));

    // ② only proceed once we actually have clones + clients
    this.leasingMandates$
      .pipe(
        takeUntil(this.destroy$),
        filter((clones) => clones.length > 0),
        switchMap((clones) =>
          this.clients$.pipe(
            filter((clients) => clients.length > 0),
            take(1),
            map((clients) =>
              clones
                .slice()
                .sort((a, b) => b.id! - a.id!)
                .map((m) => ({
                  ...m,
                  clientName:
                    m.clientView?.clientName ??
                    clients.find((c) => c.id === m.clientId)?.name ??
                    '— unknown —',
                }))
            )
          )
        )
      )
      .subscribe((enriched) => {
        console.log('✅ enriched tableDataInside:', enriched);
        this.tableDataInside = enriched;
        this.originalLeasingMandates = enriched;
        this.filteredLeasingMandates = enriched;
      });
  }

  private setupContactPersonsDropdown(): void {
    const mandate = this.selectedRowForDownload!;
    const saved = mandate.mandateContactPersons ?? []; // [{ contactPersonId: number }, …]
    console.log('mandate', mandate);
    // if nothing was saved, short-circuit
    if (!saved.length) {
      this.contactPersonsDropdown = [];
      return;
    }

    // 1️⃣ Dispatch with the real clientId (not clientView.clientId)
    this.store.dispatch(
      loadClientContactPersonsByClientId({
        clientId: this.routeId!,
      })
    );

    // 2️⃣ Now wait until facadeContact.items$ emits a non-empty array
    this.facadeContact.items$
      .pipe(
        filter((list) => list.length > 0), // skip the initial []
        take(1) // then complete
      )
      .subscribe((all) => {
        // 3️⃣ Filter down to only the ones this mandate saved
        this.contactPersonsDropdown = all.filter((cp) =>
          saved.some((sel) => sel.contactPersonId === cp.id)
        );
        console.log(
          '✅ contacts dropdown after load:',
          this.contactPersonsDropdown
        );
      });
  }

  private setupOfficersDropdown(): void {
    const mandate = this.selectedRowForDownload!;
    const saved: { officerId: number }[] = mandate.mandateOfficers ?? [];
    console.log('saved', saved);
    // nothing saved → empty list
    if (!saved.length) {
      this.officersDropdown = [];
      return;
    }

    // 1️⃣ dispatch the load
    this.store.dispatch(loadOfficers());

    // 2️⃣ wait until you actually get a non-empty array
    this.officersFacade.items$
      .pipe(
        filter((list) => list.length > 0),
        take(1)
      )
      .subscribe((all) => {
        // 3️⃣ filter down to only the ones this mandate saved
        this.officersDropdown = all.filter((o) =>
          saved.some((sel) => sel.officerId === o.id)
        );
        console.log('✅ officers dropdown after load:', this.officersDropdown);
      });
  }

  onAddLeasingMandate() {
    this.router.navigate([
      `/crm/leasing-mandates/add-child-mandate/${this.leasingRouteId}/${this.routeId}`,
    ]);
  }

  onDownloadClick(row: any) {
    console.log('clicked', row);
    this.selectedRowForDownload = row;
    this.setupContactPersonsDropdown();
    this.setupOfficersDropdown();
    this.showDownloadPopup = true;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteLeasingMandate(leasingMandatesId: number): void {
    this.selectedIds = [leasingMandatesId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedLeasingMandateId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredLeasingMandates = this.originalLeasingMandates.filter(
      (mandate) =>
        Object.values(mandate).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditLeasingMandate(mandate: Clone) {
    console.log('mandate', mandate);
    this.router.navigate(
      [
        '/crm/leasing-mandates/edit-child-mandate',
        mandate.id,
        mandate.clientId,
      ],
      {
        queryParams: {
          mode: 'edit',
        },
      }
    );
  }
  onViewLeasingMandates(mandate: Clone) {
    console.log('mandate', mandate);
    this.router.navigate(
      ['/crm/leasing-mandates/add-child-mandate', mandate.id, mandate.clientId],
      {
        queryParams: {
          mode: 'view',
        },
      }
    );
  }
  onPopupClose() {
    this.showDownloadPopup = false;
    this.selectedRowForDownload = null;
  }
  onPopupDownload(m: any) {
    // you can kick off server download here, e.g.:
    // this.fileService.downloadMandatePdf(m.id).subscribe(...);
    this.onPopupClose();
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
    this.leasingMandates$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
