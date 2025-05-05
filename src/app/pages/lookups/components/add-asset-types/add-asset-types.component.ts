import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../shared/validators/arabic-only.validator';
import { AssetTypesFacade } from '../../store/asset-types/asset-types.facade';
import { AssetType } from '../../store/asset-types/asset-type.model';
import { selectAssetTypeCategories } from '../../store/asset-type-categories/asset-type-categories.selectors';
import { Store } from '@ngrx/store';
import { loadAssetTypeCategories } from '../../store/asset-type-categories/asset-type-categories.actions';

@Component({
  selector: 'app-add-asset-type-s',
  standalone: false,
  templateUrl: './add-asset-types.component.html',
  styleUrl: './add-asset-types.component.scss',
})
export class AddAssetTypesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addAssetTypesLookupsForm!: FormGroup;
  clientId: any;
  assetTypeCategories$!: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: AssetTypesFacade,
    private router: Router,
        private store: Store
  ) {}

  ngOnInit() {
    //Select Box
        console.log('🔵 ngOnInit: start');
        this.store.dispatch(loadAssetTypeCategories());
        this.assetTypeCategories$ = this.store.select(selectAssetTypeCategories);
        console.log('assetTypeCategories list', this.assetTypeCategories$);
        this.assetTypeCategories$.subscribe((data: any) =>
          console.log('🧪 assetTypeCategories$ from store:', data)
        );

    this.addAssetTypesLookupsForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      assetTypeCategoryId: [null, [Validators.required]],
      parentAssetTypeId: [null],
      isActive: [true],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.clientId = +id;

        console.log(this.viewOnly);

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addAssetTypesLookupsForm.disable();
        }

        this.facade.loadOne(this.clientId);
        this.facade.current$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addAssetTypesLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              assetTypeCategoryId: ct!.assetTypeCategoryId,
              parent: ct!.parent,
              isActive: ct!.isActive,
            });
          });
      } else {

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addAssetTypesLookupsForm.disable();
        }
      }
    });
  }

  addOrEditAssetType() {
    console.log('💥 addAssetType() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addAssetTypesLookupsForm.valid);
    console.log('  form touched:', this.addAssetTypesLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addAssetTypesLookupsForm.getRawValue()
    );

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addAssetTypesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addAssetTypesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, assetTypeCategoryId , parent } =
      this.addAssetTypesLookupsForm.value;
    const payload: Partial<AssetType> = { name, nameAR, assetTypeCategoryId , parent };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, assetTypeCategoryId, parent , isActive } =
        this.addAssetTypesLookupsForm.value;
      const payload: AssetType = {
        id,
        name,
        nameAR,
        assetTypeCategoryId,
        parent,
        isActive,
        code: '',
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

    this.router.navigate(['/lookups/view-asset-types']);
  }
}


