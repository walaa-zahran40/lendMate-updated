import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, filter, Observable, startWith, take } from 'rxjs';
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
import { VendorAddress } from '../../../../lookups/store/vendor-addresses/vendor-address.model';
import { VendorAddressesFacade } from '../../../../lookups/store/vendor-addresses/vendor-addresses.facade';
import { Asset } from '../../../store/assets/asset.model';
import { AssetsFacade } from '../../../store/assets/assets.facade';
import { PaymentType } from '../../../../lookups/store/payment-types/payment-type.model';
import { PaymentTypesFacade } from '../../../../lookups/store/payment-types/payment-types.facade';
import { Officer } from '../../../../organizations/store/officers/officer.model';
import { SignatoryOfficer } from '../../../../organizations/store/signatory-officers/signatory-officer.model';
import { SignatoryOfficersFacade } from '../../../../organizations/store/signatory-officers/signatory-officers.facade';
import { OfficersFacade } from '../../../../organizations/store/officers/officers.facade';

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
  addPOInformationForm!: FormGroup;
  addSignatoryForm!: FormGroup;
  clientId: any;
  firstClaimStatuses$!: Observable<FirstClaimStatus[]>;
  currencies$!: Observable<Currency[]>;
  deliveryWithInUnits$!: Observable<PeriodUnit[]>;
  vendors$!: Observable<Vendor[]>;
  vendorAddresses$!: Observable<VendorAddress[]>;
  assets$!: Observable<Asset[]>;
  paymentTypes$!: Observable<PaymentType[]>;
  paymentPeriodUnits$!: Observable<PeriodUnit[]>;
  officers$!: Observable<Officer[]>;
  firstSignatoryOfficers$!: Observable<SignatoryOfficer[]>;
  secondSignatoryOfficers$!: Observable<SignatoryOfficer[]>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: PurchasingOrdersFacade,
    private firstClaimFacade: FirstClaimStatusesFacade,
    private currencyFacade: CurrenciesFacade,
    private periodUnitsFacade: GracePeriodUnitsFacade,
    private vendorsFacade: VendorsFacade,
    private vendorAddressesFacade: VendorAddressesFacade,
    private assetsFacade: AssetsFacade,
    private paymentTypesFacade: PaymentTypesFacade,
    private officersFacade: OfficersFacade,
    private signatoryOfficersFacade: SignatoryOfficersFacade,
    private router: Router
  ) {}

  ngOnInit() {
    // 1) Build forms
    this.addPurchasingOrdersForm = this.fb.group({
      id: [null],
      firstClaimStatusId: ['', [Validators.required]],
      date: ['', [Validators.required]],
      currencyId: ['', [Validators.required]],
      leasingAgreementId: [null, [Validators.required]],
      deliveryWithin: [null, [Validators.required]],
      deliveryWithinUnitId: ['', [Validators.required]],
      vendorId: ['', [Validators.required]],
      vendorAddressId: ['', [Validators.required]],
      deliveryLocationDetails: ['', [Validators.required]],
      isActive: [true],
    });

    this.addPOInformationForm = this.fb.group({
      assetId: ['', [Validators.required]],
      taxAmount: [null, [Validators.required]],
      purchasePrice: [null, [Validators.required]],
      salesPrice: [null, [Validators.required]],
      stickerPrice: [null, [Validators.required]],
      netValue: [null, [Validators.required]],
      assetCount: [null, [Validators.required]],
      paymentTypeId: ['', [Validators.required]],
      paymentPeriodUnitId: ['', [Validators.required]],
      depreciationValue: [null, [Validators.required]],
      provisionAmount: [null, [Validators.required]],
      downPayment: [null, [Validators.required]],
      isLetterOfGuaranteeAmount: [false],
      letterOfGuaranteeAmount: [{ value: '', disabled: true }],
    });

    this.addSignatoryForm = this.fb.group({
      officerId: ['', [Validators.required]],
      firstSignatoryOfficerId: [null, [Validators.required]],
      secondSignatoryOfficerId: [null, [Validators.required]],
    });

    // 2) Toggle wiring (same for both modes)
    const lgToggle = this.addPOInformationForm.get(
      'isLetterOfGuaranteeAmount'
    ) as FormControl;
    const lgAmount = this.addPOInformationForm.get(
      'letterOfGuaranteeAmount'
    ) as FormControl;
    lgToggle.valueChanges
      .pipe(startWith(lgToggle.value))
      .subscribe((on: boolean) => {
        if (on) {
          lgAmount.enable({ emitEvent: false });
          lgAmount.setValidators([Validators.required, Validators.min(0)]);
        } else {
          lgAmount.reset('', { emitEvent: false });
          lgAmount.clearValidators();
          lgAmount.disable({ emitEvent: false });
        }
        lgAmount.updateValueAndValidity({ emitEvent: false });
      });

    // 3) Lookups
    this.firstClaimFacade.loadAll();
    this.firstClaimStatuses$ = this.firstClaimFacade.all$;
    this.currencyFacade.loadAll();
    this.currencies$ = this.currencyFacade.all$;
    this.periodUnitsFacade.loadAll();
    this.deliveryWithInUnits$ = this.periodUnitsFacade.all$;
    this.vendorsFacade.loadAll();
    this.vendors$ = this.vendorsFacade.all$;
    this.vendorAddressesFacade.loadAll();
    this.vendorAddresses$ = this.vendorAddressesFacade.all$;
    this.assetsFacade.loadAll();
    this.assets$ = this.assetsFacade.all$;
    this.paymentTypesFacade.loadAll();
    this.paymentTypes$ = this.paymentTypesFacade.all$;
    this.periodUnitsFacade.loadAll();
    this.paymentPeriodUnits$ = this.periodUnitsFacade.all$;
    this.officersFacade.loadAll();
    this.officers$ = this.officersFacade.items$;
    this.signatoryOfficersFacade.loadAll();
    this.firstSignatoryOfficers$ = this.signatoryOfficersFacade.all$;
    this.secondSignatoryOfficers$ = this.signatoryOfficersFacade.all$;

    // 4) Determine mode ONCE
    this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';

    // 5) Route handling: load detail if id exists (same for both modes)
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.editMode = !!id; // we “edit” an existing record even in view mode
      if (!id) return;

      this.clientId = +id;
      this.facade.loadById(this.clientId);

      // Wait for lookups so selects can render values in both modes
      const lookupsReady$ = combineLatest([
        this.firstClaimStatuses$,
        this.currencies$,
        this.deliveryWithInUnits$,
        this.vendors$,
        this.vendorAddresses$,
        this.assets$,
        this.paymentTypes$,
        this.paymentPeriodUnits$,
      ]).pipe(
        filter((bags) =>
          bags.every((arr: any) => Array.isArray(arr) && arr.length > 0)
        ),
        take(1)
      );

      const selected$ = this.facade.selected$.pipe(
        filter((po): po is PurchaseOrder => !!po && po.id === this.clientId)
      );

      combineLatest([selected$, lookupsReady$])
        .pipe(take(1))
        .subscribe(([po]) => {
          this.patchFromEntity(po); // ✅ identical patching for edit & view

          // Only difference: disable at the very end when viewing
          if (this.viewOnly) this.disableAllForms();

          console.log('✔️ Patched (viewOnly=', this.viewOnly, ')', {
            header: this.addPurchasingOrdersForm.getRawValue(),
            fin: this.addPOInformationForm.getRawValue(),
            sign: this.addSignatoryForm.getRawValue(),
          });
        });
    });
  }
  ngOnDestroy() {
    this.facade.clearSelected();
  }

  /** Single source of truth for patching both modes */
  private patchFromEntity(ct: PurchaseOrder) {
    // Header
    this.addPurchasingOrdersForm.patchValue(
      {
        id: ct.id,
        firstClaimStatusId: Number(ct.firstClaimStatusId),
        date: ct.date ? new Date(ct.date) : null,
        currencyId: Number(ct.currencyId),
        leasingAgreementId: ct.leasingAgreementId,
        deliveryWithin: ct.deliveryWithin,
        deliveryWithinUnitId: Number(ct.deliveryWithinUnitId),
        vendorId: Number(ct.vendorId),
        vendorAddressId: Number(ct.vendorAddressId),
        deliveryLocationDetails: ct.deliveryLocationDetails,
        isActive: !!ct.isActive,
      },
      { emitEvent: false }
    );

    // Financial (first row only — your form shows one)
    const fa = (ct.purchaseOrderFinancialActivities ?? [])[0];
    if (fa) {
      this.addPOInformationForm.patchValue(
        {
          assetId: Number(fa.assetId),
          taxAmount: fa.taxAmount,
          purchasePrice: fa.purchasePrice,
          salesPrice: fa.salesPrice,
          stickerPrice: fa.stickerPrice,
          netValue: fa.netValue,
          assetCount: fa.assetCount,
          paymentTypeId: Number(fa.paymentTypeId),
          paymentPeriodUnitId: Number(fa.paymentPeriodUnitId),
          depreciationValue: fa.depreciationValue,
          provisionAmount: fa.provisionAmount,
          downPayment: fa.downPayment,
          isLetterOfGuaranteeAmount: !!fa.isLetterOfGuaranteeAmount,
        },
        { emitEvent: true }
      ); // triggers toggle to enable/disable the amount

      const amtCtrl = this.addPOInformationForm.get('letterOfGuaranteeAmount');
      if (fa.isLetterOfGuaranteeAmount) {
        amtCtrl?.setValue(fa.letterOfGuaranteeAmount ?? '', {
          emitEvent: false,
        }); // string
      } else {
        amtCtrl?.reset('', { emitEvent: false });
      }

      // PrimeNG nudge so selects show current values (works for both modes)
      ['assetId', 'paymentTypeId', 'paymentPeriodUnitId'].forEach((name) => {
        const c = this.addPOInformationForm.get(name);
        if (!c) return;
        const v = c.value;
        c.setValue(null, { emitEvent: false });
        c.setValue(v, { emitEvent: false });
      });
    }

    // Signatories
    this.addSignatoryForm.patchValue(
      {
        officerId: Number(ct.officerId),
        firstSignatoryOfficerId: Number(ct.firstSignatoryOfficerId),
        secondSignatoryOfficerId: Number(ct.secondSignatoryOfficerId),
      },
      { emitEvent: false }
    );
  }

  /** Only difference for view mode */
  private disableAllForms() {
    this.addPurchasingOrdersForm.disable({ emitEvent: false });
    this.addPOInformationForm.disable({ emitEvent: false });
    this.addSignatoryForm.disable({ emitEvent: false });
  }

  addOrEditPurchasingOrder() {
    if (this.viewOnly) return;

    // Validate all steps
    const forms = [
      this.addPurchasingOrdersForm,
      this.addPOInformationForm,
      this.addSignatoryForm,
    ];
    if (forms.some((f) => f.invalid)) {
      forms.forEach((f) => f.markAllAsTouched());
      console.warn('❌ One or more forms invalid. Abort create/update.');
      return;
    }

    // Helpers
    const num = (v: any) => Number(v);
    const optNum = (v: any) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    };
    const iso = (d: any) =>
      d instanceof Date ? d.toISOString() : new Date(d).toISOString();

    // Read raw values (includes disabled controls, e.g., letterOfGuaranteeAmount when off)
    const header = this.addPurchasingOrdersForm.getRawValue();
    const fin = this.addPOInformationForm.getRawValue();
    const sign = this.addSignatoryForm.getRawValue();
    const strOrNull = (v: any) =>
      v === null || v === undefined ? null : String(v);

    // Compose API payload
    const payload = {
      firstClaimStatusId: num(header.firstClaimStatusId),
      date: iso(header.date),
      currencyId: num(header.currencyId),
      leasingAgreementId: num(header.leasingAgreementId),
      deliveryWithin: num(header.deliveryWithin),
      deliveryWithinUnitId: num(header.deliveryWithinUnitId),
      vendorId: num(header.vendorId),
      vendorAddressId: num(header.vendorAddressId),
      deliveryLocationDetails: (header.deliveryLocationDetails ?? '').trim(),
      isActive: header.isActive,
      purchaseOrderFinancialActivities: [
        {
          assetId: num(fin.assetId),
          taxAmount: num(fin.taxAmount),
          purchasePrice: num(fin.purchasePrice),
          salesPrice: num(fin.salesPrice),
          stickerPrice: num(fin.stickerPrice),
          netValue: num(fin.netValue),
          assetCount: num(fin.assetCount),
          paymentTypeId: num(fin.paymentTypeId),
          paymentPeriodUnitId: num(fin.paymentPeriodUnitId),
          depreciationValue: num(fin.depreciationValue),
          provisionAmount: num(fin.provisionAmount),
          downPayment: num(fin.downPayment),
          isLetterOfGuaranteeAmount: !!fin.isLetterOfGuaranteeAmount,
          // send null if toggle is off or value is not a finite number
          letterOfGuaranteeAmount: fin.isLetterOfGuaranteeAmount
            ? strOrNull(fin.letterOfGuaranteeAmount)
            : null,
        },
      ],

      officerId: num(sign.officerId),
      firstSignatoryOfficerId: num(sign.firstSignatoryOfficerId),
      secondSignatoryOfficerId: num(sign.secondSignatoryOfficerId),
    };

    console.log('✅ PO payload →', payload);

    if (this.editMode) {
      // If your API expects the same body for update, include id as needed:
      this.facade.update(this.clientId, payload as any);
    } else {
      this.facade.create(payload as any);
    }

    forms.forEach((f) => f.markAsPristine());
    this.router.navigate([
      '/purchasing/purchasing-orders/view-purchasing-orders',
    ]);
  }

  /** Called by the guard. */
  canDeactivate(): boolean {
    return !(
      this.addPurchasingOrdersForm.dirty ||
      this.addPOInformationForm.dirty ||
      this.addSignatoryForm.dirty
    );
  }

  close() {
    console.log('Navigating back to view-purchasing-orders');
    this.router.navigate([
      '/purchasing/purchasing-orders/view-purchasing-orders',
    ]);
  }
}
