import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  filter,
  firstValueFrom,
  map,
  merge,
  Observable,
  of,
  race,
  startWith,
  take,
  tap,
  timeout,
  timer,
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
  private originalFormType: FormType | null = null;

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
  private formType$ = new BehaviorSubject<FormType | null>(null);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleModelsFacade: VehicleModelsFacade,
    private assetsFacade: AssetsFacade,
    private assetTypesFacade: AssetTypesFacade,
    private vehicleManufacturersFacade: VehicleManufacturersFacade,
    private vehiclesFacade: VehiclesFacade,
    private equipmentsFacade: EquipmentsFacade,
    private propertiesFacade: propertiesFacade
  ) {}

  async ngOnInit(): Promise<void> {
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

    const assetTypeIdCtrl = this.addAssetForm.get('assetTypeId')!;
    combineLatest([
      assetTypeIdCtrl.valueChanges.pipe(startWith(assetTypeIdCtrl.value)),
      this.assetTypes$,
    ]).subscribe(([selectedId, types]) => {
      const selected = types?.find((t) => t.id === selectedId);
      const nextCode = selected?.code ?? null;
      const nextFormType = nextCode
        ? (this.assetTypeComponentMap[nextCode] as FormType)
        : null;
      this.selectedAssetTypeCode = nextCode;
      if (nextFormType) {
        // push new type to stream used by patch/save logic
        this.formType$.next(nextFormType);

        // 🔁 Clear other detail forms to avoid accidental "update" on old record
        this.resetDetailFormsFor(nextFormType);
      }
    });

    this.assetId =
      this.route.snapshot.params['id'] ??
      this.route.snapshot.queryParams['assetId'];
    const typeCodeFromRoute = this.route.snapshot.queryParams['typeCode'] as
      | string
      | undefined;
    if (typeCodeFromRoute) this.selectedAssetTypeCode = typeCodeFromRoute;

    this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
    this.editMode = !!this.assetId && !this.viewOnly;

    if (this.editMode || this.viewOnly) {
      console.log('[gate] before detect:', {
        assetId: this.assetId,
        selectedAssetTypeCode: this.selectedAssetTypeCode,
        selectedAssetTypeForm: this.selectedAssetTypeForm,
      });
      if (!this.selectedAssetTypeForm) {
        const decided = await this.detectFormType(+this.assetId);
        // reflect both the code & the raw form type
        this.formType$.next(decided);
      } else {
        this.formType$.next(this.selectedAssetTypeForm as FormType);
      }
      const decided = !this.selectedAssetTypeForm
        ? await this.detectFormType(+this.assetId)
        : (this.selectedAssetTypeForm as FormType);

      this.originalFormType = decided; // 👈 remember original
      this.formType$.next(decided);
      await this.patchOnEdit(+this.assetId);

      if (this.viewOnly) {
        this.addAssetForm.disable({ emitEvent: false });
        this.addVehicleForm.disable({ emitEvent: false });
        this.addEquipmentForm.disable({ emitEvent: false });
        this.addPropertyForm.disable({ emitEvent: false });
      }
    }
  }

  ngOnDestroy(): void {
    console.log('🗑️ ngOnDestroy: clearing selected asset');
    this.assetsFacade.clearSelected();
  }
  private resetDetailFormsFor(t: FormType) {
    const nullId = () => ({ id: null });

    if (t === 'vehicle') {
      this.addEquipmentForm.reset(nullId());
      this.addPropertyForm.reset(nullId());
    } else if (t === 'equipment') {
      this.addVehicleForm.reset(nullId());
      this.addPropertyForm.reset(nullId());
    } else if (t === 'property') {
      this.addVehicleForm.reset(nullId());
      this.addEquipmentForm.reset(nullId());
    }

    // keep base form values; only ensure detail ids are null for the inactive ones
    this.addVehicleForm.patchValue({
      id: this.addVehicleForm.value?.id ?? null,
    });
    this.addEquipmentForm.patchValue({
      id: this.addEquipmentForm.value?.id ?? null,
    });
    this.addPropertyForm.patchValue({
      id: this.addPropertyForm.value?.id ?? null,
    });
  }

  private async detectFormType(assetId: number): Promise<FormType> {
    console.log('🧭 detectFormType start for assetId=', assetId);

    // Kick off all 3 loads (in case effects depend on first subscription)
    this.vehiclesFacade.loadByAssetId(assetId);
    this.equipmentsFacade.loadByAssetId(assetId);
    this.propertiesFacade.loadByAssetId(assetId);

    const vehicle$ = this.vehiclesFacade.selectedByAssetId(assetId).pipe(
      tap((v) => console.log('🔔 vehicle selectedByAssetId emitted:', v)),
      filter(Boolean),
      take(1),
      map(() => 'vehicle' as FormType)
    );
    const equipment$ = this.equipmentsFacade.selectedByAssetId(assetId).pipe(
      tap((e) => console.log('🔔 equipment selectedByAssetId emitted:', e)),
      filter(Boolean),
      take(1),
      map(() => 'equipment' as FormType)
    );
    const property$ = this.propertiesFacade.selectedByAssetId(assetId).pipe(
      tap((p) => console.log('🔔 property selectedByAssetId emitted:', p)),
      filter(Boolean),
      take(1),
      map(() => 'property' as FormType)
    );

    // Race the first emission vs. a timeout
    const result = await firstValueFrom(
      race(
        merge(vehicle$, equipment$, property$),
        timer(8000).pipe(map(() => null))
      )
    );

    if (!result) {
      console.warn('⏳ detectFormType timed out after 8s—falling back.');

      // Prefer an explicit route hint if present
      if (this.selectedAssetTypeCode) {
        const fallback =
          (this.assetTypeComponentMap[
            this.selectedAssetTypeCode
          ] as FormType) ?? null;
        if (fallback) {
          console.log(
            '🛟 Using fallback based on selectedAssetTypeCode:',
            this.selectedAssetTypeCode,
            '→',
            fallback
          );
          return fallback;
        }
      }

      // As a last resort, default to 'vehicle' (or choose what makes sense)
      console.log('🛟 Using hard fallback to "vehicle".');
      return 'vehicle';
    }

    console.log('✅ detectFormType decided:', result);
    this.selectedAssetTypeCode =
      Object.keys(this.assetTypeComponentMap).find(
        (k) => this.assetTypeComponentMap[k] === result
      ) ?? this.selectedAssetTypeCode; // keep existing code if mapping not found
    this.setCodeFromFormType(result);
    this.formType$.next(result);

    return result;
  }
  private setCodeFromFormType(t: FormType) {
    // pick a stable code for each type
    const defaults: Record<FormType, string> = {
      vehicle: 'PASS_VEH',
      equipment: 'IT_EQUIP',
      property: 'RE_LAND',
    };
    this.selectedAssetTypeCode = defaults[t];
  }
  // helper
  private get currentFormType(): FormType | null {
    return (this.selectedAssetTypeForm as FormType) ?? null;
  }

  get typeChanged(): boolean {
    return (
      !!this.originalFormType &&
      !!this.currentFormType &&
      this.originalFormType !== this.currentFormType
    );
  }

  get needsSecondStep(): boolean {
    const t = this.selectedAssetTypeForm as FormType | null;
    return !!t && this.detailsStepMap[t];
  }

  private strategies: Record<FormType, AssetFormStrategy> = {
    vehicle: {
      ensureLookupsLoaded: () =>
        combineLatest([
          this.assetTypes$.pipe(
            filter((a) => (a?.length ?? 0) > 0),
            take(1)
          ),
          this.vehicleManufacturers$.pipe(startWith([])),
          this.vehicleModels$.pipe(startWith([])),
        ]).pipe(
          tap(([mans, mods]) => console.log('🔍 lookups:', { mans, mods })),
          filter(
            ([types, mans, mods]) =>
              (types?.length ?? 0) > 0 &&
              (mans?.length ?? 0) > 0 &&
              (mods?.length ?? 0) > 0
          ),

          take(1)
        ),
      loadSpecificByAssetId: (assetId) =>
        this.vehiclesFacade.loadByAssetId(assetId),
      specific$: (assetId) => this.vehiclesFacade.selectedByAssetId(assetId),
      patchSpecificForm: (v) => {
        // 👇 patch both from same payload
        this.patchAssetFormFromSpecific(v);
        this.patchVehicleFormOnly(v);
      },
      create: (p) => this.vehiclesFacade.create(p),
      update: (id, p) => this.vehiclesFacade.update(id, p),
      success$: this.vehiclesFacade.operationSuccess$.pipe(
        filter((e): e is { entity: string; operation: string } => !!e),
        map((e) => ({ entity: e.entity, operation: e.operation as CrudOp }))
      ),
      entityName: EntityNames.Vehicle, // 👈
    },
    property: {
      ensureLookupsLoaded: () =>
        this.assetTypes$.pipe(
          filter((a) => (a?.length ?? 0) > 0),
          take(1)
        ),
      loadSpecificByAssetId: (assetId) =>
        this.propertiesFacade.loadByAssetId(assetId),
      specific$: (assetId) => this.propertiesFacade.selectedByAssetId(assetId),
      patchSpecificForm: (p) => {
        this.patchAssetFormFromSpecific(p);
        this.patchPropertyFormOnly(p);
      },
      create: (p) => this.propertiesFacade.create(p),
      update: (id, p) => this.propertiesFacade.update(id, p),
      success$: this.propertiesFacade.operationSuccess$.pipe(
        filter((e): e is { entity: string; operation: string } => !!e),
        map((e) => ({ entity: e.entity, operation: e.operation as CrudOp }))
      ),
      entityName: EntityNames.Property, // 👈
    },
    equipment: {
      ensureLookupsLoaded: () =>
        this.assetTypes$.pipe(
          filter((a) => (a?.length ?? 0) > 0),
          take(1)
        ),
      loadSpecificByAssetId: (assetId) =>
        this.equipmentsFacade.loadByAssetId(assetId),
      specific$: (assetId) => this.equipmentsFacade.selectedByAssetId(assetId),
      patchSpecificForm: (e) => {
        this.patchAssetFormFromSpecific(e);
        this.patchEquipmentFormOnly(e);
      },
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
    console.log('[patchOnEdit] enter', {
      assetId,
      patching: this.patching,
      formType: this.selectedAssetTypeForm,
    });
    if (this.patching) {
      console.warn('[patchOnEdit] SKIP: already patching=true');
      return;
    }
    this.patching = true;
    console.time('[patchOnEdit] duration');
    try {
      const formType = await firstValueFrom(
        this.formType$.pipe(
          filter((t): t is FormType => !!t),
          take(1)
        )
      );
      const strat = this.strategies[formType];
      if (!strat) {
        console.error('[patchOnEdit] ABORT: no strategy for', formType);
        return;
      }
      console.log('[patchOnEdit] strategy picked:', strat.entityName);

      // --- ensureLookupsLoaded debugging
      console.log('[patchOnEdit] waiting ensureLookupsLoaded…');

      await firstValueFrom(
        strat.ensureLookupsLoaded().pipe(
          tap(() => console.log('[patchOnEdit] ensureLookupsLoaded emitted')),
          timeout({ each: 8000 }),
          catchError((err) => {
            console.warn(
              '[patchOnEdit] ensureLookupsLoaded timeout/err → continue',
              err
            );
            return of(true);
          }),
          take(1)
        )
      );

      // --- specific$ debugging
      const specificOnce$ = strat
        .specific$(assetId)
        .pipe(filter(Boolean), take(1));

      console.log('[patchOnEdit] dispatch loadSpecificByAssetId', assetId);
      strat.loadSpecificByAssetId(assetId);

      console.log('[patchOnEdit] waiting specificOnce$…');
      const specific = await firstValueFrom(specificOnce$); // no race with timer

      if (!specific) {
        console.error('[patchOnEdit] ABORT: no specific entity received');
        return;
      }

      console.log('[patchOnEdit] patching forms…');
      strat.patchSpecificForm(specific as any);

      console.log('✅ patched asset:', this.addAssetForm.getRawValue());
      if (formType === 'vehicle') {
        console.log('✅ patched vehicle:', this.addVehicleForm.getRawValue());
      } else if (formType === 'equipment') {
        console.log(
          '✅ patched equipment:',
          this.addEquipmentForm.getRawValue()
        );
      } else if (formType === 'property') {
        console.log('✅ patched property:', this.addPropertyForm.getRawValue());
      }
    } finally {
      console.timeEnd('[patchOnEdit] duration');
      this.patching = false;
      console.log('[patchOnEdit] exit; patching reset to', this.patching);
    }
  }

  /** Step‑1: asset fields patched from specific payload */
  private patchAssetFormFromSpecific(x: any): void {
    console.log('📥 patchAssetFormFromSpecific() called with:', x);
    this.addAssetForm.patchValue({
      id: x.assetId, // 👈 assetId goes here
      description: x.description,
      descriptionAr: x.descriptionAr,
      dateAcquired: x.dateAcquired,
      leasingAgreementId: x.leasingAgreementId,
      assetTypeId: x.assetTypeId,
    });
    console.log(
      '✅ addAssetForm after patch:',
      this.addAssetForm.getRawValue()
    );
  }

  /** Step‑2: vehicle specifics */
  private patchVehicleFormOnly(v: any): void {
    console.log('📥 patchVehicleFormOnly() called with:', v);
    const toNum = (x: any) => (x === null || x === undefined ? x : +x);
    this.addVehicleForm.patchValue({
      id: v.id, // 👈 vehicle id
      vehiclesManufactureId: v.vehiclesManufactureId,
      vehiclesModelId: toNum(v.vehiclesModelId),
      modelCategory: v.modelCategory,
      capacity: v.capacity,
      horsepower: v.horsepower,
      color: v.color,
      chasisNumber: v.chasisNumber,
      motorNumber: v.motorNumber,
      keyId: v.keyId,
      geerChoice: v.geerChoice,
      manufactureYear: v.manufactureYear,
      currentValue: v.currentValue,
      isRequiredMaintenance: !!v.isRequiredMaintenance,
      isRequiredKMReading: !!v.isRequiredKMReading,
    });
    console.log(
      '✅ addVehicleForm after patch:',
      this.addVehicleForm.getRawValue()
    );
  }

  /** Step‑2: equipment specifics */
  private patchEquipmentFormOnly(e: any): void {
    this.addEquipmentForm.patchValue({
      id: e.id, // 👈 equipment id
      machineManufacture: e.machineManufacture,
      modelDescription: e.modelDescription,
      manufactureYear: e.manufactureYear,
      serialNumber: e.serialNumber,
      currentValue: e.currentValue,
    });
  }

  /** Step‑2: property specifics (sample) */
  private patchPropertyFormOnly(p: any): void {
    this.addPropertyForm.patchValue({
      id: p.id, // 👈 property id
      // add property‑specific fields here when you have them
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

    // common values + date normalization
    const common = this.addAssetForm.getRawValue();
    const asset = {
      ...common,
      // normalize date if needed
      dateAcquired:
        common.dateAcquired instanceof Date
          ? common.dateAcquired.toISOString()
          : common.dateAcquired,
    };

    let payload: any = asset;

    if (formType === 'vehicle') {
      if (this.addVehicleForm.invalid) {
        this.addVehicleForm.markAllAsTouched();
        return;
      }
      payload = {
        ...asset,
        ...this.addVehicleForm.getRawValue(),
      };
    } else if (formType === 'equipment') {
      if (this.addEquipmentForm.invalid) {
        this.addEquipmentForm.markAllAsTouched();
        return;
      }
      const eq = this.addEquipmentForm.getRawValue();
      payload = {
        ...asset,
        ...eq,
        // coerce numeric fields if your API requires numbers
        currentValue:
          eq.currentValue != null ? +eq.currentValue : eq.currentValue,
        manufactureYear:
          eq.manufactureYear != null ? eq.manufactureYear : eq.manufactureYear,
      };
    } else if (formType === 'property') {
      // single-step: asset only
      const pr = this.addPropertyForm.getRawValue();

      payload = { ...asset, id: pr.id };
    }

    const strat = this.strategies[formType];
    const doCreate = !this.editMode || this.typeChanged;
    const opWanted: CrudOp = this.editMode ? 'update' : 'create';

    // navigate after success
    const sub = strat.success$
      .pipe(
        filter(
          (e) => e.entity === strat.entityName && e.operation === opWanted
        ),
        take(1)
      )
      .subscribe(() => {
        this.assetsFacade.loadAll();
        this.router.navigate(['/purchasing/assets/view-assets']);
      });
    // remove detail ids for create
    if (doCreate) {
      delete payload.id; // detail id
    } else {
      // UPDATE: pick specific id from the current detail form
      const specificId =
        formType === 'equipment'
          ? this.addEquipmentForm.value.id
          : formType === 'vehicle'
          ? this.addVehicleForm.value.id
          : this.addPropertyForm.value.id;

      this.d('[AddAsset] update id:', specificId);
      strat.update(specificId, payload);
      this.addAssetForm.markAsPristine();
      return;
    }

    // remove id fields for create
    if (!this.editMode) {
      delete payload.id;
      // also remove detail-form ids if present
      if (formType === 'vehicle') delete payload.id;
      if (formType === 'equipment') delete payload.id;
    }

    // log before sending
    this.d('[AddAsset] final payload:', payload);

    if (this.editMode && this.assetId) {
      payload.assetId = +this.assetId; // if your API expects it
    }

    this.d('[AddAsset] final payload (create):', payload);
    strat.create(payload);
    this.router.navigate(['/purchasing/assets/view-assets']);

    this.addAssetForm.markAsPristine();
  }

  canDeactivate(): boolean {
    return !this.addAssetForm.dirty;
  }
}
