import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { CompanyType } from '../../store/company-types/company-type.model';
import { CompanyTypesFacade } from '../../store/company-types/company-types.facade';

@Component({
  selector: 'app-add-fee-calculation-types',
  standalone: false,
  templateUrl: './add-fee-calculation-types.component.html',
  styleUrl: './add-fee-calculation-types.component.scss',
})
export class AddFeeCalculationTypesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addFeeCalculationTypesLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: CompanyTypesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addFeeCalculationTypesLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      nameAR: [
        '',
        [Validators.required, Validators.pattern('^[\\u0621-\\u064A ]+$')],
      ],
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
          this.addFeeCalculationTypesLookupsForm.disable();
        }

        // 3. load the existing record & patch the form
        this.facade.loadOne(this.clientId);
        this.facade.current$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addFeeCalculationTypesLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              isActive: ct!.isActive,
            });
          });
      } else {
        // no id → add mode: still check if ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addFeeCalculationTypesLookupsForm.disable();
        }
      }
    });
  }

  addOrEditFeeCalculationTypes() {
    console.log('💥 addCompanyTypes() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addFeeCalculationTypesLookupsForm.valid);
    console.log(
      '  form touched:',
      this.addFeeCalculationTypesLookupsForm.touched
    );
    console.log(
      '  form raw value:',
      this.addFeeCalculationTypesLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addFeeCalculationTypesLookupsForm.get('name');
    const nameARCtrl = this.addFeeCalculationTypesLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addFeeCalculationTypesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addFeeCalculationTypesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } =
      this.addFeeCalculationTypesLookupsForm.value;
    const payload: Partial<CompanyType> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } =
        this.addFeeCalculationTypesLookupsForm.value;
      const payload: CompanyType = { id, name, nameAR, isActive };
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

    console.log('🧭 Navigating away to view-company-types');
    this.router.navigate(['/lookups/view-company-types']);
  }
}
