import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { LeasingAgreement } from '../../../store/agreements/agreement.model';
import { LeasingAgreementsFacade } from '../../../store/agreements/agreements.facade';

@Component({
  selector: 'app-view-agreements',
  standalone: false,
  templateUrl: './view-agreements.component.html',
  styleUrl: './view-agreements.component.scss',
})
export class ViewAgreementsComponent {
  tableDataInside: LeasingAgreement[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();
  clientId = this.route.snapshot.params['clientId'];

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [{ field: 'date', header: 'Agreement Date' }];

  showDeleteModal = false;
  selectedAgreementId: number | null = null;
  originalAgreements: LeasingAgreement[] = [];
  filteredAgreements: LeasingAgreement[] = [];
  agreements$!: Observable<LeasingAgreement[]>;

  constructor(
    private router: Router,
    private facade: LeasingAgreementsFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('leasing agreement ngoninit');
    this.facade.loadAll();
    this.agreements$ = this.facade.all$;

    this.agreements$.pipe(takeUntil(this.destroy$)).subscribe((agreements) => {
      const sorted = agreements.sort((a, b) => b.id! - a.id!);
      console.log('🟢 sorted agreements:', sorted);
      this.originalAgreements = sorted;
      this.filteredAgreements = [...sorted];
    });
  }
  private getClientIdFrom(m?: LeasingAgreement | null): number | null {
    return this.clientId ?? m?.clientId ?? null;
  }
  // private setupContactPersonsDropdown(): void {
  //   const mandate = this.selectedRowForDownload!;
  //   const realClientId = this.getClientIdFrom(mandate);
  //   if (!realClientId) {
  //     this.contactPersonsDropdown = [];
  //     return;
  //   }

  //   this.store.dispatch(
  //     loadClientContactPersonsByClientId({ clientId: realClientId })
  //   );
  //   this.facadeContact.items$
  //     .pipe(
  //       filter((list) => list.length > 0),
  //       take(1)
  //     )
  //     .subscribe((all) => {
  //       const saved = mandate.mandateContactPersons ?? [];
  //       this.contactPersonsDropdown = all.filter((cp) =>
  //         saved.some((sel) => sel.contactPersonId === cp.id)
  //       );
  //     });
  // }

  onAddAgreement() {
    this.router.navigate(['/agreement/add-agreement']);
  }
  onAddSide(leasingAgreementsId: any) {
    const realClientId = this.clientId ?? null; // from route if present
    const cmds = realClientId
      ? ['/agreement/wizard-agreement', leasingAgreementsId, realClientId]
      : ['/agreement/wizard-agreement', leasingAgreementsId];
    this.router.navigate(cmds);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteAgreement(agreementId: number): void {
    console.log(
      '[View] onDeleteAgreement() – opening modal for id=',
      agreementId
    );
    this.selectedIds = [agreementId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedAgreementId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredAgreements = this.originalAgreements.filter((agreement) =>
      Object.values(agreement).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditAgreement(agreement: LeasingAgreement) {
    this.router.navigate(['/agreement/edit-agreement', agreement.id], {
      queryParams: { mode: 'edit' },
    });
  }

  onViewAgreement(agreement: LeasingAgreement) {
    this.router.navigate(
      ['/agreement/agreement-contact-persons/view', agreement.id],
      {
        queryParams: { mode: 'view' },
      }
    );
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
    this.agreements$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
