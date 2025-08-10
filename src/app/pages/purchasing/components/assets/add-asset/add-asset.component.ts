import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  combineLatest,
  filter,
  firstValueFrom,
  Observable,
  of,
  startWith,
  take,
  withLatestFrom,
} from 'rxjs';
import { AssetsFacade } from '../../../store/assets/assets.facade';
import { Asset } from '../../../store/assets/asset.model';
import { AssetType } from '../../../../lookups/store/asset-types/asset-type.model';
import { AssetTypesFacade } from '../../../../lookups/store/asset-types/asset-types.facade';
import { VehicleManufacturer } from '../../../../lookups/store/vehicle-manufacturers/vehicle-manufacturer.model';
import { VehicleManufacturersFacade } from '../../../../lookups/store/vehicle-manufacturers/vehicle-manufacturers.facade';
import { VehicleModel } from '../../../../lookups/store/vehicle-models/vehicle-model.model';
import { VehicleModelsFacade } from '../../../../lookups/store/vehicle-models/vehicle-models.facade';
import { VehiclesFacade } from '../../../store/vehicles/vehicles.facade';
type FormType = 'vehicle' | 'property' | 'equipment';

interface AssetFormStrategy<T = any> {
  /** Load required lookups before patching values into selects */
  ensureLookupsLoaded(): Observable<unknown>;
  /** Load the type-specific entity by the common Asset ID (or any key you use) */
  loadSpecificByAssetId(assetId: number): void;
  /** Stream for the loaded type-specific entity */
  specific$: Observable<T | null | undefined>;
  /** Patch the type-specific form */
  patchSpecificForm(entity: T): void;
  /** Create and Update handlers for this type */
  create(payload: any): void;
  update(id: number, payload: any): void;
}

@Component({
  selector: 'app-add-asset',
  standalone: false,
  templateUrl: './add-asset.component.html',
  styleUrl: './add-asset.component.scss',
})
export class AddAssetComponent {
  addAssetForm!: FormGroup;
  addVehicleForm!: FormGroup;
  addPropertyForm!: FormGroup;
  addEquipmentForm!: FormGroup;
  selectedAssetType: any;
  dropdownAssetTypeItems: any[] = [];
  selectedAsset$!: Observable<any>;
  public editMode: boolean = false;
  public assetId: any = null;
  formGroup!: FormGroup;
  public activeTabIndex = 0; // 0 = company, 1 = individual
  individualCode!: any;
  viewOnly = false;
  addAssetShowInfo = false;
  assetTypes$!: Observable<AssetType[]>;
  vehicleManufacturers$!: Observable<VehicleManufacturer[]>;
  vehicleModels$!: Observable<VehicleModel[]>;
  assetTypeComponentMap: Record<string, string> = {
    PASS_VEH: 'vehicle',
    COMM_VEH: 'vehicle',
    IT_EQUIP: 'equipment',
    OTH_EQUIP: 'equipment',
    PLANT_MACH: 'equipment',
    RE_LAND: 'property',
    RE_BUILD: 'property',
  };
  selectedAssetTypeCode: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private assetsFacade: AssetsFacade,
    private assetTypesFacade: AssetTypesFacade,
    private vehicleManufacturersFacade: VehicleManufacturersFacade,
    private vehicleModelsFacade: VehicleModelsFacade,
    private vehiclesFacade: VehiclesFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('🔧 ngOnInit start', {
      snapshot: this.route.snapshot,
      queryParams: this.route.snapshot.queryParams,
    });

    this.buildAssetForm();
    this.buildVehicleForm();
    this.buildEquipmentForm();
    this.buildPropertyForm();

    // Load lookups
    this.assetTypesFacade.loadAll();
    this.assetTypes$ = this.assetTypesFacade.all$;

    this.vehicleManufacturersFacade.loadAll();
    this.vehicleManufacturers$ = this.vehicleManufacturersFacade.all$;

    this.vehicleModelsFacade.loadAll();
    this.vehicleModels$ = this.vehicleModelsFacade.all$;

    // Watch assetTypeId (initial + user changes)
    this.addAssetForm
      .get('assetTypeId')
      ?.valueChanges.pipe(
        startWith(this.addAssetForm.get('assetTypeId')?.value),
        withLatestFrom(this.assetTypes$)
      )
      .subscribe(([selectedId, types]) => {
        const selected = types?.find((t) => t.id === selectedId);
        this.selectedAssetTypeCode = selected?.code ?? null; // PASS_VEH -> 'vehicle' via your map
      });

    // EDIT MODE
    this.assetId =
      this.route.snapshot.params['id'] ??
      this.route.snapshot.queryParams['assetId'];
    this.editMode = !!this.assetId;
    if (this.editMode) this.patchOnEdit(+this.assetId);
  }

  ngOnDestroy(): void {
    console.log('🗑️ ngOnDestroy: clearing selected asset');
    this.assetsFacade.clearSelected();
  }
  private strategies: Record<FormType, AssetFormStrategy> = {
    vehicle: {
      ensureLookupsLoaded: () =>
        combineLatest([this.vehicleManufacturers$, this.vehicleModels$]).pipe(
          take(1)
        ),
      loadSpecificByAssetId: (assetId: number) => {
        // adapt to your API (by assetId or by its own id)
        this.vehiclesFacade.loadById(assetId);
      },
      specific$: this.vehiclesFacade.selected$, // or selectByAssetId$(...)
      patchSpecificForm: (v: any) => this.patchVehicleForm(v),
      create: (payload) => this.vehiclesFacade.create(payload),
      update: (id, payload) => this.vehiclesFacade.update(id, payload),
    },

    property: {
      ensureLookupsLoaded: () => of(true).pipe(take(1)), // add lookups if any
      loadSpecificByAssetId: (assetId: number) => {
        // this.propertiesFacade.loadByAssetId(assetId);
      },
      specific$: of(null), // replace with this.propertiesFacade.selected$
      patchSpecificForm: (p: any) => this.patchPropertyForm(p),
      create: (payload) => {
        // this.propertiesFacade.create(payload);
      },
      update: (id, payload) => {
        // this.propertiesFacade.update(id, payload);
      },
    },

    equipment: {
      ensureLookupsLoaded: () => of(true).pipe(take(1)),
      loadSpecificByAssetId: (assetId: number) => {
        // this.equipmentsFacade.loadByAssetId(assetId);
      },
      specific$: of(null), // replace with this.equipmentsFacade.selected$
      patchSpecificForm: (e: any) => this.patchEquipmentForm(e),
      create: (payload) => {
        // this.equipmentsFacade.create(payload);
      },
      update: (id, payload) => {
        // this.equipmentsFacade.update(id, payload);
      },
    },
  };

  private patchOnEdit(id: number) {
    this.assetsFacade.loadById(id);

    const asset$ = this.assetsFacade.selected$; // common asset
    combineLatest([asset$, this.assetTypes$])
      .pipe(
        filter(([asset, types]) => !!asset && !!types?.length),
        take(1)
      )
      .subscribe(async ([asset, types]) => {
        // Resolve form type
        const type = types.find((t) => t.id === asset!.assetTypeId);
        this.selectedAssetTypeCode = type?.code ?? null;
        const formType = this.selectedAssetTypeForm as FormType | null;
        this.patchCommonForm(asset!);

        if (!formType) return;

        const strat = this.strategies[formType];
        // ensure lookups exist before patching selects
        await firstValueFrom(strat.ensureLookupsLoaded());

        // load + read specific entity, then patch
        strat.loadSpecificByAssetId(asset!.id);
        const specific = await firstValueFrom(
          strat.specific$.pipe(filter(Boolean), take(1))
        );
        strat.patchSpecificForm(specific);
      });
  }

  private patchCommonForm(asset: Asset): void {
    this.addAssetForm.patchValue({
      id: asset.id,
      description: asset.description,
      descriptionAr: asset.descriptionAr,
      dateAcquired: asset['dateAcquired']
        ? new Date(asset['dateAcquired'])
        : null,
      assetTypeId: asset['assetTypeId'],
      leasingAgreementId: asset['leasingAgreementId'],
    });
    // If the assetTypeId is set, your valueChanges above will auto-set selectedAssetTypeCode
  }

  private patchVehicleForm(vehicle: any): void {
    // Expecting backend fields; map them to your form control names
    this.addVehicleForm.patchValue({
      vehiclesManufactureId: vehicle.vehiclesManufactureId,
      vehiclesModelId: vehicle.vehiclesModelId,
      modelCategory: vehicle.modelCategory,
      capacity: vehicle.capacity,
      horsepower: vehicle.horsepower,
      color: vehicle.color,
      chasisNumber: vehicle.chasisNumber,
      motorNumber: vehicle.motorNumber,
      keyId: vehicle.keyId,
      geerChoice: vehicle.geerChoice,
      manufactureYear: vehicle.manufactureYear,
      currentValue: vehicle.currentValue,
      isRequiredMaintenance: !!vehicle.isRequiredMaintenance,
      isRequiredKMReading: !!vehicle.isRequiredKMReading,
    });
  }

  private patchPropertyForm(property: any): void {
    // Add property-specific mappings here
    this.addPropertyForm.patchValue({
      // id: property.id,  // usually not needed here (already in common)
      // e.g., deedNumber: property.deedNumber,
      // area: property.area,
      // address: property.address,
    });
  }

  private patchEquipmentForm(equipment: any): void {
    // Add equipment-specific mappings here
    this.addEquipmentForm.patchValue({
      // serialNumber: equipment.serialNumber,
      // brand: equipment.brand,
      // model: equipment.model,
    });
  }

  get selectedAssetTypeForm(): string | null {
    if (!this.selectedAssetTypeCode) return null;
    return this.assetTypeComponentMap[this.selectedAssetTypeCode] ?? null;
  }

  close() {
    console.log('Navigating back to view-assets');
    this.router.navigate(['/purchasing/assets/view-assets']);
  }

  buildAssetForm(): void {
    this.addAssetForm = this.fb.group({
      id: [null],
      description: ['', Validators.required],
      descriptionAr: [
        '',
        [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)],
      ],
      dateAcquired: [null, Validators.required],
      assetTypeId: ['', Validators.required],
      leasingAgreementId: ['', Validators.required],
    });
  }
  buildEquipmentForm(): void {
    this.addEquipmentForm = this.fb.group({
      id: [null],
      description: ['', Validators.required],
      descriptionAr: [
        '',
        [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)],
      ],
      dateAcquired: [null, Validators.required],
      assetTypeId: ['', Validators.required],
      leasingAgreementId: ['', Validators.required],
    });
  }
  buildPropertyForm(): void {
    this.addPropertyForm = this.fb.group({
      id: [null],
      description: ['', Validators.required],
      descriptionAr: [
        '',
        [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)],
      ],
      dateAcquired: [null, Validators.required],
      assetTypeId: ['', Validators.required],
      leasingAgreementId: ['', Validators.required],
    });
  }
  buildVehicleForm(): void {
    this.addVehicleForm = this.fb.group({
      id: [null],
      vehiclesManufactureId: ['', Validators.required],
      vehiclesModelId: ['', Validators.required],
      modelCategory: ['', Validators.required],
      capacity: ['', Validators.required],
      horsepower: ['', Validators.required],
      color: ['', Validators.required],
      chasisNumber: ['', Validators.required],
      motorNumber: ['', Validators.required],
      keyId: ['', Validators.required],
      geerChoice: ['', Validators.required],
      manufactureYear: ['', Validators.required],
      currentValue: ['', Validators.required],
      isRequiredMaintenance: [true, Validators.required],
      isRequiredKMReading: [true, Validators.required],
    });
  }

  saveInfo(): void {
    const formType = this.selectedAssetTypeForm as FormType | null;
    if (!formType) {
      console.error('No asset type selected.');
      return;
    }

    if (this.addAssetForm.invalid) {
      this.addAssetForm.markAllAsTouched();
      return;
    }

    let payload = { ...this.addAssetForm.value };

    if (formType === 'vehicle') {
      if (this.addVehicleForm.invalid) {
        this.addVehicleForm.markAllAsTouched();
        return;
      }
      payload = { ...payload, ...this.addVehicleForm.value };
    }
    if (formType === 'property') {
      if (this.addPropertyForm.invalid) {
        this.addPropertyForm.markAllAsTouched();
        return;
      }
      payload = { ...payload, ...this.addPropertyForm.value };
    }
    if (formType === 'equipment') {
      if (this.addEquipmentForm.invalid) {
        this.addEquipmentForm.markAllAsTouched();
        return;
      }
      payload = { ...payload, ...this.addEquipmentForm.value };
    }

    const strat = this.strategies[formType];
    if (this.editMode) strat.update(this.assetId, payload);
    else strat.create(payload);

    this.addAssetForm.markAsPristine();
    this.router.navigate(['/purchasing/assets/view-assets']);
  }

  canDeactivate(): boolean {
    return !this.addAssetForm.dirty;
  }
}
