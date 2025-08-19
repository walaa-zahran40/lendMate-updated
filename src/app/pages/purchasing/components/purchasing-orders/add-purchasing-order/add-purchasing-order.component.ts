import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { LegalFormLaw } from '../../../../legals/store/legal-form-laws/legal-form-law.model';
import { PurchasingOrdersFacade } from '../../../store/purchasing-orders/purchasing-orders.facade';
import { PurchaseOrder } from '../../../store/purchasing-orders/purchasing-order.model';
import { FirstClaimStatus } from '../../../../lookups/store/first-claim-statuses/first-claim-status.model';
import { FirstClaimStatusesFacade } from '../../../../lookups/store/first-claim-statuses/first-claim-statuses.facade';
import { CurrenciesFacade } from '../../../../lookups/store/currencies/currencies.facade';
import { Currency } from '../../../../lookups/store/currencies/currency.model';
import { PeriodUnit } from '../../../../lookups/store/period-units/period-unit.model';
import { GracePeriodUnitsFacade } from '../../../../lookups/store/period-units/period-units.facade';
import { Vendor } from '../../../../lookups/store/vendors/vendor.model';
import { VendorsFacade } from '../../../../lookups/store/vendors/vendors.facade';

@Component({
  selector: 'app-add-purchasing-order',
  standalone: false,
  templateUrl: './add-purchasing-order.component.html',
  styleUrl: './add-purchasing-order.component.scss',
})
export class AddPurchasingOrderComponent {
  editMode: boolean = false;
  viewOnly = false;
  addPurchasingOrdersForm!: FormGroup;
  clientId: any;
  firstClaimStatuses$!: Observable<FirstClaimStatus[]>;
  currencies$!: Observable<Currency[]>;
  deliveryWithInUnits$!: Observable<PeriodUnit[]>;
  vendors$!: Observable<Vendor[]>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: PurchasingOrdersFacade,
    private firstClaimFacade: FirstClaimStatusesFacade,
    private currencyFacade: CurrenciesFacade,
    private periodUnitsFacade: GracePeriodUnitsFacade,
    private vendorsFacade: VendorsFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addPurchasingOrdersForm = this.fb.group({
      id: [null],
      firstClaimStatusId: ['', [Validators.required]],
      date: ['', [Validators.required]],
      currencyId: ['', [Validators.required]],
      leasingAgreementId: [0, [Validators.required]],
      deliveryWithin: [0, [Validators.required]],
      deliveryWithinUnitId: ['', [Validators.required]],
      vendorId: ['', [Validators.required]],
      isActive: [true],
    });
    this.firstClaimFacade.loadAll();
    this.firstClaimStatuses$ = this.firstClaimFacade.all$;
    this.currencyFacade.loadAll();
    this.currencies$ = this.currencyFacade.all$;
    this.periodUnitsFacade.loadAll();
    this.deliveryWithInUnits$ = this.periodUnitsFacade.all$;
    this.vendorsFacade.loadAll();
    this.vendors$ = this.vendorsFacade.all$;

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.clientId = +id;

        console.log(this.viewOnly);

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addPurchasingOrdersForm.disable();
        }

        this.facade.loadById(this.clientId);
        this.facade.selected$
          .pipe(
            filter(
              (ct): ct is PurchaseOrder => !!ct && ct.id === this.clientId
            ),
            take(1)
          )
          .subscribe((ct) => {
            this.addPurchasingOrdersForm.patchValue({
              id: ct!.id,

              isActive: ct!.isActive,
            });
          });
      } else {
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addPurchasingOrdersForm.disable();
        }
      }
    });
  }

  addOrEditPurchasingOrder() {
    if (this.viewOnly) {
      return;
    }

    if (this.addPurchasingOrdersForm.invalid) {
      this.addPurchasingOrdersForm.markAllAsTouched();
      return;
    }

    const { name, nameAR } = this.addPurchasingOrdersForm.value;
    const payload: Partial<LegalFormLaw> = { name, nameAR };
    console.log('  → payload object:', payload);

    if (this.editMode) {
      const { id, name, nameAR, isActive } = this.addPurchasingOrdersForm.value;
      const payload: LegalFormLaw = {
        id,
        name,
        nameAR,
        isActive,
        code: '',
      };

      this.facade.update(id, payload);
    } else {
      this.facade.create(payload);
    }
    if (this.addPurchasingOrdersForm.valid) {
      this.addPurchasingOrdersForm.markAsPristine();
    }

    this.router.navigate([
      '/purchasing/purchasing-orders/view-purchasing-orders',
    ]);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addPurchasingOrdersForm.dirty;
  }
}
