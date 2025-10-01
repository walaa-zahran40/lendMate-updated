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
import { Area } from '../../../../../lookups/store/areas/area.model';
import { AreasFacade } from '../../../../../lookups/store/areas/areas.facade';
import { selectAllAreas } from '../../../../../lookups/store/areas/areas.selectors';
import { Store } from '@ngrx/store';
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
    { field: 'details', header: 'Details' },
    { field: 'detailsAR', header: 'Details AR' },
    { field: 'AreaName', header: 'Area Name' },
  ];
  showDeleteModal: boolean = false;
  selectedAgreementFileId: number | null = null;
  originalAgreementFiles: AgreementFile[] = [];
  filteredAgreementFiles: AgreementFile[] = [];
  agreementFiles$!: Observable<AgreementFile[]>;
  AreasList$!: Observable<Area[]>;

  constructor(
    private router: Router,
    private facade: AgreementFilesFacade,
    private areaFacade: AreasFacade,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    const raw = this.route.snapshot.paramMap.get('clientId');
    this.clientIdParam = raw !== null ? Number(raw) : undefined;

    this.areaFacade.loadAll();
    this.AreasList$ = this.store.select(selectAllAreas);
    this.store.dispatch({ type: '[Areas] Load All' });

    this.facade.loadAgreementFilesByClientId(this.clientIdParam);
    this.agreementFiles$ = this.facade.items$;

    combineLatest([this.agreementFiles$, this.AreasList$])
      .pipe(
        map(([agreementFiles, AreasList]) =>
          agreementFiles
            .map((address) => ({
              ...address,
              AreaName:
                AreasList.find((c) => c.id === address.areaId)?.name || '—',
            }))
            .filter((address) => address.isActive)
            .sort((a, b) => b.id - a.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalAgreementFiles = enriched;
        this.filteredAgreementFiles = [...enriched];
      });
  }

  onAddAgreementFile() {
    const clientIdParam = this.route.snapshot.paramMap.get('clientId');

    this.router.navigate(['/crm/clients/add-client-addresses'], {
      queryParams: { mode: 'add', clientId: clientIdParam },
    });
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
      ['/crm/clients/edit-client-addresses', agreementFile.id],
      {
        queryParams: {
          mode: 'edit',
          clientId: this.clientIdParam,
        },
      }
    );
  }
  onViewAgreementFile(ct: AgreementFile) {
    this.router.navigate(['/crm/clients/edit-client-addresses', ct.id], {
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
