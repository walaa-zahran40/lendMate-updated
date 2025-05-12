import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, filter, forkJoin, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { AssetTypesFacade } from '../../../store/asset-types/asset-types.facade';
import { AssetType } from '../../../store/asset-types/asset-type.model';
import { Store } from '@ngrx/store';
import { loadAll } from '../../../store/asset-type-categories/asset-type-categories.actions';
import { selectAllAssetTypeCategories } from '../../../store/asset-type-categories/asset-type-categories.selectors';

@Component({
  selector: 'app-add-asset-type-s',
  standalone: false,
  templateUrl: './add-asset-types.component.html',
  styleUrl: './add-asset-types.component.scss',
})
export class AddAssetTypesComponent {
  editMode = false;
  viewOnly = false;
  clientId!: number;
  addAssetTypesLookupsForm!: FormGroup;
  assetTypeCategories$ = this.store.select(selectAllAssetTypeCategories);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: AssetTypesFacade,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadAll({}));

    this.initForm();

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';

      if (id) {
        this.editMode = true;
        this.clientId = +id;

        if (this.viewOnly) {
          this.addAssetTypesLookupsForm.disable();
        }

        this.facade.loadById(this.clientId);

        combineLatest([
          this.assetTypeCategories$.pipe(filter((c) => c.length > 0)),
          this.facade.selected$.pipe(
            filter((ct): ct is AssetType => !!ct && ct.id === this.clientId),
            take(1)
          ),
        ]).subscribe(([categories, ct]) => {
          console.log('📦 Patching with values:', ct);
          console.log('📋 Categories available:', categories);

          this.addAssetTypesLookupsForm.patchValue({
            id: ct.id,
            name: ct.name,
            nameAR: ct.nameAR,
            assetTypeCategoryId: ct.assetTypeCategoryId,
            parentAssetTypeId: ct.parent,
            isActive: ct.isActive,
          });
        });
      } else {
        if (this.viewOnly) {
          this.addAssetTypesLookupsForm.disable();
        }
      }
    });
  }

  private initForm(): void {
    this.addAssetTypesLookupsForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      nameAR: [
        '',
        [Validators.required, , Validators.pattern(/^[\u0600-\u06FF\s]+$/)],
      ],
      assetTypeCategoryId: [null, Validators.required],
      parentAssetTypeId: [null],
      isActive: [true],
    });
  }

  addOrEditAssetType(): void {
    if (this.viewOnly || this.addAssetTypesLookupsForm.invalid) {
      this.addAssetTypesLookupsForm.markAllAsTouched();
      return;
    }

    const {
      id,
      name,
      nameAR,
      assetTypeCategoryId,
      parentAssetTypeId,
      isActive,
    } = this.addAssetTypesLookupsForm.getRawValue();

    const payload: AssetType = {
      id,
      name,
      nameAR,
      assetTypeCategoryId,
      parent: parentAssetTypeId,
      isActive,
      code: '',
    };

    this.editMode
      ? this.facade.update(id, payload)
      : this.facade.create(payload);

    this.router.navigate(['/lookups/view-asset-types']);
  }
}
