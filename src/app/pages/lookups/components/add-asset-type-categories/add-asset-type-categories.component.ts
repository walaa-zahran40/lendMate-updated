import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../shared/validators/arabic-only.validator';
import { AssetTypeCategoriesFacade } from '../../store/asset-type-categories/asset-type-categories.facade';
import { AssetTypeCategory } from '../../store/asset-type-categories/asset-type-category.model';

@Component({
  selector: 'app-add-asset-type-categories',
  standalone: false,
  templateUrl: './add-asset-type-categories.component.html',
  styleUrl: './add-asset-type-categories.component.scss',
})
export class AddAssetTypeCategoriesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addAssetTypeCategoriesLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: AssetTypeCategoriesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addAssetTypeCategoriesLookupsForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      limit: [ null , [Validators.required]],
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
          this.addAssetTypeCategoriesLookupsForm.disable();
        }

        this.facade.loadOne(this.clientId);
        this.facade.current$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addAssetTypeCategoriesLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              limit: ct!.limit,
              isActive: ct!.isActive,
            });
          });
      } else {
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addAssetTypeCategoriesLookupsForm.disable();
        }
      }
    });
  }

  addOrEditAssetTypeCategory() {
    console.log('💥 addAssetTypeCategory() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addAssetTypeCategoriesLookupsForm.valid);
    console.log('  form touched:', this.addAssetTypeCategoriesLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addAssetTypeCategoriesLookupsForm.getRawValue()
    );

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addAssetTypeCategoriesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addAssetTypeCategoriesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, limit } =
      this.addAssetTypeCategoriesLookupsForm.value;
    const payload: Partial<AssetTypeCategory> = { name, nameAR, limit };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, limit, isActive } =
        this.addAssetTypeCategoriesLookupsForm.value;
      const payload: AssetTypeCategory = {
        id,
        name,
        nameAR,
        limit,
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

    this.router.navigate(['/lookups/view-asset-type-categories']);
  }
}
