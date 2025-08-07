import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, take } from 'rxjs';
import { AssetsFacade } from '../../../store/assets/assets.facade';
import { Asset } from '../../../store/assets/asset.model';
import { AssetType } from '../../../../lookups/store/asset-types/asset-type.model';
import { AssetTypesFacade } from '../../../../lookups/store/asset-types/asset-types.facade';

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
    this.assetTypesFacade.loadAll();
    this.assetTypes$ = this.assetTypesFacade.all$;
    this.addAssetForm
      .get('assetTypeId')
      ?.valueChanges.subscribe((selectedId: number) => {
        this.assetTypes$.pipe(take(1)).subscribe((types) => {
          const selected = types.find((type) => type.id === selectedId);
          this.selectedAssetTypeCode = selected?.code ?? null;
          console.log('Selected asset type code:', this.selectedAssetTypeCode);
        });
      });
  }

  ngOnDestroy(): void {
    console.log('🗑️ ngOnDestroy: clearing selected asset');
    this.assetsFacade.clearSelected();
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
      agreementId: ['', Validators.required],
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
      agreementId: ['', Validators.required],
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
      agreementId: ['', Validators.required],
    });
  }
  buildVehicleForm(): void {
    this.addVehicleForm = this.fb.group({
      id: [null],
      vehiclesManufactureId: ['', Validators.required],
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

  saveInfo() {
    console.log('💾 saveInfo() start; valid?', this.addAssetForm.valid);
    if (this.addAssetForm.invalid) {
      console.warn('❗ form invalid, errors:', this.addAssetForm.errors);
      this.addAssetForm.markAllAsTouched();
      return;
    }

    const formValue = this.addAssetForm.value;
    console.log('→ formValue:', formValue);

    if (this.editMode) {
      console.log('✏️ update mode payload:', formValue);
      const updatedAsset = {
        id: this.assetId,
        description: formValue.description,
        descriptionAr: formValue.descriptionAr,
      };
      this.assetsFacade.update(this.assetId, updatedAsset);
    } else {
      console.log('🆕 create mode payload:', formValue);
      const payload = {
        assetTypeId: 1,
        id: this.assetId,
        description: formValue.description,
        descriptionAr: formValue.descriptionAr,
      };
      this.assetsFacade.create(payload);
    }
    if (this.addAssetForm.valid) {
      this.addAssetForm.markAsPristine();
    }
    this.router.navigate(['/purchasing/assets/view-assets']);
  }

  canDeactivate(): boolean {
    return !this.addAssetForm.dirty;
  }
}
