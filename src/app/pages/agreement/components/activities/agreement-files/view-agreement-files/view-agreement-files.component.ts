import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subject,
  Observable,
  takeUntil,
  forkJoin,
  combineLatest,
  map,
} from 'rxjs';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { AgreementFile } from '../../../../store/agreement-files/agreement-file.model';
import { LeasingAgreementFilesFacade } from '../../../../store/agreement-files/agreement-files.facade';

@Component({
  selector: 'app-view-agreement-files',
  standalone: false,
  templateUrl: './view-agreement-files.component.html',
  styleUrl: './view-agreement-files.component.scss',
})
export class ViewAgreementFilesComponent {
  tableDataInside: AgreementFile[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  clientIdParam!: any;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'filePath', header: 'Agreemnt File Path' },
    { field: 'expiryDate', header: 'Agreement Expiry Date' },
  ];
  showDeleteModal: boolean = false;
  selectedAgreementFileId: number | null = null;
  originalAgreementFiles: AgreementFile[] = [];
  filteredAgreementFiles: AgreementFile[] = [];
  agreementFiles$!: Observable<AgreementFile[]>;
  routeId = this.route.snapshot.params['id'];
  constructor(
    private router: Router,
    private facade: LeasingAgreementFilesFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const agreementId = Number(this.route.snapshot.params['id']);
    this.facade.loadByLeasingAgreementId(agreementId);

    this.agreementFiles$ = this.facade.byLeasingAgreementId$(agreementId);

    this.agreementFiles$
      .pipe(map((files) => [...files].sort((a, b) => b.id - a.id)))
      .subscribe((enriched) => {
        this.originalAgreementFiles = enriched;
        this.filteredAgreementFiles = [...enriched];
      });
  }
  onAddAgreementFile() {
    const id = this.route.snapshot.paramMap.get('id');

    this.router.navigate([
      `/agreement/activities/wizard-agreement/add-agreement-file/${id}`,
    ]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteAgreementFile(agreementFileId: any): void {
    console.log(
      '[View] onDeleteAgreementFile() – opening modal for id=',
      agreementFileId
    );
    this.selectedIds = [agreementFileId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedAgreementFileId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredAgreementFiles = this.originalAgreementFiles.filter(
      (agreementFile) =>
        Object.values(agreementFile).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  // view-agreement-files.component.ts
  onEditAgreementFile(agreementFile: AgreementFile) {
    const leasingId = Number(
      agreementFile.leasingAgreementId ?? agreementFile.agreementId
    );
    const fileId = Number(agreementFile.id);

    if (!Number.isFinite(leasingId) || !Number.isFinite(fileId)) {
      console.warn('[Edit] missing ids', { leasingId, fileId, agreementFile });
      return;
    }

    this.router.navigate(
      [
        '/agreement',
        'activities',
        'wizard-agreement',
        'edit-agreement-file',
        leasingId,
        fileId,
      ],
      { queryParams: { mode: 'edit', clientId: this.clientIdParam } }
    );
  }

  onViewAgreementFile(agreementFile: AgreementFile) {
    const leasingId = Number(
      agreementFile.leasingAgreementId ?? agreementFile.agreementId
    );
    const fileId = Number(agreementFile.id);

    if (!Number.isFinite(leasingId) || !Number.isFinite(fileId)) {
      console.warn('[View] missing ids', { leasingId, fileId, agreementFile });
      return;
    }

    this.router.navigate(
      [
        '/agreement',
        'activities',
        'wizard-agreement',
        'edit-agreement-file',
        leasingId,
        fileId,
      ],
      { queryParams: { mode: 'view', clientId: this.clientIdParam } }
    );
  }

  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) => this.facade.delete(id));

    forkJoin(deleteCalls).subscribe({
      next: () => {
        this.selectedIds = [];
        this.showDeleteModal = false;
        this.refreshCalls();
      },
      error: (err) => {
        this.showDeleteModal = false;
      },
    });
  }

  refreshCalls() {
    this.facade.loadAll();
    this.agreementFiles$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
