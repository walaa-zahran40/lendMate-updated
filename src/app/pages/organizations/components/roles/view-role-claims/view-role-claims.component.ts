import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable, takeUntil, tap, map, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { RoleClaim } from '../../../store/roles/role-claims/role-claim.model';
import { RoleClaimsFacade } from '../../../store/roles/role-claims/role-claims.facade';

@Component({
  selector: 'app-view-role-claims',
  standalone: false,
  templateUrl: './view-role-claims.component.html',
  styleUrl: './view-role-claims.component.scss',
})
export class ViewRoleClaimsComponent {
  tableDataInside: RoleClaim[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  roleIdParam!: any;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'page', header: 'page' },
    { field: 'operation', header: 'operation' },
  ];
  showDeleteModal: boolean = false;
  selectedRoleClaimId: number | null = null;
  originalRoleClaims: RoleClaim[] = [];
  filteredRoleClaims: RoleClaim[] = [];
  roleClaims$!: Observable<RoleClaim[]>;

  constructor(
    private router: Router,
    private facade: RoleClaimsFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const raw = this.route.snapshot.paramMap.get('roleId');
    this.roleIdParam = raw !== null ? Number(raw) : undefined;
    this.facade.loadRoleClaimsByRoleId(this.roleIdParam);
    this.roleClaims$ = this.facade.items$;

    this.roleClaims$
      .pipe(
        takeUntil(this.destroy$),

        // 1) log raw
        tap((rawList) => console.log('[View] rawList =', rawList)),

        // 2) map → inject page & operation names
        map((list) =>
          (list ?? [])
            .map((r) => ({
              ...r,

              // pull the actual names (or fall back to an ID/code or a dash)
              page:
                r.pageOperation?.page?.name ??
                `Page ${r.pageOperation?.pageId}`,
              operation:
                r.pageOperation?.operation?.name ??
                `Op ${r.pageOperation?.operationId}`,

              // (optional) if you also want role name
              role: r.role?.name ?? '—',
            }))
            .sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
        ),

        // 3) log formatted
        tap((formatted) => console.log('[View] formatted =', formatted))
      )
      .subscribe((formatted) => {
        this.filteredRoleClaims = formatted;
        this.originalRoleClaims = formatted;
        this.tableDataInside = formatted; // if you’re using tableDataInside
      });
  }

  onAddRoleClaim() {
    const roleIdParam = this.route.snapshot.paramMap.get('roleId');

    this.router.navigate(['/organizations/add-role-claim'], {
      queryParams: { mode: 'add', roleId: roleIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteRoleClaim(roleClaimId: any): void {
    console.log(
      '[View] onDeleteRoleClaim() – opening modal for id=',
      roleClaimId
    );
    this.selectedRoleClaimId = roleClaimId;
    this.showDeleteModal = true;
  }

  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) =>
      this.facade.delete(id, this.roleIdParam)
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
    this.roleClaims$ = this.facade.items$;
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
    this.selectedRoleClaimId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredRoleClaims = this.originalRoleClaims.filter((roleClaim) =>
      Object.values(roleClaim).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditRoleClaim(roleClaim: RoleClaim) {
    this.router.navigate(['/organizations/edit-role-claim', roleClaim.id], {
      queryParams: {
        mode: 'edit',
        roleId: this.roleIdParam, // <-- use "currencyId" here
      },
    });
  }
  onViewRoleClaim(ct: RoleClaim) {
    this.router.navigate(['/organizations/edit-role-claim', ct.id], {
      queryParams: {
        mode: 'view',
        roleId: this.roleIdParam, // <-- use "currencyId" here
      },
    });
  }
}
