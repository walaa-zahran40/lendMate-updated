import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, Subject, takeUntil, tap } from 'rxjs';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { Mandate } from '../../../store/leasing-mandates/leasing-mandate.model';
import { MandatesFacade } from '../../../store/leasing-mandates/leasing-mandates.facade';
import { ClientsFacade } from '../../../../clients/store/_clients/allclients/clients.facade';
import { Store } from '@ngrx/store';
import {
  loadClientContactPersons,
  loadClientContactPersonsByClientId,
} from '../../../../../crm/clients/store/client-contact-persons/client-contact-persons.actions';
import { ClientContactPersonsFacade } from '../../../../clients/store/client-contact-persons/client-contact-persons.facade';

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
    { field: 'description', header: 'Description' },
    { field: 'clientName', header: 'Client Name' },
    { field: 'date', header: 'Start Date' },
  ];
  showDeleteModal: boolean = false;
  selectedLeasingMandateId: number | null = null;
  originalLeasingMandates: any[] = [];
  filteredLeasingMandates: Mandate[] = [];
  contactPersonsDropdown: any;
  officersDropdown: any[] = [];
  languagesDropdown: any[] = [];

  constructor(
    private router: Router,
    private clientsFacade: ClientsFacade,
    private facade: MandatesFacade,
    private store: Store,
    private facadeContact: ClientContactPersonsFacade
  ) {}
  ngOnInit() {
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
    this.setupContactPersonsDropdown();
    this.setupOfficersDropdown();
    this.setupLanguagesDropdown();
  }
  private setupContactPersonsDropdown(): void {
    this.store.dispatch(loadClientContactPersons());
    this.contactPersonsDropdown = this.facadeContact.items$;
  }

  private setupOfficersDropdown(): void {
    console.log('🔍 selectedRowForDownload:', this.selectedRowForDownload);

    const contacts = this.selectedRowForDownload?.contacts;
    console.log('🔍 raw contacts array:', contacts);

    if (contacts && Array.isArray(contacts)) {
      this.contactPersonsDropdown = contacts.filter((v, i, a) => {
        const firstIdx = a.findIndex((t) => t.id === v.id);
        const keep = firstIdx === i;
        if (!keep) {
          console.warn(
            `🚨 duplicate contact id=${v.id} at index ${i}; first seen at ${firstIdx}`
          );
        }
        return keep;
      });

      console.log(
        '✅ filtered (unique) contacts:',
        this.contactPersonsDropdown
      );
    } else {
      console.warn('⚠️ no contacts found on selectedRowForDownload');
      this.contactPersonsDropdown = [];
    }
  }
  private setupLanguagesDropdown(): void {
    console.log('🔍 selectedRowForDownload:', this.selectedRowForDownload);

    const contacts = this.selectedRowForDownload?.contacts;
    console.log('🔍 raw contacts array:', contacts);

    if (contacts && Array.isArray(contacts)) {
      this.contactPersonsDropdown = contacts.filter((v, i, a) => {
        const firstIdx = a.findIndex((t) => t.id === v.id);
        const keep = firstIdx === i;
        if (!keep) {
          console.warn(
            `🚨 duplicate contact id=${v.id} at index ${i}; first seen at ${firstIdx}`
          );
        }
        return keep;
      });

      console.log(
        '✅ filtered (unique) contacts:',
        this.contactPersonsDropdown
      );
    } else {
      console.warn('⚠️ no contacts found on selectedRowForDownload');
      this.contactPersonsDropdown = [];
    }
  }
  onAddLeasingMandate() {
    this.router.navigate(['/crm/leasing-mandates/add-mandate']);
  }
  onAddSide(leasingMandatesId: any) {

    this.router.navigate([
      '/crm/leasing-mandates/leasing-mandate-wizard',
      leasingMandatesId,
    ]);
  }
  onDownloadClick(row: any) {
    console.log('clicked');
    this.selectedRowForDownload = row;
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
  onEditLeasingMandate(mandate: Mandate) {
    this.router.navigate(['/crm/mandates/edit-mandate', mandate.id], {
      queryParams: {
        mode: 'edit',
      },
    });
  }
  onViewLeasingMandates(mandate: Mandate) {
    console.log('mandate', mandate);
    this.router.navigate(['/crm/mandates/edit-mandate', mandate.id], {
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
}
