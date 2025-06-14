import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, filter, take } from 'rxjs';
import { PaymentPeriod } from '../../../store/payment-periods/payment-period.model';
import { PaymentPeriodsFacade } from '../../../store/payment-periods/payment-periods.facade';

@Component({
  selector: 'app-add-payment-periods',
  standalone: false,
  templateUrl: './add-payment-periods.component.html',
  styleUrl: './add-payment-periods.component.scss',
})
export class AddPaymentPeriodsComponent {
  editMode: boolean = false;
  viewOnly = false;
  addPaymentPeriodsLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: PaymentPeriodsFacade,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('🔵 ngOnInit: start');

    // 1. Build the form
    this.addPaymentPeriodsLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: ['', [Validators.required]],
      nameAR: [
        '',
        [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)],
      ],
      monthCount: [0],
      isActive: [true], // ← new hidden control
    });
    console.log(
      '🔵 Form initialized with default values:',
      this.addPaymentPeriodsLookupsForm.value
    );

    // 2. Watch route params
    this.route.paramMap.subscribe((params) => {
      console.log('🔵 Route paramMap:', params);
      const idParam = params.get('id');
      console.log('🔵 Retrieved id param:', idParam);

      if (idParam) {
        // edit mode
        this.editMode = true;
        this.clientId = +idParam;
        console.log('🔵 Entering EDIT mode for id =', this.clientId);

        // view-only?
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        console.log('🔵 viewOnly flag:', this.viewOnly);
        if (this.viewOnly) {
          this.addPaymentPeriodsLookupsForm.disable();
          console.log('🔵 Form disabled for view-only');
        }

        // load & patch
        console.log('🔵 Dispatching loadById for', this.clientId);
        this.facade.loadById(this.clientId);

        this.facade.selected$
          .pipe(
            tap((ct) => console.log('🔵 selected$ emission:', ct)),
            filter(
              (ct): ct is PaymentPeriod => !!ct && ct.id === this.clientId
            ),
            tap((ct) =>
              console.log('🔵 selected$ passed filter, patching form with:', ct)
            ),
            take(1)
          )
          .subscribe((ct) => {
            this.addPaymentPeriodsLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              monthCount: ct!.monthCount,
              isActive: ct!.isActive,
            });
            console.log(
              '🔵 Form after patchValue:',
              this.addPaymentPeriodsLookupsForm.value
            );
          });
      } else {
        // add mode
        this.editMode = false;
        console.log('🔵 Entering ADD mode');

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        console.log('🔵 viewOnly flag (add mode):', this.viewOnly);
        if (this.viewOnly) {
          this.addPaymentPeriodsLookupsForm.disable();
          console.log('🔵 Form disabled for view-only in add mode');
        }
      }
    });
  }

  addOrEditPaymentPeriods() {
    console.log('💥 addOrEditPaymentPeriods() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addPaymentPeriodsLookupsForm.valid);
    console.log('  form touched:', this.addPaymentPeriodsLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addPaymentPeriodsLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addPaymentPeriodsLookupsForm.get('name');
    const nameARCtrl = this.addPaymentPeriodsLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addPaymentPeriodsLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addPaymentPeriodsLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, monthCount, isActive } =
      this.addPaymentPeriodsLookupsForm.value;
    const payload: Partial<PaymentPeriod> = {
      name,
      nameAR,
      monthCount,
      isActive,
    };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, monthCount, isActive } =
        this.addPaymentPeriodsLookupsForm.value;
      const payload: PaymentPeriod = { id, name, nameAR, monthCount, isActive };
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
    if (this.addPaymentPeriodsLookupsForm.valid) {
      this.addPaymentPeriodsLookupsForm.markAsPristine();
    }

    console.log('🧭 Navigating away to view-grace-periods');
    this.router.navigate(['/lookups/view-payment-periods']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addPaymentPeriodsLookupsForm.dirty;
  }
}
