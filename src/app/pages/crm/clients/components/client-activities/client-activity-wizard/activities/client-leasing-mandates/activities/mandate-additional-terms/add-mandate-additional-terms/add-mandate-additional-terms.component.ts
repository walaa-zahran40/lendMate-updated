import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, combineLatest, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { MandateAdditionalTermsFacade } from '../../../../../../../../store/client-leasing-mandates/activities/mandate-additional-terms/client-mandate-additional-terms.facade';
import { MandateAdditionalTerm } from '../../../../../../../../../leasing-mandates/store/mandate-additional-terms/mandate-additional-term.model';

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
  routeId = this.route.snapshot.params['clientId'];
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
    this.addMandateAdditionalTermForm = this.fb.group({
      id: [null],
      mandateId: [null, Validators.required],
      termKey: [null, Validators.required],
      description: [null, Validators.required],
    });

    combineLatest({
      pm: this.route.paramMap,
      qm: this.route.queryParamMap,
    })
      .pipe(
        map(({ pm, qm }) => {
          // parent mandate is always in leasingMandatesId
          const mandateIdParam = pm.get('leasingMandatesId')!;
          const mandateId = +mandateIdParam;

          // termId only exists on edit routes
          const termIdParam = pm.get('termId');
          const termId = termIdParam ? +termIdParam : null;

          const clientId = +pm.get('clientId')!;
          const mode = qm.get('mode')!;

          console.log('[map output]', { mandateId, termId, clientId, mode });

          return { mandateId, termId, clientId, mode };
        }),
        tap(({ mandateId, termId, mode }) => {
          this.editMode = mode === 'edit';
          this.viewOnly = mode === 'view';

          // patch parent mandate always
          this.addMandateAdditionalTermForm.patchValue({ mandateId });

          // only load if we're editing and we actually have a termId
          if (this.editMode && termId != null) {
            this.facade.loadByAdditionalId(termId);
          }
        }),

        // if termId is null (create mode), immediately emit null
        switchMap(({ termId }) =>
          termId != null
            ? this.facade.selectedMandateAdditionalTerm$.pipe(
                filter(
                  (t): t is MandateAdditionalTerm => !!t && t.id === termId
                ),
                take(1)
              )
            : of(null)
        )
      )
      .subscribe((term) => {
        if (term) {
          // only patch when editing
          this.addMandateAdditionalTermForm.patchValue({
            id: term.id,
            termKey: term.termKey,
            description: term.description,
          });
          if (this.viewOnly) {
            this.addMandateAdditionalTermForm.disable();
          }
        }
      });
  }

  // private patchMandate(m: MandateAdditionalTerm) {
  //   if (!m) {
  //     console.warn('❌ patchMandate called with null/undefined mandate');
  //     return;
  //   }

  //   console.log('📌 patching form with mandate:', m);

  //   this.addMandateAdditionalTermForm.patchValue({
  //     id: term.id,
  //     mandateId: term.mandateId,
  //     description: term.description,
  //     termKey: term.termKey,
  //   });
  // }

  private normalizeMandate(raw: any): MandateAdditionalTerm {
    return {
      ...raw,
    };
  }

  get basicForm(): FormGroup {
    return this.addMandateAdditionalTermForm?.get('basic')! as FormGroup;
  }
  onSubmit() {
    if (this.viewOnly) {
      return;
    }

    if (this.addMandateAdditionalTermForm.invalid) {
      this.addMandateAdditionalTermForm.markAllAsTouched();
      return;
    }

    const payload: Partial<MandateAdditionalTerm> =
      this.addMandateAdditionalTermForm.value;
    console.log('payload', payload);
    if (this.editMode) {
      this.facade.update(payload.id!, payload);
    } else {
      this.facade.create(payload);
    }

    // mark clean and navigate back
    this.addMandateAdditionalTermForm.markAsPristine();
    const { leaseId, clientId } = {
      leaseId: +this.route.snapshot.params['leasingMandatesId'],
      clientId: +this.route.snapshot.params['clientId'],
    };
    this.router.navigate([
      `/crm/leasing-mandates/view-mandate-additional-terms/${leaseId}/${clientId}`,
    ]);
  }

  navigateToView() {
    this.router.navigate([
      `/crm/leasing-mandates/view-mandate-additional-terms/${this.mandateRouteId}/${this.routeId}`,
    ]);
  }
  canDeactivate(): boolean {
    return !this.addMandateAdditionalTermForm.dirty;
  }
}
