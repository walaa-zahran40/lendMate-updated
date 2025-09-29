import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Subject,
  Observable,
  map,
  combineLatest,
  takeUntil,
  forkJoin,
} from 'rxjs';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { LeasingAgreement } from '../../../../store/agreements/agreement.model';
import { AgreementFile } from '../../../../store/agreement-files/agreement-file.model';
import { LeasingAgreementsFacade } from '../../../../store/agreements/agreements.facade';
import { AgreementFilesFacade } from '../../../../store/agreement-files/agreement-files.facade';

@Component({
  selector: 'app-view-agreement-files',
  standalone: false,
  templateUrl: './view-agreement-files.component.html',
  styleUrl: './view-agreement-files.component.scss',
})
export class ViewAgreementFilesComponent {
  tableDataInside: AgreementFile[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'expiryDate', header: 'File Expiry Date' },
    { field: 'number', header: 'Agreement Number' },
    // { field: 'isActive', header: 'Is Active' },
  ];

  showDeleteModal = false;
  selectedAgreementFileId: number | null = null;
  originalAgreementFiles: AgreementFile[] = [];
  filteredAgreementFiles: AgreementFile[] = [];
  agreementFiles$!: Observable<AgreementFile[]>;
  agreements$!: Observable<LeasingAgreement[]>;
  routeId = this.route.snapshot.params['id'];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private facade: AgreementFilesFacade,
    private facadeAgreements: LeasingAgreementsFacade
  ) {}

  ngOnInit() {
    this.facade.loadById(this.routeId);
    this.agreementFiles$ = this.facade.selected$.pipe(
      map((file) => (file ? [file] : []))
    );

    this.facadeAgreements.loadAll();
    this.agreements$ = this.facadeAgreements.all$.pipe(
      map((res: any) => (Array.isArray(res) ? res : res?.items ?? []))
    );
    this.agreementFiles$ = this.facade.all$;

    combineLatest([this.agreementFiles$, this.agreements$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([filesRes, orders]) => {
        const files: AgreementFile[] = Array.isArray(filesRes)
          ? filesRes
          : filesRes &&
            'items' in filesRes &&
            Array.isArray((filesRes as any).items)
          ? (filesRes as any).items
          : [];

        // Build a quick lookup map: id -> poNumber
        const poNumberMap = new Map<number, string>(
          orders
            .filter((o) => typeof o.id === 'number')
            .map(
              (o) =>
                [o.id as number, (o as any).poNumber ?? `#${o.id}`] as [
                  number,
                  string
                ]
            )
        );

        // Enrich files with the correct PO number
        const enriched = files.map((f) => ({
          ...f,
          number: poNumberMap.get(f.agreementId) ?? `#${f.agreementId}`, // ← use agreementId
        }));
        // sort as you like
        const sorted = [...enriched].sort((a, b) => b.id - a.id);

        this.originalAgreementFiles = sorted;
        this.filteredAgreementFiles = [...sorted];
      });
  }

  onAddAgreementFile() {
    this.router.navigate([
      `/agreement/activities/add-agreement-file/${this.routeId}`,
    ]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteAgreementFile(agreementFileId: number): void {
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
      ['/agreement/activities/edit-agreement-file/', agreementFile.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }

  onViewAgreementFile(agreementFile: AgreementFile) {
    this.router.navigate(
      ['/agreement/activities/edit-agreement-file/', agreementFile.id],
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
      },
      error: (err) => {
        this.showDeleteModal = false; // STILL CLOSE IT
      },
    });
  }

  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
