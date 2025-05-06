import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxOfficesFacade } from '../../store/tax_offices/tax_offices.facade';
import { filter, Observable, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../shared/validators/arabic-only.validator';
import { TaxOffice } from '../../store/tax_offices/tax_offices.model';
import { Governorate } from '../../store/governorates/governorate.model';
import { Store } from '@ngrx/store';
import { loadGovernorates } from '../../store/governorates/governorates.actions';
import { selectGovernorates } from '../../store/governorates/governorates.selectors';

@Component({
  selector: 'app-add-tax-offices',
  standalone: false,
  templateUrl: './add-tax-offices.component.html',
  styleUrl: './add-tax-offices.component.scss',
})
export class AddTaxOfficesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addTaxOfficesLookupsForm!: FormGroup;
  governoratesList$!: Observable<Governorate[]>;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private facade: TaxOfficesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.dispatch(loadGovernorates());
    this.governoratesList$ = this.store.select(selectGovernorates);
    this.governoratesList$.subscribe((data) =>
        console.log('🧪 governoratesList$ from store:', data)
    );

    this.addTaxOfficesLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      governorateId:  [null, [Validators.required]],
      address: ['', [Validators.required]],
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
          this.addTaxOfficesLookupsForm.disable();
        }

        // 3. load the existing record & patch the form
        this.facade.loadById(this.clientId);
        this.facade.selected$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addTaxOfficesLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              governorateId: ct!.governorateId,
              address: ct!.address,
              isActive: ct!.isActive,
            });
          });
      } else {
        // no id → add mode: still check if ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addTaxOfficesLookupsForm.disable();
        }
      }
    });
  }

  addOrEditTaxOffices() {
    console.log('💥 addTaxOffices() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addTaxOfficesLookupsForm.valid);
    console.log('  form touched:', this.addTaxOfficesLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addTaxOfficesLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addTaxOfficesLookupsForm.get('name');
    const nameARCtrl = this.addTaxOfficesLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addTaxOfficesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addTaxOfficesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR,governorateId,address, isActive } = this.addTaxOfficesLookupsForm.value;
    const payload: Partial<TaxOffice> = { name, nameAR, governorateId,address, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR,governorateId,address, isActive } =
        this.addTaxOfficesLookupsForm.value;
      const payload: TaxOffice = { id, name, nameAR,governorateId,address, isActive };
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

    console.log('🧭 Navigating away to view-tax-offices');
    this.router.navigate(['/lookups/view-tax-offices']);
  }
}
