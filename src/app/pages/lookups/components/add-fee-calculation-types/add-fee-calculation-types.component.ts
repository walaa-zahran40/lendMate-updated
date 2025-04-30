import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { CompanyType } from '../../store/company-types/company-type.model';
import { FeeCalculationTypesFacade } from '../../store/fee-calculation-types/fee-calculation-types.facade';
import { FeeCalculationType } from '../../store/fee-calculation-types/fee-calculation-types.model';

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
    private facade: FeeCalculationTypesFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1) build the form
    this.addFeeCalculationTypesLookupsForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      nameAR: [
        '',
        [Validators.required, Validators.pattern('^[\\u0621-\\u064A ]+$')],
      ],
      isActive: [true],
    });

    // 2) read ID + mode=view once
    const idParam = this.route.snapshot.paramMap.get('id');
    this.viewOnly = this.route.snapshot.queryParamMap.get('mode') === 'view';

    // disable entire form if we're just viewing
    if (this.viewOnly) {
      this.addFeeCalculationTypesLookupsForm.disable();
    }

    if (idParam) {
      // — edit mode
      this.editMode = true;
      const id = +idParam;

      console.log('✏️ Edit mode, loading FeeCalculationType id=', id);
      this.facade.loadById(id);

      // wait for it to arrive in the store, then patch
      this.facade.selected$
        .pipe(
          filter((entity) => !!entity && entity.id === id),
          take(1)
        )
        .subscribe((entity) => {
          console.log('✅ Loaded for edit:', entity);
          this.addFeeCalculationTypesLookupsForm.patchValue({
            id: entity?.id,
            name: entity?.name,
            nameAR: entity?.nameAR,
            isActive: entity?.isActive,
          });
        });
    } else {
      // — add mode
      console.log('➕ Add mode (no id in route)');
      // form is already built with defaults
    }
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
      const { name, nameAR, isActive } =
        this.addFeeCalculationTypesLookupsForm.value;

      // 2. assert that name & nameAR are non-null (your form is valid at this point)
      const payload: Omit<FeeCalculationType, 'id'> = {
        name: name!, // the `!` tells TS “I know it’s non-undefined here”
        nameAR: nameAR!,
        isActive, // boolean is always defined
      };

      // 3. dispatch
      this.facade.create(payload);
    }

    console.log('🧭 Navigating away to view-company-types');
    this.router.navigate(['/lookups/view-company-types']);
  }
}
