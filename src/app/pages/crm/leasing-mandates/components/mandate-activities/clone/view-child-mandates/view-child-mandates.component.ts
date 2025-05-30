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
} from 'rxjs';
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { Clone } from '../../../../store/clone/clone.model';
import { ClonesFacade } from '../../../../store/clone/clones.facade';
import { ClientsFacade } from '../../../../../clients/store/_clients/allclients/clients.facade';
import { Store } from '@ngrx/store';
import { loadClientContactPersonsByClientId } from '../../../../../../crm/clients/store/client-contact-persons/client-contact-persons.actions';
import { ClientContactPersonsFacade } from '../../../../../clients/store/client-contact-persons/client-contact-persons.facade';
import { OfficersFacade } from '../../../../../../organizations/store/officers/officers.facade';
import { loadOfficers } from '../../../../../../organizations/store/officers/officers.actions';

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
  routeId = this.route.snapshot.params['leasingId'];
  leasingRouteId = this.route.snapshot.params['leasingMandatesId'];
  constructor(
    private router: Router,
    private clientsFacade: ClientsFacade,
    private facade: ClonesFacade,
    private store: Store,
    private route: ActivatedRoute,
    private facadeContact: ClientContactPersonsFacade,
    private officersFacade: OfficersFacade
  ) {}
  ngOnInit() {
    console.log('route', this.route.snapshot);
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
  }
  private setupContactPersonsDropdown(): void {
    const mandate = this.selectedRowForDownload!;
    const saved = mandate.mandateContactPersons ?? []; // [{ contactPersonId: number }, …]

    // if nothing was saved, short-circuit
    if (!saved.length) {
      this.contactPersonsDropdown = [];
      return;
    }

    // 1️⃣ Dispatch with the real clientId (not clientView.clientId)
    this.store.dispatch(
      loadClientContactPersonsByClientId({
        clientId: mandate.clientView.clientId!,
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
      `/crm/leasing-mandates/add-child-mandate/${this.routeId}/${this.leasingRouteId}`,
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
    this.selectedLeasingMandateId = leasingMandatesId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.selectedLeasingMandateId !== null) {
      this.facade.delete(this.selectedLeasingMandateId);
    }
    this.resetDeleteModal();
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
        mandate.mandateId,
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
      [
        '/crm/leasing-mandates/add-child-mandate',
        mandate.id,
        mandate.mandateId,
      ],
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
}
