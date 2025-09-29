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
type Paged<T> = { items: T[]; totalCount?: number };

function isPaged<T>(x: unknown): x is Paged<T> {
  return !!x && typeof x === 'object' && 'items' in (x as any);
}
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
    { field: 'agreementId', header: 'Agreement Number' },
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
    const agreementId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('[Init] agreementId =', agreementId);

    // Load data
    this.facade.loadById(agreementId); // files
    this.facadeAgreements.loadAll(); // agreements

    // Observables
    this.agreements$ = this.facadeAgreements.all$ as Observable<
      LeasingAgreement[]
    >;

    this.agreementFiles$ = (
      this.facade.all$ as Observable<AgreementFile[] | Paged<AgreementFile>>
    ).pipe(
      map((res) => {
        console.log('[Files raw from facade]', res);

        if (Array.isArray(res)) {
          console.log('[Files interpreted as array]', res);
          return res;
        } else if (isPaged<AgreementFile>(res)) {
          console.log('[Files interpreted as paged object]', res.items);
          return res.items ?? [];
        } else {
          console.warn('[Files type not recognized]', res);
          return [];
        }
      }),
      map((items) => {
        // extra debug to confirm types
        console.log(
          '[Types check]',
          items.map((f) => ({
            id: f.id,
            agreementId: f.agreementId,
            typeofAgreementId: typeof (f as any).agreementId,
          }))
        );

        const filtered = items.filter(
          (f) => Number((f as any).agreementId) === agreementId
        );
        console.log('[Files after safe numeric compare]', filtered);
        return filtered;
      })
    );

    combineLatest([this.agreementFiles$, this.agreements$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([files, agreements]) => {
        console.log('[CombineLatest] files =', files);
        console.log('[CombineLatest] agreements =', agreements);

        const numberById = new Map<number, string>(
          agreements
            .filter((a) => typeof a.id === 'number')
            .map((a) => [
              a.id as number,
              (a as any).agreementNumber ?? `#${a.id}`,
            ])
        );
        console.log('[numberById map]', numberById);

        const enriched = files.map((f) => ({
          ...f,
          displayAgreementNumber:
            numberById.get(f.agreementId) ?? `#${f.agreementId}`,
        }));
        console.log('[Enriched files]', enriched);

        const sorted = [...enriched].sort((a, b) => b.id - a.id);
        console.log('[Sorted files]', sorted);

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
