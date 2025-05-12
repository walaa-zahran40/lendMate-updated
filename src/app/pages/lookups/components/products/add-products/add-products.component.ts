import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { Product } from '../../../store/products/product.model';
import { ProductsFacade } from '../../../store/products/products.facade';
import { BusinessLine } from '../../../store/business-lines/business-line.model';
import { Store } from '@ngrx/store';
import { loadAll } from '../../../store/business-lines/business-lines.actions';
import { selectAllBusinessLines } from '../../../store/business-lines/business-lines.selectors';

@Component({
  selector: 'app-add-products',
  standalone: false,
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss',
})
export class AddProductsComponent {
  editMode: boolean = false;
  viewOnly = false;
  addProductsLookupsForm!: FormGroup;
  clientId: any;
  businessLinesList$!: Observable<BusinessLine[]>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ProductsFacade,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(loadAll({}));
    this.businessLinesList$ = this.store.select(selectAllBusinessLines);
    this.businessLinesList$.subscribe((data) =>
      console.log('🧪 businessLinesList$ from store:', data)
    );

    this.addProductsLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      lisenceStartDate: [null],
      businessLineId: [null, [Validators.required]],
      isActive: [true], // ← new hidden control
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        // we have an id → edit mode
        this.editMode = true;
        this.clientId = +id;

        // disable if it’s view mode via ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addProductsLookupsForm.disable();
        }

        // 3. load the existing record & patch the form
        this.facade.loadById(this.clientId);
        this.facade.selected$
          .pipe(
            filter((ct): ct is Product => !!ct && ct.id === this.clientId),
            take(1)
          )
          .subscribe((ct) => {
            this.addProductsLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              lisenceStartDate: new Date(ct!.lisenceStartDate),
              businessLineId: ct!.businessLineId,
              isActive: ct!.isActive,
            });
          });
      } else {
        // no id → add mode: still check if ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addProductsLookupsForm.disable();
        }
      }
    });
  }

  addOrEditProduct() {
    console.log('💥 addProducts() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addProductsLookupsForm.valid);
    console.log('  form touched:', this.addProductsLookupsForm.touched);
    console.log('  form raw value:', this.addProductsLookupsForm.getRawValue());

    // Print individual control errors
    const nameCtrl = this.addProductsLookupsForm.get('name');
    const nameARCtrl = this.addProductsLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addProductsLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addProductsLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, lisenceStartDate, businessLineId, isActive } =
      this.addProductsLookupsForm.value;
    const payload: Partial<Product> = {
      name,
      nameAR,
      lisenceStartDate,
      businessLineId,
      isActive,
    };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, lisenceStartDate, businessLineId, isActive } =
        this.addProductsLookupsForm.value;
      const payload: Product = {
        id,
        name,
        nameAR,
        lisenceStartDate,
        businessLineId,
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

    console.log('🧭 Navigating away to view-products');
    this.router.navigate(['/lookups/view-products']);
  }
}
