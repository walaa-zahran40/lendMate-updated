import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { VehicleModel } from '../../../store/vehicle-models/vehicle-model.model';
import { VehicleModelsFacade } from '../../../store/vehicle-models/vehicle-models.facade';

@Component({
  selector: 'app-view-vehicle-models',
  standalone: false,
  templateUrl: './view-vehicle-models.component.html',
  styleUrl: './view-vehicle-models.component.scss',
})
export class ViewVehicleModelsComponent {
  tableDataInside: VehicleModel[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    // { field: 'vehiclesManufactureId', header: 'Vehicle Manufacturer' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedVehicleModelId: number | null = null;
  originalVehicleModel: VehicleModel[] = [];
  filteredVehicleModel: VehicleModel[] = [];
  VehicleModels$!: Observable<VehicleModel[]>;

  constructor(private router: Router, private facade: VehicleModelsFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.VehicleModels$ = this.facade.all$ as Observable<VehicleModel[]>;
    this.facade.loadAll();

    this.VehicleModels$.pipe(takeUntil(this.destroy$)).subscribe((list) => {
      this.originalVehicleModel = [...list].sort((a, b) => b.id - a.id);
      this.filteredVehicleModel = [...this.originalVehicleModel];
    });
  }

  onAddVehicleModel() {
    this.router.navigate(['/lookups/add-vehicle-model']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteVehicleModel(VehicleModelId: any): void {
    console.log(
      '[View] onDeleteVehicleModel() – opening modal for id=',
      VehicleModelId
    );
    this.selectedIds = [VehicleModelId];
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
    this.VehicleModels$ = this.facade.all$;
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
    this.selectedVehicleModelId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredVehicleModel = this.originalVehicleModel.filter(
      (VehicleModels) =>
        Object.values(VehicleModels).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditVehicleModel(VehicleModel: VehicleModel) {
    this.router.navigate(['/lookups/edit-vehicle-model', VehicleModel.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewVehicleModel(ct: VehicleModel) {
    this.router.navigate(['/lookups/edit-vehicle-model', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
