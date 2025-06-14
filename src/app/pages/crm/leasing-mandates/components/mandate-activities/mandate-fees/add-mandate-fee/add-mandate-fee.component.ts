import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, combineLatest } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { MandateFeesFacade } from '../../../../store/mandate-fees/mandate-fees.facade';
import { MandateFee } from '../../../../store/mandate-fees/mandate-fee.model';

@Component({
  selector: 'app-add-mandate-fee',
  standalone: false,
  templateUrl: './add-mandate-fee.component.html',
  styleUrl: './add-mandate-fee.component.scss',
})
export class AddMandateFeeComponent {
  editMode: boolean = false;
  viewOnly: boolean = false;
  addMandateFeeForm!: FormGroup;
  routeId = this.route.snapshot.params['leasingId'];
  mandateRouteId = this.route.snapshot.params['leasingMandatesId'];
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private facade: MandateFeesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('route', this.route.snapshot);
    console.log('routeId (leasingId):', this.routeId);
    console.log('mandateRouteId (leasingMandatesId):', this.mandateRouteId);

    // 2️⃣ Combine into addMandateFeeForm
    this.addMandateFeeForm = this.fb.group({
      id: [null],
      mandateId: [this.mandateRouteId],
      description: [null, Validators.required],
      termKey: [null, Validators.required],
    });
    // 2️⃣ pull the raw DB PK ("leasingMandatesId") out of the URL
    const leasingMandatesId = +this.route.snapshot.params['leasingId']!;

    // 3️⃣ shove it into your basic form
    this.addMandateFeeForm.patchValue({
      mandateId: leasingMandatesId,
    });

    const routeParams$ = combineLatest({
      params: this.route.paramMap,
      query: this.route.queryParamMap,
    }).pipe(
      map(({ params, query }) => ({
        leasingMandatesId: +params.get('leasingMandatesId')!,
        selectedItemId: +params.get('leasingId')!, // this is the ID of the *item* (e.g. 2812)
        mode: query.get('mode'),
      }))
    );

    routeParams$
      .pipe(
        tap(({ leasingMandatesId, selectedItemId, mode }) => {
          console.log('mode:', mode);
          this.editMode = mode === 'edit';
          this.viewOnly = mode === 'view';
          this.facade.loadById(leasingMandatesId); // Load all terms for the mandate
        }),
        switchMap(({ selectedItemId }) =>
          this.facade.all$.pipe(
            map((items) => items.find((item) => item.id === selectedItemId)),
            filter((item): item is MandateFee => !!item),
            take(1)
          )
        )
      )
      .subscribe((matchedItem) => {
        console.log('✅ Found item to edit:', matchedItem);
        this.patchMandate(this.normalizeMandate(matchedItem));
        if (this.viewOnly) {
          this.addMandateFeeForm.disable();
        }
      });
  }
  private patchMandate(m: MandateFee) {
    if (!m) {
      console.warn('❌ patchMandate called with null/undefined mandate');
      return;
    }

    console.log('📌 patching form with mandate:', m);

    this.addMandateFeeForm.patchValue({
      id: m.id,
      mandateId: m.mandateId,
    });
  }

  private normalizeMandate(raw: any): MandateFee {
    return {
      ...raw,
    };
  }

  get basicForm(): FormGroup {
    return this.addMandateFeeForm?.get('basic')! as FormGroup;
  }
  onSubmit() {
    console.log('💥 addOrEditIdentificationTypes() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addMandateFeeForm.valid);
    console.log('  form touched:', this.addMandateFeeForm.touched);
    console.log('  form raw value:', this.addMandateFeeForm.getRawValue());

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addMandateFeeForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addMandateFeeForm.markAllAsTouched();
      console.log('  → form errors:', this.addMandateFeeForm.errors);
      return;
    }

    const createPayload: Partial<MandateFee> = this.addMandateFeeForm.value;
    console.log('  → assembled CREATE payload:', createPayload);

    if (this.editMode) {
      const leaseIdStr = this.route.snapshot.paramMap.get('leasingMandatesId');
      const leaseId = leaseIdStr ? +leaseIdStr : null;
      const mandateIdStr = this.route.snapshot.paramMap.get('leasingId');
      const mandateId = mandateIdStr ? +mandateIdStr : null;

      console.log(
        '🔍 route param leasingId:',
        leaseIdStr,
        mandateIdStr,
        'parsed →',
        leaseId,
        mandateIdStr
      );

      // Re-destructure to keep naming clear

      const updatePayload = this.addMandateFeeForm.value;

      console.log('  → assembled UPDATE payload:', updatePayload);

      console.log('✏️ Calling facade.update()');
      this.facade.update(mandateId!, updatePayload);
    } else {
      console.log('➕ Calling facade.create()');
      this.facade.create(createPayload);
    }
    if (this.addMandateFeeForm.valid) {
      this.addMandateFeeForm.markAsPristine();
    }

    console.log('🧭 Navigating away to view-mandates');
    this.router.navigate([
      `/crm/leasing-mandates/view-mandate-fees/${this.routeId}/${this.mandateRouteId}`,
    ]);
  }

  navigateToView() {
    this.router.navigate([
      `/crm/leasing-mandates/view-mandate-fees/${this.routeId}/${this.mandateRouteId}`,
    ]);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addMandateFeeForm.dirty;
  }
}
