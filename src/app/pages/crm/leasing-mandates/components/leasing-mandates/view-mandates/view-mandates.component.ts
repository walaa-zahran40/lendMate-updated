import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  combineLatest,
  map,
  Subject,
  takeUntil,
  tap,
  take,
  filter,
  forkJoin,
} from 'rxjs';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { Mandate } from '../../../store/leasing-mandates/leasing-mandate.model';
import { MandatesFacade } from '../../../store/leasing-mandates/leasing-mandates.facade';
import { ClientsFacade } from '../../../../clients/store/_clients/allclients/clients.facade';
import { Store } from '@ngrx/store';
import { loadClientContactPersonsByClientId } from '../../../../../crm/clients/store/client-contact-persons/client-contact-persons.actions';
import { ClientContactPersonsFacade } from '../../../../clients/store/client-contact-persons/client-contact-persons.facade';
import { OfficersFacade } from '../../../../../organizations/store/officers/officers.facade';
import { loadOfficers } from '../../../../../organizations/store/officers/officers.actions';

@Component({
  selector: 'app-view-mandates',
  standalone: false,
  templateUrl: './view-mandates.component.html',
  styleUrl: './view-mandates.component.scss',
})
export class ViewMandatesComponent {
  tableDataInside: Mandate[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  leasingMandates$ = this.facade.all$;
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;
  clients$ = this.clientsFacade.all$;
  selectedRowForDownload: Mandate | null = null;
  showDownloadPopup = false;

  readonly colsInside = [
    { field: 'id', header: 'Id' },
    { field: 'description', header: 'Description' },
    { field: 'date', header: 'Start Date' },
  ];
  showDeleteModal: boolean = false;
  selectedLeasingMandateId: number | null = null;
  originalLeasingMandates: any[] = [];
  filteredLeasingMandates: Mandate[] = [];
  contactPersonsDropdown: any;
  officersDropdown: any[] = [];
  languagesDropdown: any[] = [];
  clientId = this.route.snapshot.params['clientId'];
  constructor(
    private router: Router,
    private clientsFacade: ClientsFacade,
    private facade: MandatesFacade,
    private store: Store,
    private facadeContact: ClientContactPersonsFacade,
    private officersFacade: OfficersFacade,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    console.log('route', this.route.snapshot);
    if (!this.clientId) {
      this.facade.loadAll();
      combineLatest([this.leasingMandates$, this.clients$])
        .pipe(
          takeUntil(this.destroy$),

          // 1️⃣ Log the raw mandates array
          tap(([mandates, clients]) => {
            console.group('🚀 combineLatest payload');
            console.log('Mandates:', mandates);
            console.log('Clients :', clients);
            console.groupEnd();
          }),

          // 2️⃣ Now map & flatten clientName out of clientView
          map(([mandates, clients]) =>
            mandates
              .slice()
              .sort((a, b) => b.id! - a.id!)
              .map((m) => {
                const fromMandate = m.clientView?.clientName;
                const fromClients = clients.find(
                  (c) => c.id === m.clientId
                )?.name;
                console.log(
                  `🗺️ mapping mandate#${m.id}:`,
                  'clientView.name=',
                  fromMandate,
                  'clients lookup=',
                  fromClients
                );
                return {
                  ...m,
                  clientName: fromMandate ?? fromClients ?? '— unknown —',
                };
              })
          ),

          // 3️⃣ Log the enriched array
          tap((enriched) => console.log('Enriched tableDataInside:', enriched))
        )
        .subscribe((enriched) => {
          this.tableDataInside = enriched;
          this.originalLeasingMandates = enriched;
          this.filteredLeasingMandates = enriched;
        });
    } else {
      console.log('there is a client Id , Choose get by client id');
      this.facade.loadByClientId(this.clientId);
      combineLatest([this.leasingMandates$, this.clients$])
        .pipe(
          takeUntil(this.destroy$),

          // 1️⃣ Log the raw mandates array
          tap(([mandates, clients]) => {
            console.group('🚀 combineLatest payload');
            console.log('Mandates:', mandates);
            console.log('Clients :', clients);
            console.groupEnd();
          }),

          // 2️⃣ Now map & flatten clientName out of clientView
          map(([mandates, clients]) =>
            mandates
              .slice()
              .sort((a, b) => b.id! - a.id!)
              .map((m) => {
                const fromMandate = m.clientView?.clientName;
                const fromClients = clients.find(
                  (c) => c.id === m.clientId
                )?.name;
                console.log(
                  `🗺️ mapping mandate#${m.id}:`,
                  'clientView.name=',
                  fromMandate,
                  'clients lookup=',
                  fromClients
                );
                return {
                  ...m,
                };
              })
          ),

          // 3️⃣ Log the enriched array
          tap((enriched) => console.log('Enriched tableDataInside:', enriched))
        )
        .subscribe((enriched) => {
          this.tableDataInside = enriched;
          this.originalLeasingMandates = enriched;
          this.filteredLeasingMandates = enriched;
        });
    }
  }
  private setupContactPersonsDropdown(): void {
    const mandate = this.selectedRowForDownload!;
    const saved = mandate.mandateContactPersons ?? []; // [{ contactPersonId: number }, …]

    // if nothing was saved, short-circuit
    if (!saved.length) {
      this.contactPersonsDropdown = [];
      return;
    }
    if (!this.clientId) {
      // 1️⃣ Dispatch with the real clientId (not clientView.clientId)
      this.store.dispatch(
        loadClientContactPersonsByClientId({
          clientId: mandate.clientView?.clientId!,
        })
      );
    } else {
      this.store.dispatch(
        loadClientContactPersonsByClientId({
          clientId: this.clientId!,
        })
      );
    }
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
    if (this.clientId) {
      this.router.navigate([
        `/crm/leasing-mandates/add-mandate/${this.clientId}`,
      ]);
    } else {
      this.router.navigate(['/crm/leasing-mandates/add-mandate']);
    }
  }
  onAddSide(leasingMandatesId: any) {
    if (this.clientId) {
      this.router.navigate([
        '/crm/leasing-mandates/leasing-mandate-wizard',
        leasingMandatesId,
        this.clientId,
      ]);
    } else {
      this.router.navigate([
        '/crm/leasing-mandates/leasing-mandate-wizard',
        leasingMandatesId,
      ]);
    }
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
  onEditLeasingMandate(mandate: Mandate) {
    if (this.clientId) {
      this.router.navigate(
        ['/crm/leasing-mandates/edit-mandate', mandate.id, this.clientId],
        {
          queryParams: {
            mode: 'edit',
          },
        }
      );
    } else {
      this.router.navigate(['/crm/leasing-mandates/edit-mandate', mandate.id], {
        queryParams: {
          mode: 'edit',
        },
      });
    }
  }
  onViewLeasingMandates(mandate: Mandate) {
    console.log('mandate', mandate);
    this.router.navigate(['/crm/leasing-mandates/view-mandates', mandate.id], {
      queryParams: {
        mode: 'view',
      },
    });
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
