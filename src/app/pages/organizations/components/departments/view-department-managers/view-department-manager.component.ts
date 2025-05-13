  import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
  import { TableComponent } from '../../../../../shared/components/table/table.component';
  import {  map, Observable, Subject, takeUntil, tap } from 'rxjs';
  import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentManager } from '../../../store/department-managers/department-manager.model';
import { DepartmentManagersFacade } from '../../../store/department-managers/department-managers.facade';
  
  @Component({
    selector: 'app-view-department-manager',
    standalone: false,
    templateUrl: './view-department-manager.component.html',
    styleUrl: './view-department-manager.component.scss',
  })
  export class ViewDepartmentManagerComponent implements OnInit, OnDestroy {
    tableDataInside: DepartmentManager[] = [];
    first2 = 0;
    rows = 10;
    showFilters = false;

    private destroy$ = new Subject<void>();
    departmentIdParam!: any;
  
    @ViewChild('tableRef') tableRef!: TableComponent;
  
    readonly colsInside = [
      { field: 'department', header: 'Department' },
      { field: 'officer', header: 'Officer' },
      { field: 'startDate', header: 'Start Date' },
      { field: 'isCurrent', header: 'Is Current' },
      { field: 'endDate', header: 'End Date' },
    ];
  
    showDeleteModal = false;
    selectedDepartmentManagerId: number | null = null;
    originalDepartmentManagers: DepartmentManager[] = [];
    filteredDepartmentManagers: DepartmentManager[] = [];
    departmentManagers$!: Observable<DepartmentManager[]>;
  
    constructor(
      private router: Router,
      private facade: DepartmentManagersFacade,
      private route: ActivatedRoute
    ) {}
  
    ngOnInit() {
      // 1) Grab route param
      console.log('📍 Route snapshot:', this.route.snapshot);
      const raw = this.route.snapshot.params['departmentId'];
      this.departmentIdParam = raw !== null ? Number(raw) : undefined;
     
      console.log('[View] ngOnInit → departmentIdParam =', this.departmentIdParam);
     
      // 2) Validate param
      if (this.departmentIdParam == null || isNaN(this.departmentIdParam)) {
        console.error(
          '❌ Missing or invalid departmentIdParam! Cannot load department managers.'
        );
        return;
      }
     
      // 3) Trigger data load
      this.facade.loadDepartmentManagersByDepartmentId(this.departmentIdParam);
     
      // 4) Subscribe and transform the data
      this.facade.items$
        .pipe(
          takeUntil(this.destroy$),
     
          // Debug: raw object structure
          tap((raw:any) =>
            console.log('[View] facade.items$ raw =', raw)
          ),
     
          // Map over raw.items (assuming it's a paged response object)
          map((raw) => {
            const managers = raw?.items ?? []; // Failsafe
            return managers
              .map((r:any) => ({
                ...r,
                department: r.department?.name || '—',
                officer: r.officer?.name || '—',
              }))
              .sort((a:any, b:any) => b.id - a.id);
          }),
     

          // Debug: post-mapping
          tap((formatted) =>
            console.log('[View] formatted department managers =', formatted)
          )
        )
        .subscribe((formatted) => {
          this.filteredDepartmentManagers = formatted;
          this.originalDepartmentManagers = formatted;
          console.log(
            '[View] Final result → filteredDepartmentManagers =',
            this.filteredDepartmentManagers
          );
        });
    } 
    onAddDepartmentManager() {
      const departmentIdParam = this.route.snapshot.paramMap.get('departmentId');
      console.log("Arwaaaaaaaaaaaaaaaaaaaaaaaaaa" , departmentIdParam);
  
      this.router.navigate(['/organizations/add-department-manager'], {
        queryParams: { mode: 'add', departmentId: departmentIdParam },
      });
    }
  
    ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
    }
  
    onDeleteDepartmentManager(departmentManagersId: number): void {
      console.log(
        '[View] onDeleteDepartmentManager() – opening modal for id=',
        departmentManagersId
      );
      this.selectedDepartmentManagerId = departmentManagersId;
      this.showDeleteModal = true;
    }
  
    confirmDelete() {
      if (this.selectedDepartmentManagerId != null) {
        this.facade.delete(
          this.selectedDepartmentManagerId,
          this.departmentIdParam
        );
      }
      this.resetDeleteModal();
    }
  
    cancelDelete() {
      this.resetDeleteModal();
    }
  
    resetDeleteModal() {
      this.showDeleteModal = false;
      this.selectedDepartmentManagerId = null;
    }
  
    onSearch(keyword: string) {
      const lower = keyword.toLowerCase();
      this.filteredDepartmentManagers =
        this.originalDepartmentManagers.filter((departmentManager) =>
          Object.values(departmentManager).some((val) =>
            val?.toString().toLowerCase().includes(lower)
          )
        );
    }
  
    onToggleFilters(value: boolean) {
      this.showFilters = value;
    }
  
    onEditDepartmentManager(exchange: DepartmentManager) {
      this.router.navigate(
        ['/organizations/edit-department-manager', exchange.id],
        {
          queryParams: {
            mode: 'edit',
            departmentId: this.departmentIdParam, // <-- use "departmentId" here
          },
        }
      );
    }
  
    onViewDepartmentManager(exchange: DepartmentManager) {
      this.router.navigate(
        ['/organizations/edit-department-manager', exchange.id],
        {
          queryParams: {
            mode: 'view',
            departmentId: this.departmentIdParam, // <-- and here
          },
        }
      );
    }
  }
  