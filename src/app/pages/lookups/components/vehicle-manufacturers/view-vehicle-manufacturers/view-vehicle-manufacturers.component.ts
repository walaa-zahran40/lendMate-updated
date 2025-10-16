import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { VehicleManufacturer } from '../../../store/vehicle-manufacturers/vehicle-manufacturer.model';
import { VehicleManufacturersFacade } from '../../../store/vehicle-manufacturers/vehicle-manufacturers.facade';

@Component({
  selector: 'app-view-vehicle-manufacturers',
  standalone: false,
  templateUrl: './view-vehicle-manufacturers.component.html',
  styleUrl: './view-vehicle-manufacturers.component.scss',
})
export class ViewVehicleManufacturersComponent {
  tableDataInside: VehicleManufacturer[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedVehicleManufacturerId: number | null = null;
  originalVehicleManufacturer: VehicleManufacturer[] = [];
  filteredVehicleManufacturer: VehicleManufacturer[] = [];
  VehicleManufacturers$!: Observable<VehicleManufacturer[]>;

  constructor(
    private router: Router,
    private facade: VehicleManufacturersFacade
  ) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.VehicleManufacturers$ = this.facade.all$ as Observable<
      VehicleManufacturer[]
    >;
    this.facade.loadAll();

    this.VehicleManufacturers$.pipe(takeUntil(this.destroy$)).subscribe(
      (list) => {
        this.originalVehicleManufacturer = [...list].sort(
          (a, b) => b.id - a.id
        );
        this.filteredVehicleManufacturer = [
          ...this.originalVehicleManufacturer,
        ];
      }
    );
  }

  onAddVehicleManufacturer() {
    this.router.navigate(['/lookups/add-vehicle-manufacturer']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteVehicleManufacturer(VehicleManufacturerId: any): void {
    console.log(
      '[View] onDeleteVehicleManufacturer() – opening modal for id=',
      VehicleManufacturerId
    );
    this.selectedIds = [VehicleManufacturerId];
    this.showDeleteModal = true;
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
    this.VehicleManufacturers$ = this.facade.all$;
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
    this.selectedVehicleManufacturerId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredVehicleManufacturer = this.originalVehicleManufacturer.filter(
      (VehicleManufacturers) =>
        Object.values(VehicleManufacturers).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditVehicleManufacturer(VehicleManufacturer: VehicleManufacturer) {
    this.router.navigate(
      ['/lookups/edit-vehicle-manufacturer', VehicleManufacturer.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewVehicleManufacturer(ct: VehicleManufacturer) {
    this.router.navigate(['/lookups/edit-vehicle-manufacturer', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
