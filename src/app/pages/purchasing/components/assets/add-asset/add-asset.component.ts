import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  combineLatest,
  filter,
  firstValueFrom,
  map,
  Observable,
  of,
  startWith,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { AssetsFacade } from '../../../store/assets/assets.facade';
import { AssetType } from '../../../../lookups/store/asset-types/asset-type.model';
import { AssetTypesFacade } from '../../../../lookups/store/asset-types/asset-types.facade';
import { VehicleManufacturer } from '../../../../lookups/store/vehicle-manufacturers/vehicle-manufacturer.model';
import { VehicleManufacturersFacade } from '../../../../lookups/store/vehicle-manufacturers/vehicle-manufacturers.facade';
import { VehicleModel } from '../../../../lookups/store/vehicle-models/vehicle-model.model';
import { VehicleModelsFacade } from '../../../../lookups/store/vehicle-models/vehicle-models.facade';
import { VehiclesFacade } from '../../../store/vehicles/vehicles.facade';
import { EquipmentsFacade } from '../../../store/equipments/equipments.facade';
import { EntityNames } from '../../../../../shared/constants/entity-names';
import { propertiesFacade } from '../../../store/properties/properties.facade';
type FormType = 'vehicle' | 'property' | 'equipment';

type CrudOp = 'create' | 'update' | 'delete';

interface OpEvent {
  entity: string; // e.g. EntityNames.Equipment
  operation: CrudOp; // 'create' | 'update' | 'delete'
}

interface AssetFormStrategy<T = any> {
  ensureLookupsLoaded(): Observable<unknown>;
  loadSpecificByAssetId(assetId: number): void;
  specific$(assetId: number): Observable<T | null | undefined>;
  patchSpecificForm(entity: T): void;
  create(payload: any): void;
  update(id: number, payload: any): void;

  // add these:
  success$: Observable<OpEvent>;
  entityName: string;
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
  private DEBUG = true;
  private d(...args: any[]) {
    if (this.DEBUG) console.log('[AddAsset]', ...args);
  }
  private patching = false;
  private readonly detailsStepMap: Record<FormType, boolean> = {
    vehicle: true,
    equipment: true,
    property: false, // <-- single-step
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private assetsFacade: AssetsFacade,
    private assetTypesFacade: AssetTypesFacade,
    private vehicleManufacturersFacade: VehicleManufacturersFacade,
    private vehicleModelsFacade: VehicleModelsFacade,
    private vehiclesFacade: VehiclesFacade,
    private router: Router,
    private equipmentsFacade: EquipmentsFacade,
    private propertiesFacade: propertiesFacade
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

    // Read id + typeCode directly
    this.assetId =
      this.route.snapshot.params['id'] ??
      this.route.snapshot.queryParams['assetId'];
    const mode = this.route.snapshot.queryParams['mode'] as string | undefined;
    this.viewOnly = mode === 'view';

    console.log('route', this.route.snapshot);
    const typeCodeFromRoute = this.route.snapshot.queryParams['typeCode'] as
      | string
      | undefined;

    if (typeCodeFromRoute) {
      // Example: PASS_VEH / IT_EQUIP / RE_BUILD...
      this.selectedAssetTypeCode = typeCodeFromRoute;
    }

    // Only allow editing when NOT in view mode
    this.editMode = !!this.assetId && !this.viewOnly;
    if (this.editMode || this.viewOnly) {
      // both view & edit need data
      this.patchOnEdit(+this.assetId);
    }
    if (this.viewOnly) {
      // disable after patch so valueChanges (for assetTypeId -> code) have already fired
      this.addAssetForm.disable({ emitEvent: false });
      this.addVehicleForm.disable({ emitEvent: false });
      this.addEquipmentForm.disable({ emitEvent: false });
      this.addPropertyForm.disable({ emitEvent: false });
      this.d('[AddAsset] View mode: all forms disabled');
    }
  }

  ngOnDestroy(): void {
    console.log('🗑️ ngOnDestroy: clearing selected asset');
    this.assetsFacade.clearSelected();
  }
  get needsSecondStep(): boolean {
    const t = this.selectedAssetTypeForm as FormType | null;
    return !!t && this.detailsStepMap[t];
  }

  private strategies: Record<FormType, AssetFormStrategy> = {
    vehicle: {
      ensureLookupsLoaded: () =>
        combineLatest([this.vehicleManufacturers$, this.vehicleModels$]).pipe(
          take(1)
        ),
      loadSpecificByAssetId: (assetId) =>
        this.vehiclesFacade.loadByAssetId(assetId),
      specific$: (assetId) => this.vehiclesFacade.selectedByAssetId(assetId),
      patchSpecificForm: (v) => this.patchVehicleForm(v),
      create: (p) => this.vehiclesFacade.create(p),
      update: (id, p) => this.vehiclesFacade.update(id, p),
      success$: this.vehiclesFacade.operationSuccess$.pipe(
        filter((e): e is { entity: string; operation: string } => !!e),
        map((e) => ({ entity: e.entity, operation: e.operation as CrudOp }))
      ),
      entityName: EntityNames.Vehicle, // 👈
    },
    property: {
      ensureLookupsLoaded: () => of(true).pipe(take(1)),
      loadSpecificByAssetId: (assetId) =>
        this.propertiesFacade.loadByAssetId(assetId),
      specific$: (assetId) => this.propertiesFacade.selectedByAssetId(assetId),
      patchSpecificForm: (p) => this.patchPropertyForm(p),
      create: (p) => this.propertiesFacade.create(p),
      update: (id, p) => this.propertiesFacade.update(id, p),
      success$: this.propertiesFacade.operationSuccess$.pipe(
        filter((e): e is { entity: string; operation: string } => !!e),
        map((e) => ({ entity: e.entity, operation: e.operation as CrudOp }))
      ),
      entityName: EntityNames.Property, // 👈
    },
    equipment: {
      ensureLookupsLoaded: () => of(true).pipe(take(1)),
      loadSpecificByAssetId: (assetId) =>
        this.equipmentsFacade.loadByAssetId(assetId),
      specific$: (assetId) => this.equipmentsFacade.selectedByAssetId(assetId),
      patchSpecificForm: (e) => this.patchEquipmentForm(e),
      create: (p) => this.equipmentsFacade.create(p),
      update: (id, p) => this.equipmentsFacade.update(id, p),
      success$: this.equipmentsFacade.operationSuccess$.pipe(
        filter((e): e is { entity: string; operation: string } => !!e),
        map((e) => ({ entity: e.entity, operation: e.operation as CrudOp }))
      ),
      entityName: EntityNames.Equipment, // 👈
    },
  };

  private async patchOnEdit(assetId: number) {
    if (this.patching) {
      console.warn('[AddAsset] patchOnEdit already running — skip');
      return;
    }
    this.patching = true;

    try {
      this.d('patchOnEdit:start', {
        assetId,
        selectedAssetTypeCode: this.selectedAssetTypeCode,
      });

      const formType = this.selectedAssetTypeForm as FormType | null;
      if (!formType) {
        console.error(
          '[AddAsset] ❌ No form type (typeCode) provided in route.'
        );
        return;
      }

      const strat = this.strategies[formType];
      if (!strat) {
        console.error('[AddAsset] ❌ No strategy for formType=', formType);
        return;
      }

      console.time(`[AddAsset] ensureLookupsLoaded:${formType}`);
      await firstValueFrom(strat.ensureLookupsLoaded());
      console.timeEnd(`[AddAsset] ensureLookupsLoaded:${formType}`);

      // 👉 Subscribe FIRST so we can’t miss the emission
      this.d(`[AddAsset] Pre-subscribing to specific$ (${formType})`, {
        assetId,
      });
      const specificOnce$ = strat.specific$(assetId).pipe(
        tap((v) => this.d(`[AddAsset] specific$ (${formType}) tick:`, v)),
        filter(Boolean),
        take(1)
      );

      // Now dispatch the load
      this.d(`[AddAsset] Dispatch loadSpecificByAssetId (${formType})`, {
        assetId,
      });
      strat.loadSpecificByAssetId(assetId);

      console.time(`[AddAsset] waitSpecific:${formType}`);
      const specific = await firstValueFrom(specificOnce$);
      console.timeEnd(`[AddAsset] waitSpecific:${formType}`);
      this.d(`[AddAsset] specific$ emitted (${formType}):`, specific);

      // For logging: pick the correct form
      const targetForm =
        formType === 'vehicle'
          ? this.addVehicleForm
          : formType === 'property'
          ? this.addPropertyForm
          : this.addEquipmentForm;

      this.d(
        `[AddAsset] Before patch (${formType}):`,
        targetForm.getRawValue()
      );
      strat.patchSpecificForm(specific as any);
      this.d(
        `[AddAsset] After patch (${formType}):`,
        targetForm.getRawValue(),
        'status:',
        targetForm.status
      );
    } catch (err) {
      console.error('[AddAsset] patchOnEdit error:', err);
    } finally {
      this.patching = false;
    }
  }

  private patchVehicleForm(vehicle: any): void {
    // Expecting backend fields; map them to your form control names
    this.addAssetForm.patchValue({
      id: vehicle.id,
      description: vehicle.description,
      descriptionAr: vehicle.descriptionAr,
      dateAcquired: vehicle.dateAcquired,
      leasingAgreementId: vehicle.leasingAgreementId,
      assetTypeId: vehicle.assetTypeId,
    });
    this.addVehicleForm.patchValue({
      id: vehicle.id,
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
  private patchEquipmentForm(equipment: any): void {
    console.log('patch equip form');
    // Expecting backend fields; map them to your form control names
    this.addAssetForm.patchValue({
      id: equipment.id,
      description: equipment.description,
      descriptionAr: equipment.descriptionAr,
      dateAcquired: equipment.dateAcquired,
      leasingAgreementId: equipment.leasingAgreementId,
      assetTypeId: equipment.assetTypeId,
    });
    this.addEquipmentForm.patchValue({
      id: equipment.id,
      machineManufacture: equipment.machineManufacture,
      modelDescription: equipment.modelDescription,
      manufactureYear: equipment.manufactureYear,
      serialNumber: equipment.serialNumber,
      currentValue: equipment.currentValue,
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

      machineManufacture: ['', Validators.required],
      modelDescription: ['', Validators.required],
      manufactureYear: ['', Validators.required],
      serialNumber: ['', Validators.required],
      currentValue: [0, Validators.required],
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
    if (!formType) return;

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
    } else {
      if (this.addEquipmentForm.invalid) {
        this.addEquipmentForm.markAllAsTouched();
        return;
      }
      payload = { ...payload, ...this.addEquipmentForm.value };
    }

    const strat = this.strategies[formType];
    const opWanted: CrudOp = this.editMode ? 'update' : 'create';

    // const successSub = strat.success$
    //   .pipe(
    //     filter(
    //       (e) => e.entity === strat.entityName && e.operation === opWanted
    //     ),
    //     take(1)
    //   )
    //   .subscribe(() => {
    //     this.assetsFacade.loadAll();
    //     this.router.navigate(['/purchasing/assets/view-assets']);
    //   });

    if (this.editMode) {
      const specificId =
        formType === 'equipment'
          ? this.addEquipmentForm.value.id
          : formType === 'vehicle'
          ? this.addVehicleForm.value.id
          : this.addPropertyForm.value.id;

      // safety log
      this.d(
        '[AddAsset] update with specificId:',
        specificId,
        'payload:',
        payload
      );

      strat.update(specificId, payload);
    } else {
      strat.create(payload);
    }

    this.addAssetForm.markAsPristine();
  }

  canDeactivate(): boolean {
    return !this.addAssetForm.dirty;
  }
}
