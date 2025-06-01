import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, combineLatest } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { MandateAdditionalTermsFacade } from '../../../../store/mandate-additional-terms/mandate-additional-terms.facade';
import { MandateAdditionalTerm } from '../../../../store/mandate-additional-terms/mandate-additional-term.model';

@Component({
  selector: 'app-add-mandate-additional-terms',
  standalone: false,
  templateUrl: './add-mandate-additional-terms.component.html',
  styleUrl: './add-mandate-additional-terms.component.scss',
})
export class AddMandateAdditionalTermsComponent {
  editMode: boolean = false;
  viewOnly: boolean = false;
  addMandateAdditionalTermForm!: FormGroup;
  routeId = this.route.snapshot.params['leasingId'];
  mandateRouteId = this.route.snapshot.params['leasingMandatesId'];
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private facade: MandateAdditionalTermsFacade,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('riyte', this.route.snapshot);

    // 2️⃣ Combine into addMandateAdditionalTermForm
    this.addMandateAdditionalTermForm = this.fb.group({
      id: [null],
      mandateId: [this.mandateRouteId],
      description: [null, Validators.required],
      termKey: [null, Validators.required],
    });
    // 2️⃣ pull the raw DB PK ("leasingMandatesId") out of the URL
    const leasingMandatesId = +this.route.snapshot.params['leasingId']!;

    // 3️⃣ shove it into your basic form
    this.addMandateAdditionalTermForm.patchValue({
      parentMandateId: leasingMandatesId,
    });

    combineLatest({
      params: this.route.paramMap,
      query: this.route.queryParamMap,
    })
      .pipe(
        map(({ params, query }) => ({
          leasingId: +params.get('leasingId')!,
          mode: query.get('mode'),
        })),
        filter(
          ({ leasingId, mode }) =>
            !!leasingId && (mode === 'edit' || mode === 'view')
        ),
        tap(({ leasingId, mode }) => {
          // flip your flags exactly once, at the same time you load
          this.editMode = mode === 'edit';
          this.viewOnly = mode === 'view';
          // ← clear out the old entity so selectedMandate$ doesn’t emit immediately
          this.facade.clearSelected();
          // now fetch afresh
          this.facade.loadById(leasingId);
        }),
        switchMap(({ leasingId }) =>
          this.facade.selected$.pipe(
            filter((m) => m != null && m.id === leasingId),
            take(1)
          )
        )
      )
      .subscribe((mandate: any) => {
        this.patchMandate(this.normalizeMandate(mandate));
        if (this.viewOnly) {
          this.addMandateAdditionalTermForm.disable();
        }
      });
  }
  private patchMandate(m: MandateAdditionalTerm) {
    // 1️⃣ patch all of the flat values, _excluding_ the nested grace group
    this.addMandateAdditionalTermForm.patchValue({
      id: m.id,
      mandateId: m.mandateId,
      description: m.description,
      termKey: m.termKey,
    });

    // 4️⃣ now reset your FormArrays exactly as before…
    const resetArray = (
      fa: FormArray,
      items: any[],
      factory: () => FormGroup,
      name: string
    ) => {
      fa.clear();
      items.forEach((item) => {
        const fg = factory();
        fg.patchValue(item);
        fa.push(fg);
      });
    };
  }

  private normalizeMandate(raw: any): MandateAdditionalTerm {
    return {
      ...raw,
    };
  }

  get basicForm(): FormGroup {
    return this.addMandateAdditionalTermForm?.get('basic')! as FormGroup;
  }
  onSubmit() {
    console.log('💥 addOrEditIdentificationTypes() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addMandateAdditionalTermForm.valid);
    console.log('  form touched:', this.addMandateAdditionalTermForm.touched);
    console.log(
      '  form raw value:',
      this.addMandateAdditionalTermForm.getRawValue()
    );

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addMandateAdditionalTermForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addMandateAdditionalTermForm.markAllAsTouched();
      console.log('  → form errors:', this.addMandateAdditionalTermForm.errors);
      return;
    }

    const createPayload: Partial<MandateAdditionalTerm> =
      this.addMandateAdditionalTermForm.value;
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

      const updatePayload = this.addMandateAdditionalTermForm.value;

      console.log('  → assembled UPDATE payload:', updatePayload);

      console.log('✏️ Calling facade.update()');
      this.facade.update(mandateId!, updatePayload);
    } else {
      console.log('➕ Calling facade.create()');
      this.facade.create(createPayload);
    }

    console.log('🧭 Navigating away to view-mandates');
    this.router.navigate([
      `/crm/leasing-mandates/view-mandate-additional-terms/${this.routeId}/${this.mandateRouteId}`,
    ]);
  }

  navigateToView() {
    this.router.navigate([
      `/crm/leasing-mandates/view-mandate-additional-terms/${this.routeId}/${this.mandateRouteId}`,
    ]);
  }
}
