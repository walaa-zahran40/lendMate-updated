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
    console.log('route', this.route.snapshot);
    console.log('routeId (leasingId):', this.routeId);
    console.log('mandateRouteId (leasingMandatesId):', this.mandateRouteId);

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
            filter((item): item is MandateAdditionalTerm => !!item),
            take(1)
          )
        )
      )
      .subscribe((matchedItem) => {
        console.log('✅ Found item to edit:', matchedItem);
        this.patchMandate(this.normalizeMandate(matchedItem));
        if (this.viewOnly) {
          this.addMandateAdditionalTermForm.disable();
        }
      });
  }
  private patchMandate(m: MandateAdditionalTerm) {
    if (!m) {
      console.warn('❌ patchMandate called with null/undefined mandate');
      return;
    }

    console.log('📌 patching form with mandate:', m);

    this.addMandateAdditionalTermForm.patchValue({
      id: m.id,
      mandateId: m.mandateId,
      description: m.description,
      termKey: m.termKey,
    });
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
