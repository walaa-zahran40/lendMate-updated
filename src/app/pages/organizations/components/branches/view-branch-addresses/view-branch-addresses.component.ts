import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, takeUntil, tap, map, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { BranchAddress } from '../../../store/branches/branch-addresses/branch-address.model';
import { BranchAddressesFacade } from '../../../store/branches/branch-addresses/branch-addresses.facade';

@Component({
  selector: 'app-view-branch-addresses',
  standalone: false,
  templateUrl: './view-branch-addresses.component.html',
  styleUrl: './view-branch-addresses.component.scss',
})
export class ViewBranchAddressesComponent {
  tableDataInside: BranchAddress[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  branchIdParam!: any;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'details', header: 'Details' },
    { field: 'detailsAR', header: 'Details AR' },
    { field: 'branch', header: 'Branch' },
  ];
  showDeleteModal: boolean = false;
  selectedBranchAddressId: number | null = null;
  originalBranchAddresses: BranchAddress[] = [];
  filteredBranchAddresses: BranchAddress[] = [];
  branchAddresses$!: Observable<BranchAddress[]>;

  constructor(
    private router: Router,
    private facade: BranchAddressesFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const raw = this.route.snapshot.paramMap.get('branchId');
    this.branchIdParam = raw !== null ? Number(raw) : undefined;
    this.facade.loadBranchAddressesByBranchId(this.branchIdParam);
    this.branchAddresses$ = this.facade.items$;

    this.branchAddresses$
      .pipe(
        takeUntil(this.destroy$),

        // log raw array coming from the facade
        tap((rawList) =>
          console.log('[View] facade.items$ rawList =', rawList)
        ),

        // your transform
        map((list) =>
          (list ?? [])
            .map((r) => ({ ...r, branch: r.branch?.name || '—' }))
            .sort((a, b) => b.id - a.id)
        ),

        // log after mapping + sorting
        tap((formatted) =>
          console.log('[View] after map+sort formatted =', formatted)
        )
      )
      .subscribe((formatted) => {
        this.filteredBranchAddresses = formatted;
        this.originalBranchAddresses = formatted;
        console.log(
          '[View] subscribe → filteredCurrencyExchangeRates =',
          this.filteredBranchAddresses
        );
      });
  }

  onAddBranchAddress() {
    const branchIdParam = this.route.snapshot.paramMap.get('branchId');

    this.router.navigate(['/organizations/add-branch-addresses'], {
      queryParams: { mode: 'add', branchId: branchIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteBranchAddress(branchAddressId: any): void {
    console.log(
      '[View] onDeleteBranchAddress() – opening modal for id=',
      branchAddressId
    );
    this.selectedBranchAddressId = branchAddressId;
    this.showDeleteModal = true;
  }

  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) =>
      this.facade.delete(id, this.branchIdParam)
    );

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
    this.branchAddresses$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedBranchAddressId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredBranchAddresses = this.originalBranchAddresses.filter(
      (branchAddress) =>
        Object.values(branchAddress).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditBranchAddress(branchAddress: BranchAddress) {
    this.router.navigate(
      ['/organizations/edit-branch-addresses', branchAddress.id],
      {
        queryParams: {
          mode: 'edit',
          branchId: this.branchIdParam, // <-- use "currencyId" here
        },
      }
    );
  }
  onViewBranchAddress(ct: BranchAddress) {
    this.router.navigate(['/organizations/edit-branch-addresses', ct.id], {
      queryParams: {
        mode: 'view',
        branchId: this.branchIdParam, // <-- use "currencyId" here
      },
    });
  }
}
