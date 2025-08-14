import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { LicenseInformation } from '../../../../../store/license-information/license-information.model';
import { LicenseInformationFacade } from '../../../../../store/license-information/license-information.facade';

@Component({
  selector: 'app-view-license-information',
  standalone: false,
  templateUrl: './view-license-information.component.html',
  styleUrl: './view-license-information.component.scss',
})
export class ViewLicenseInformationComponent {
  tableDataInside: LicenseInformation[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'licenseNumber', header: 'License Number' },
    { field: 'startDate', header: 'Start Date' },
    { field: 'endDate', header: 'End Date' },
    { field: 'licenseInUseBy', header: 'In Use By' },
    { field: 'isActive', header: 'Is Active' },
  ];

  showDeleteModal = false;
  selectedLicenseInformationId: number | null = null;
  originalLicenseInformation: LicenseInformation[] = [];
  filteredLicenseInformation: LicenseInformation[] = [];
  licenseInformation$!: Observable<LicenseInformation[]>;
  routeId = this.route.snapshot.params['id'];
  constructor(
    private router: Router,
    private facade: LicenseInformationFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('route', this.route.snapshot);
    this.facade.loadAll();
    this.licenseInformation$ = this.facade.all$;

    this.licenseInformation$
      .pipe(takeUntil(this.destroy$))
      .subscribe((licenseInformation) => {
        // const activeCodes = licenseInformation.filter((code) => code.isActive);
        const sorted = licenseInformation.sort((a, b) => b.id - a.id);
        // console.log('🟢 sorted licenseInformation:', sorted);
        this.originalLicenseInformation = sorted;
        this.filteredLicenseInformation = [...sorted];
      });
  }

  onAddLicenseInformation() {
    this.router.navigate([
      `/purchasing/assets/activities/add-license-information/${this.routeId}`,
    ]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteLicenseInformation(licenseInformationId: number): void {
    console.log(
      '[View] onDeleteLicenseInformation() – opening modal for id=',
      licenseInformationId
    );
    this.selectedIds = [licenseInformationId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedLicenseInformationId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredLicenseInformation = this.originalLicenseInformation.filter(
      (licenseInformation) =>
        Object.values(licenseInformation).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditLicenseInformation(licenseInformation: LicenseInformation) {
    this.router.navigate(
      [
        '/purchasing/assets/activities/edit-license-information',
        licenseInformation.id,
      ],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }

  onViewLicenseInformation(licenseInformation: LicenseInformation) {
    this.router.navigate(
      [
        '/purchasing/assets/activities/edit-license-information',
        licenseInformation.id,
      ],
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
    this.licenseInformation$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
