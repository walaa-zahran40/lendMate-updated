import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { SMEClientCode } from '../../../store/sme-client-codes/sme-client-code.model';
import { SMEClientCodesFacade } from '../../../store/sme-client-codes/sme-client-codes.facade';

@Component({
  selector: 'app-add-sme-client-code',
  standalone: false,
  templateUrl: './add-sme-client-code.component.html',
  styleUrl: './add-sme-client-code.component.scss',
})
export class AddSMEClientCodesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addSMEClientCodesLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: SMEClientCodesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addSMEClientCodesLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      lowerLimit: [null, [Validators.required]],
      upperLimit: [null, [Validators.required]],
      isActive: [true], // ← new hidden control
    });
    this.addSMEClientCodesLookupsForm
      .get('lowerLimit')
      ?.valueChanges.subscribe((lowerLimit) => {
        const amountControl =
          this.addSMEClientCodesLookupsForm.get('upperLimit');

        if (amountControl) {
          amountControl.setValidators([Validators.min(lowerLimit)]);
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
          this.addSMEClientCodesLookupsForm.disable();
        }

        // 3. load the existing record & patch the form
        this.facade.loadById(this.clientId);
        this.facade.selected$
          .pipe(
            filter(
              (ct): ct is SMEClientCode => !!ct && ct.id === this.clientId
            ),
            take(1)
          )
          .subscribe((ct) => {
            this.addSMEClientCodesLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              lowerLimit: ct!.lowerLimit,
              upperLimit: ct!.upperLimit,
              isActive: ct!.isActive,
            });
          });
      } else {
        // no id → add mode: still check if ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addSMEClientCodesLookupsForm.disable();
        }
      }
    });
  }

  addOrEditSMEClientCode() {
    console.log('💥 addSMEClientCodes() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addSMEClientCodesLookupsForm.valid);
    console.log('  form touched:', this.addSMEClientCodesLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addSMEClientCodesLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addSMEClientCodesLookupsForm.get('name');
    const nameARCtrl = this.addSMEClientCodesLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addSMEClientCodesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addSMEClientCodesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, lowerLimit, upperLimit, isActive } =
      this.addSMEClientCodesLookupsForm.value;
    const payload: Partial<SMEClientCode> = {
      name,
      nameAR,
      lowerLimit,
      upperLimit,
      isActive,
    };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, lowerLimit, upperLimit, isActive } =
        this.addSMEClientCodesLookupsForm.value;
      const payload: SMEClientCode = {
        id,
        name,
        nameAR,
        lowerLimit,
        upperLimit,
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
    if (this.addSMEClientCodesLookupsForm.valid) {
      this.addSMEClientCodesLookupsForm.markAsPristine();
    }

    console.log('🧭 Navigating away to view-sme-client-code');
    this.router.navigate(['/lookups/view-sme-client-codes']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addSMEClientCodesLookupsForm.dirty;
  }
}
