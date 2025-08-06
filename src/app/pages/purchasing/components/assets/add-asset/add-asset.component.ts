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
  selectedAssetType: any;
  dropdownAssetTypeItems: any[] = [];
  selectedAsset$!: Observable<any>;
  public editMode: boolean = false;
  public assetId: any = null;
  formGroup!: FormGroup;
  public activeTabIndex = 0; // 0 = company, 1 = individual
  individualCode!: any;
  viewOnly = false;
  workFlowActionList: any[] = [];
  selectedAction: string = '';
  assetTypes$!: Observable<AssetType[]>;

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
    this.assetTypesFacade.loadAll();
    this.assetTypes$ = this.assetTypesFacade.all$;
  }

  ngOnDestroy(): void {
    console.log('🗑️ ngOnDestroy: clearing selected asset');
    this.assetsFacade.clearSelected();
  }

  close() {
    console.log('Navigating back to view-assets');
    this.router.navigate(['/purchasing/assets/view-assets']);
  }

  // Company form
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

    this.workFlowActionList = asset.allowedActionsList?.map((action) => ({
      id: action.id,
      label: action.name,
      icon: 'pi pi-times',
    }));
    this.selectedAction = asset.currentStatusName ?? '';
    console.log('✅ this.selectedAction', this.selectedAction);

    // this.store.dispatch(loadSectorById({ id: sectorId }));
  }

  handleWorkflowAction(event: { actionId: number; comment: string }): void {
    const payload = {
      assetId: this.assetId,
      assetStatusActionId: event.actionId,
      comment: event.comment,
      isCurrent: true,
    };

    this.assetsFacade.performWorkflowAction(event.actionId, payload);
    this.assetsFacade.workFlowActionSuccess$.subscribe({
      next: () => {
        console.log('Workflow action submitted successfully.');
        this.refreshAllowedActions();
      },
    });
  }

  refreshAllowedActions(): void {
    this.assetsFacade.loadById(this.assetId);
    this.assetsFacade.selected$.subscribe({
      next: (asset) => {
        var workFlowAction = [...(asset?.allowedActionsList ?? [])];
        this.workFlowActionList = workFlowAction.map((action) => ({
          id: action.id,
          label: action.name,
          icon: 'pi pi-times',
        })); // clone to ensure change detection
      },
      error: (err) => {
        console.error('Failed to refresh actions:', err);
      },
    });
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
