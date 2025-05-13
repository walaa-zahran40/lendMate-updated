import { Component, ViewChild } from '@angular/core';
import { Roles } from '../../../../../shared/interfaces/roles.interface';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, filter } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { RolesFacade } from '../../../../organizations/store/roles/roles.facade';
import { Role } from '../../../../organizations/store/roles/role.model';

@Component({
  selector: 'app-view-roles',
  standalone: false,
  templateUrl: './view-roles.component.html',
  styleUrl: './view-roles.component.scss',
})
export class ViewRolesComponent {
  tableDataInside: Role[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'normalizedName', header: 'Normalized Name' },
  ];
  showDeleteModal: boolean = false;
  selectedRoleId: number | null = null;
  originalRoles: Role[] = [];
  filteredRoles: Role[] = [];
  roles$!: Observable<Role[]>;

  constructor(private router: Router, private facade: RolesFacade) {}
  ngOnInit() {
    this.facade.loadAll();
    this.facade.operationSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((op) => op?.entity === 'Role')
      )
      .subscribe(() => this.facade.loadAll());
    this.roles$ = this.facade.all$;

    this.roles$?.pipe(takeUntil(this.destroy$))?.subscribe((address) => {
      // products is now rentStructureType[], not any
      const activeCodes = address.filter((code) => code.isActive);
      const sorted = [...activeCodes].sort((a, b) => b?.id - a?.id);
      this.originalRoles = sorted;
      this.filteredRoles = [...sorted];
    });
  }

  onAddRole() {
    this.router.navigate(['/organizations/add-role']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteRole(roleId: any): void {
    console.log('[View] onDeleteRole() – opening modal for id=', roleId);
    this.selectedRoleId = roleId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedRoleId
    );
    if (this.selectedRoleId !== null) {
      this.facade.delete(this.selectedRoleId);
      console.log('[View] confirmDelete() – facade.delete() called');
    } else {
      console.warn('[View] confirmDelete() – no id to delete');
    }
    this.resetDeleteModal();
  }
  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedRoleId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredRoles = this.originalRoles.filter((role) =>
      Object.values(role).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditRole(role: Role) {
    this.router.navigate(['/organizations/edit-role', role.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewRole(ct: Role) {
    this.router.navigate(['/organizations/edit-role', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
  onAddSide(roleId: any) {
    this.router.navigate(['/organizations/wizard-roles', roleId]);
  }
}
