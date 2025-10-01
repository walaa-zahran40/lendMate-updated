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
import { AgreementFilesFacade } from '../../../../store/agreement-files/agreement-files.facade';

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
    private facade: AgreementFilesFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.facade.loadOne(this.routeId);
    this.agreementFiles$ = this.facade.items$;

    this.agreementFiles$
      .pipe(
        map((agreementFiles) => [...agreementFiles].sort((a, b) => b.id - a.id))
      )
      .subscribe((enriched) => {
        console.log('[DEBUG] Final enriched files for table:', enriched);
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
  onEditAgreementFile(agreementFile: AgreementFile) {
    this.router.navigate(
      ['/crm/clients/edit-agreement-files', agreementFile.id],
      {
        queryParams: {
          mode: 'edit',
          clientId: this.clientIdParam,
        },
      }
    );
  }
  onViewAgreementFile(ct: AgreementFile) {
    this.router.navigate(['/crm/clients/edit-agreement-files', ct.id], {
      queryParams: {
        mode: 'view',
        clientId: this.clientIdParam,
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
    this.agreementFiles$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
