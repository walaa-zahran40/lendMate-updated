import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, filter, firstValueFrom, Observable, take } from 'rxjs';
import { AssetsFacade } from '../../../store/assets/assets.facade';
import { Asset } from '../../../store/assets/asset.model';
import { AssetType } from '../../../../lookups/store/asset-types/asset-type.model';
import { AssetTypesFacade } from '../../../../lookups/store/asset-types/asset-types.facade';
import { VehicleManufacturer } from '../../../../lookups/store/vehicle-manufacturers/vehicle-manufacturer.model';
import { VehicleManufacturersFacade } from '../../../../lookups/store/vehicle-manufacturers/vehicle-manufacturers.facade';
import { VehicleModel } from '../../../../lookups/store/vehicle-models/vehicle-model.model';
import { VehicleModelsFacade } from '../../../../lookups/store/vehicle-models/vehicle-models.facade';
import { VehiclesFacade } from '../../../store/vehicles/vehicles.facade';

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

    // Keep your code that updates selectedAssetTypeCode when user changes dropdown
    this.addAssetForm
      .get('assetTypeId')
      ?.valueChanges.subscribe((selectedId: number) => {
        this.assetTypes$.pipe(take(1)).subscribe((types) => {
          const selected = types.find((type) => type.id === selectedId);
          this.selectedAssetTypeCode = selected?.code ?? null;
          console.log('Selected asset type code:', this.selectedAssetTypeCode);
        });
      });

    // 👇 EDIT MODE: if there’s an id in route/query, load and patch
    this.assetId =
      this.route.snapshot.params['id'] ??
      this.route.snapshot.queryParams['assetId'];
    this.editMode = !!this.assetId;

    if (this.editMode) {
      this.patchOnEdit(+this.assetId);
    }
  }

  ngOnDestroy(): void {
    console.log('🗑️ ngOnDestroy: clearing selected asset');
    this.assetsFacade.clearSelected();
  }
  private patchOnEdit(id: number) {
    // 1) make sure the asset is loaded (adapt to your facade API)
    this.assetsFacade.loadById(id);

    // 2) combine what we need:
    // - the asset itself
    // - asset types (to resolve code -> which specific form)
    // - vehicle lookups (so p-selects have options before we set values)
    const asset$ = this.assetsFacade.selected$; // or selectById$(id)
    const types$ = this.assetTypes$;
    const vehLookups$ = combineLatest([
      this.vehicleManufacturers$,
      this.vehicleModels$,
    ]).pipe(take(1));

    combineLatest([asset$, types$])
      .pipe(
        filter(([asset, types]) => !!asset && !!types?.length),
        take(1)
      )
      .subscribe(async ([asset, types]) => {
        // 3) resolve assetType code & selected form
        const type = types.find((t) => t.id === asset?.assetTypeId);
        this.selectedAssetTypeCode = type?.code ?? null; // this drives your ngSwitch via getter

        // 4) patch common fields (safe to do immediately)
        this.patchCommonForm(asset!);

        // 5) patch specific form
        const formType = this.selectedAssetTypeForm; // 'vehicle' | 'property' | 'equipment' | null
        if (!formType) return;

        // If it's vehicle, wait for lookups to be present before patching select values
        if (formType === 'vehicle') {
          await firstValueFrom(vehLookups$);
          this.patchVehicleForm(asset as any); // adjust type to your vehicle payload interface
        } else if (formType === 'property') {
          this.patchPropertyForm(asset as any);
        } else if (formType === 'equipment') {
          this.patchEquipmentForm(asset as any);
        }

        // Optionally jump to Step 2 on edit:
        // if you control the stepper via a variable, set it here, e.g. this.activeStep = 2;
        // (Your template uses activateCallback; if you want programmatic navigation,
        // expose a variable for p-stepper instead of the hardcoded [value]="1".)
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
  private patchForm(asset: Asset): void {
    console.log('🛠️ patchForm() start', asset);
    try {
      this.addAssetForm.patchValue({
        id: asset.id,
        description: asset.description,
        descriptionAr: asset.descriptionAr,
      });
      console.log('✅ static fields patched', this.addAssetForm.getRawValue());
    } catch (e) {
      console.error('❌ Error patching static fields:', e);
    }

    console.log('📍 Reached before workflow setup', asset);

    // this.store.dispatch(loadSectorById({ id: sectorId }));
  }

  saveInfo(): void {
    const formType = this.selectedAssetTypeForm;

    if (!formType) {
      console.error('No asset type selected.');
      return;
    }

    if (this.addAssetForm.invalid) {
      this.addAssetForm.markAllAsTouched();
      return;
    }

    let payload = { ...this.addAssetForm.value };

    switch (formType) {
      case 'vehicle':
        if (this.addVehicleForm.invalid) {
          this.addVehicleForm.markAllAsTouched();
          return;
        }
        payload = { ...payload, ...this.addVehicleForm.value };
        break;

      case 'property':
        if (this.addPropertyForm.invalid) {
          this.addPropertyForm.markAllAsTouched();
          return;
        }
        payload = { ...payload, ...this.addPropertyForm.value };
        break;

      case 'equipment':
        if (this.addEquipmentForm.invalid) {
          this.addEquipmentForm.markAllAsTouched();
          return;
        }
        payload = { ...payload, ...this.addEquipmentForm.value };
        break;
    }

    console.log(
      this.editMode ? '✏️ Updating asset:' : '🆕 Creating asset:',
      payload
    );

    this.handleSave(formType, payload);
    this.addAssetForm.markAsPristine();
    this.router.navigate(['/purchasing/assets/view-assets']);
  }

  private handleSave(formType: string, payload: any): void {
    switch (formType) {
      case 'vehicle':
        if (this.editMode) {
          this.vehiclesFacade.update(this.assetId, payload);
        } else {
          this.vehiclesFacade.create(payload);
        }
        break;

      case 'property':
        // if (this.editMode) {
        //   this.propertiesFacade.update(this.assetId, payload);
        // } else {
        //   this.propertiesFacade.create(payload);
        // }
        break;

      case 'equipment':
        // if (this.editMode) {
        //   this.equipmentsFacade.update(this.assetId, payload);
        // } else {
        //   this.equipmentsFacade.create(payload);
        // }
        break;

      default:
        console.error('🚫 No handler implemented for asset type:', formType);
        break;
    }
  }

  canDeactivate(): boolean {
    return !this.addAssetForm.dirty;
  }
}
