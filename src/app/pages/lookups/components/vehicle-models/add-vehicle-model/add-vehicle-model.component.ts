import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, filter, take, Observable } from 'rxjs';
import { VehicleModelsFacade } from '../../../store/vehicle-models/vehicle-models.facade';
import { VehicleModel } from '../../../store/vehicle-models/vehicle-model.model';
import { VehicleManufacturer } from '../../../store/vehicle-manufacturers/vehicle-manufacturer.model';
import { VehicleManufacturersFacade } from '../../../store/vehicle-manufacturers/vehicle-manufacturers.facade';

@Component({
  selector: 'app-add-vehicle-model',
  standalone: false,
  templateUrl: './add-vehicle-model.component.html',
  styleUrl: './add-vehicle-model.component.scss',
})
export class AddVehicleModelComponent {
  editMode: boolean = false;
  viewOnly = false;
  addVehicleModelsLookupsForm!: FormGroup;
  clientId: any;
  vehicleManufacturers$!: Observable<VehicleManufacturer[]>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: VehicleModelsFacade,
    private router: Router,
    private facadeManufacturer: VehicleManufacturersFacade
  ) {}

  ngOnInit() {
    console.log('🔵 ngOnInit: start');

    // 1. Build the form
    this.addVehicleModelsLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: ['', [Validators.required]],
      nameAR: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\u0600-\u06FF\s0-9\u0660-\u0669]+$/),
        ],
      ],
      vehiclesManufactureId: ['', Validators.required],
      isActive: [true], // ← new hidden control
    });
    this.facadeManufacturer.loadAll();
    this.vehicleManufacturers$ = this.facadeManufacturer.all$;

    console.log(
      '🔵 Form initialized with default values:',
      this.addVehicleModelsLookupsForm.value
    );

    // 2. Watch route params
    this.route.paramMap.subscribe((params) => {
      console.log('🔵 Route paramMap:', params);
      const idParam = params.get('id');
      console.log('🔵 Retrieved id param:', idParam);

      if (idParam) {
        // edit mode
        this.editMode = true;
        this.clientId = +idParam;
        console.log('🔵 Entering EDIT mode for id =', this.clientId);

        // view-only?
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        console.log('🔵 viewOnly flag:', this.viewOnly);
        if (this.viewOnly) {
          this.addVehicleModelsLookupsForm.disable();
          console.log('🔵 Form disabled for view-only');
        }

        // load & patch
        console.log('🔵 Dispatching loadById for', this.clientId);
        this.facade.loadById(this.clientId);

        this.facade.selected$
          .pipe(
            tap((ct) => console.log('🔵 selected$ emission:', ct)),
            filter((ct): ct is VehicleModel => !!ct && ct.id === this.clientId),
            tap((ct) =>
              console.log('🔵 selected$ passed filter, patching form with:', ct)
            ),
            take(1)
          )
          .subscribe((ct) => {
            this.addVehicleModelsLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              vehiclesManufactureId: ct!.vehiclesManufactureId,
              isActive: ct!.isActive,
            });
            console.log(
              '🔵 Form after patchValue:',
              this.addVehicleModelsLookupsForm.value
            );
          });
      } else {
        // add mode
        this.editMode = false;
        console.log('🔵 Entering ADD mode');

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        console.log('🔵 viewOnly flag (add mode):', this.viewOnly);
        if (this.viewOnly) {
          this.addVehicleModelsLookupsForm.disable();
          console.log('🔵 Form disabled for view-only in add mode');
        }
      }
    });
  }

  addOrEditVehicleModels() {
    console.log('💥 addOrEditVehicleModels() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addVehicleModelsLookupsForm.valid);
    console.log('  form touched:', this.addVehicleModelsLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addVehicleModelsLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addVehicleModelsLookupsForm.get('name');
    const nameARCtrl = this.addVehicleModelsLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addVehicleModelsLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addVehicleModelsLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, vehiclesManufactureId, isActive } =
      this.addVehicleModelsLookupsForm.value;
    const payload: Partial<VehicleModel> = {
      name,
      nameAR,
      vehiclesManufactureId,
      isActive,
    };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, vehiclesManufactureId, isActive } =
        this.addVehicleModelsLookupsForm.value;
      const payload: VehicleModel = {
        id,
        name,
        nameAR,
        vehiclesManufactureId,
        isActive,
      };
      console.log(
        '🔄 Dispatching UPDATE id=',
        this.clientId,
        ' payload=',
        payload
      );
      this.facade.update(id, payload);
    } else {
      console.log('➕ Dispatching CREATE payload=', payload);
      this.facade.create(payload);
    }
    if (this.addVehicleModelsLookupsForm.valid) {
      this.addVehicleModelsLookupsForm.markAsPristine();
    }

    this.router.navigate(['/lookups/view-vehicle-models']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addVehicleModelsLookupsForm.dirty;
  }
}
