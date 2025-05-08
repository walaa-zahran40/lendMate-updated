import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../shared/validators/arabic-only.validator';
import { MandateValidityUnit } from '../../store/mandate-validity-units/mandate-validity-unit.model';
import { MandateValidityUnitsFacade } from '../../store/mandate-validity-units/mandate-validity-units.facade';

@Component({
  selector: 'app-add-mandate-validity-unit',
  standalone: false,
  templateUrl: './add-mandate-validity-unit.component.html',
  styleUrl: './add-mandate-validity-unit.component.scss',
})
export class AddMandateValidityUnitComponent {
  editMode: boolean = false;
  viewOnly = false;
  addMandateValidityUnitLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: MandateValidityUnitsFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addMandateValidityUnitLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      validationMinValue: ['', [Validators.required]],
      validationMaxValue: ['', [Validators.required]],
      isActive: [true], // ← new hidden control
    });

    this.addMandateValidityUnitLookupsForm
      .get('validationMinValue')
      ?.valueChanges.subscribe((minValue) => {
        const amountControl =
          this.addMandateValidityUnitLookupsForm.get('validationMaxValue');

        if (amountControl) {
          amountControl.setValidators([Validators.min(minValue)]);
          amountControl.updateValueAndValidity();
        }
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
          this.addMandateValidityUnitLookupsForm.disable();
        }

        // 3. load the existing record & patch the form
        this.facade.loadById(this.clientId);
        this.facade.selected$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addMandateValidityUnitLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              validationMinValue: ct!.validationMinValue,
              validationMaxValue: ct!.validationMaxValue,
              isActive: ct!.isActive,
            });
          });
      } else {
        // no id → add mode: still check if ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addMandateValidityUnitLookupsForm.disable();
        }
      }
    });
  }

  addOrEditMandateValidityUnit() {
    console.log('💥 addMandateValidityUnits() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addMandateValidityUnitLookupsForm.valid);
    console.log(
      '  form touched:',
      this.addMandateValidityUnitLookupsForm.touched
    );
    console.log(
      '  form raw value:',
      this.addMandateValidityUnitLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addMandateValidityUnitLookupsForm.get('name');
    const nameARCtrl = this.addMandateValidityUnitLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addMandateValidityUnitLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addMandateValidityUnitLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, validationMinValue, validationMaxValue, isActive } =
      this.addMandateValidityUnitLookupsForm.value;
    const payload: Partial<MandateValidityUnit> = {
      name,
      nameAR,
      validationMinValue,
      validationMaxValue,
      isActive,
    };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const {
        id,
        name,
        nameAR,
        validationMinValue,
        validationMaxValue,
        isActive,
      } = this.addMandateValidityUnitLookupsForm.value;
      const payload: MandateValidityUnit = {
        id,
        name,
        nameAR,
        validationMinValue,
        validationMaxValue,
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

    console.log('🧭 Navigating away to view-mandate-validity-unit');
    this.router.navigate(['/lookups/view-mandate-validity-unit']);
  }
}
