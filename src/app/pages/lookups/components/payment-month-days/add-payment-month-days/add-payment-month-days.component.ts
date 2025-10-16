import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, filter, take } from 'rxjs';
import { PaymentMonthDay } from '../../../store/payment-month-days/payment-month-day.model';
import { PaymentMonthDaysFacade } from '../../../store/payment-month-days/payment-month-days.facade';

@Component({
  selector: 'app-add-payment-month-days',
  standalone: false,
  templateUrl: './add-payment-month-days.component.html',
  styleUrl: './add-payment-month-days.component.scss',
})
export class AddPaymentMonthDaysComponent {
  editMode: boolean = false;
  viewOnly = false;
  addPaymentMonthDaysLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: PaymentMonthDaysFacade,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('🔵 ngOnInit: start');

    // 1. Build the form
    this.addPaymentMonthDaysLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: ['', [Validators.required]],
      nameAR: ['', [Validators.required]],
      value: ['', Validators.required],
      isActive: [true], // ← new hidden control
    });
    console.log(
      '🔵 Form initialized with default values:',
      this.addPaymentMonthDaysLookupsForm.value
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
          this.addPaymentMonthDaysLookupsForm.disable();
          console.log('🔵 Form disabled for view-only');
        }

        // load & patch
        console.log('🔵 Dispatching loadById for', this.clientId);
        this.facade.loadById(this.clientId);

        this.facade.selected$
          .pipe(
            tap((ct) => console.log('🔵 selected$ emission:', ct)),
            filter(
              (ct): ct is PaymentMonthDay => !!ct && ct.id === this.clientId
            ),
            tap((ct) =>
              console.log('🔵 selected$ passed filter, patching form with:', ct)
            ),
            take(1)
          )
          .subscribe((ct) => {
            this.addPaymentMonthDaysLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              value: ct!.value,
              isActive: ct!.isActive,
            });
            console.log(
              '🔵 Form after patchValue:',
              this.addPaymentMonthDaysLookupsForm.value
            );
          });
      } else {
        // add mode
        this.editMode = false;
        console.log('🔵 Entering ADD mode');

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        console.log('🔵 viewOnly flag (add mode):', this.viewOnly);
        if (this.viewOnly) {
          this.addPaymentMonthDaysLookupsForm.disable();
          console.log('🔵 Form disabled for view-only in add mode');
        }
      }
    });
  }

  addOrEditPaymentMonthDays() {
    console.log('💥 addOrEditPaymentMonthDays() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addPaymentMonthDaysLookupsForm.valid);
    console.log('  form touched:', this.addPaymentMonthDaysLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addPaymentMonthDaysLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addPaymentMonthDaysLookupsForm.get('name');
    const nameARCtrl = this.addPaymentMonthDaysLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addPaymentMonthDaysLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addPaymentMonthDaysLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive, value } =
      this.addPaymentMonthDaysLookupsForm.value;
    const payload: Partial<PaymentMonthDay> = { name, nameAR, isActive, value };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive, value } =
        this.addPaymentMonthDaysLookupsForm.value;
      const payload: PaymentMonthDay = { id, name, nameAR, isActive, value };
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
    if (this.addPaymentMonthDaysLookupsForm.valid) {
      this.addPaymentMonthDaysLookupsForm.markAsPristine();
    }

    console.log('🧭 Navigating away to view-grace-periods');
    this.router.navigate(['/lookups/view-payment-month-days']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addPaymentMonthDaysLookupsForm.dirty;
  }
}
