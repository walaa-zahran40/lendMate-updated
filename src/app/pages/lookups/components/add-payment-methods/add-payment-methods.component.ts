import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, filter, take } from 'rxjs';
import { PaymentMethod } from '../../store/payment-methods/payment-method.model';
import { PaymentMethodsFacade } from '../../store/payment-methods/payment-methods.facade';

@Component({
  selector: 'app-add-payment-methods',
  standalone: false,
  templateUrl: './add-payment-methods.component.html',
  styleUrl: './add-payment-methods.component.scss',
})
export class AddPaymentMethodsComponent {
  editMode: boolean = false;
  viewOnly = false;
  addPaymentMethodsLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: PaymentMethodsFacade,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('🔵 ngOnInit: start');

    // 1. Build the form
    this.addPaymentMethodsLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: ['', [Validators.required]],
      nameAR: [
        '',
        [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)],
      ],
      isActive: [true], // ← new hidden control
    });
    console.log(
      '🔵 Form initialized with default values:',
      this.addPaymentMethodsLookupsForm.value
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
          this.addPaymentMethodsLookupsForm.disable();
          console.log('🔵 Form disabled for view-only');
        }

        // load & patch
        console.log('🔵 Dispatching loadById for', this.clientId);
        this.facade.loadById(this.clientId);

        this.facade.selected$
          .pipe(
            tap((ct) => console.log('🔵 selected$ emission:', ct)),
            filter(
              (ct): ct is PaymentMethod => !!ct && ct.id === this.clientId
            ),
            tap((ct) =>
              console.log('🔵 selected$ passed filter, patching form with:', ct)
            ),
            take(1)
          )
          .subscribe((ct) => {
            this.addPaymentMethodsLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              isActive: ct!.isActive,
            });
            console.log(
              '🔵 Form after patchValue:',
              this.addPaymentMethodsLookupsForm.value
            );
          });
      } else {
        // add mode
        this.editMode = false;
        console.log('🔵 Entering ADD mode');

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        console.log('🔵 viewOnly flag (add mode):', this.viewOnly);
        if (this.viewOnly) {
          this.addPaymentMethodsLookupsForm.disable();
          console.log('🔵 Form disabled for view-only in add mode');
        }
      }
    });
  }

  addOrEditPaymentMethods() {
    console.log('💥 addOrEditPaymentMethods() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addPaymentMethodsLookupsForm.valid);
    console.log('  form touched:', this.addPaymentMethodsLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addPaymentMethodsLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addPaymentMethodsLookupsForm.get('name');
    const nameARCtrl = this.addPaymentMethodsLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addPaymentMethodsLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addPaymentMethodsLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } = this.addPaymentMethodsLookupsForm.value;
    const payload: Partial<PaymentMethod> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } =
        this.addPaymentMethodsLookupsForm.value;
      const payload: PaymentMethod = { id, name, nameAR, isActive };
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

    console.log('🧭 Navigating away to view-grace-periods');
    this.router.navigate(['/lookups/view-payment-methods']);
  }
}
