import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  combineLatest,
  map,
  tap,
  switchMap,
  filter,
  take,
  Observable,
} from 'rxjs';
import { MandateOfficer } from '../../../../store/mandate-officers/mandate-officer.model';
import { MandateOfficersFacade } from '../../../../store/mandate-officers/mandate-officers.facade';
import { OfficersFacade } from '../../../../../../organizations/store/officers/officers.facade';
import { Officer } from '../../../../../../organizations/store/officers/officer.model';

@Component({
  selector: 'app-add-mandate-officer',
  standalone: false,
  templateUrl: './add-mandate-officer.component.html',
  styleUrl: './add-mandate-officer.component.scss',
})
export class AddMandateOfficerComponent {
  editMode: boolean = false;
  viewOnly: boolean = false;
  addMandateOfficerForm!: FormGroup;
  officers$!: Observable<Officer[]>;
  routeId = this.route.snapshot.params['leasingId'];
  mandateRouteId = this.route.snapshot.params['leasingMandatesId'];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: MandateOfficersFacade,
    private officersFacade: OfficersFacade,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('route', this.route.snapshot);
    console.log('routeId (leasingId):', this.routeId);
    console.log('mandateRouteId (leasingMandatesId):', this.mandateRouteId);
    // 2️⃣ Combine into addMandateOfficerForm
    this.addMandateOfficerForm = this.fb.group({
      id: [null],
      mandateId: [this.mandateRouteId],
      officerId: [null, Validators.required],
    });
    // 2️⃣ pull the raw DB PK ("leasingMandatesId") out of the URL
    const leasingMandatesId = +this.route.snapshot.params['leasingId']!;
    this.officersFacade.loadAll();
    this.officers$ = this.officersFacade.items$;

    // 3️⃣ shove it into your basic form
    this.addMandateOfficerForm.patchValue({
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
        tap(({ leasingMandatesId, mode }) => {
          console.log('mode:', mode);
          this.editMode = mode === 'edit';
          this.viewOnly = mode === 'view';
          this.facade.loadById(leasingMandatesId); // Load all terms for the mandate
        }),
        switchMap(({ selectedItemId }) =>
          this.facade.all$.pipe(
            map((items) => items.find((item) => item.id === selectedItemId)),
            filter((item): item is MandateOfficer => !!item),
            take(1)
          )
        )
      )
      .subscribe((matchedItem) => {
        console.log('✅ Found item to edit:', matchedItem);
        this.patchMandate(this.normalizeMandate(matchedItem));
        if (this.viewOnly) {
          this.addMandateOfficerForm.disable();
        }
      });
  }
  private patchMandate(m: MandateOfficer) {
    if (!m) {
      console.warn('❌ patchMandate called with null/undefined mandate');
      return;
    }

    console.log('📌 patching form with mandate:', m);

    this.addMandateOfficerForm.patchValue({
      id: m.id,
      mandateId: m.mandateId,
      officerId: m.officerId,
    });
  }

  private normalizeMandate(raw: any): MandateOfficer {
    return {
      ...raw,
    };
  }

  get basicForm(): FormGroup {
    return this.addMandateOfficerForm?.get('basic')! as FormGroup;
  }
  onSubmit() {
    console.log('💥 addOrEditIdentificationTypes() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addMandateOfficerForm.valid);
    console.log('  form touched:', this.addMandateOfficerForm.touched);
    console.log('  form raw value:', this.addMandateOfficerForm.getRawValue());

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addMandateOfficerForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addMandateOfficerForm.markAllAsTouched();
      console.log('  → form errors:', this.addMandateOfficerForm.errors);
      return;
    }

    const createPayload: Partial<MandateOfficer> =
      this.addMandateOfficerForm.value;
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

      const updatePayload = this.addMandateOfficerForm.value;

      console.log('  → assembled UPDATE payload:', updatePayload);

      console.log('✏️ Calling facade.update()');
      this.facade.update(mandateId!, updatePayload);
    } else {
      console.log('➕ Calling facade.create()');
      this.facade.create(createPayload);
    }
    if (this.addMandateOfficerForm.valid) {
      this.addMandateOfficerForm.markAsPristine();
    }

    console.log('🧭 Navigating away to view-mandates');
    this.router.navigate([
      `/crm/leasing-mandates/view-mandate-officers/${this.routeId}/${this.mandateRouteId}`,
    ]);
  }

  navigateToView() {
    this.router.navigate([
      `/crm/leasing-mandates/view-mandate-officers/${this.routeId}/${this.mandateRouteId}`,
    ]);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addMandateOfficerForm.dirty;
  }
}
