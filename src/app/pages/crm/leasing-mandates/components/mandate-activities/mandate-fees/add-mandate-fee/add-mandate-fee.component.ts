import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, combineLatest, Observable, Subject } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { MandateFeesFacade } from '../../../../store/mandate-fees/mandate-fees.facade';
import { MandateFee } from '../../../../store/mandate-fees/mandate-fee.model';
import { FeeTypesFacade } from '../../../../../../lookups/store/fee-types/fee-types.facade';
import { FeeType } from '../../../../../../lookups/store/fee-types/fee-type.model';

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
    private destroy$ = new Subject<void>();
  feeTypes$! : Observable<FeeType[]>; 
  routeId = this.route.snapshot.params['leasingId'];
  mandateRouteId = this.route.snapshot.params['leasingMandatesId'];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: MandateFeesFacade,
    private feeTypesFacade: FeeTypesFacade,
    private router: Router
  ) {}

ngOnInit() {
  this.feeTypesFacade.loadAll(); 
  this.feeTypes$ = this.feeTypesFacade.all$; 

  this.addMandateFeeForm = this.fb.group({
    id: [null],
    mandateId: [this.mandateRouteId],
    actualPrecentage: [null, Validators.required],
    actualAmount: [null, Validators.required],
    feeTypeId: [null, Validators.required],
  });

  combineLatest({
    params: this.route.paramMap,
    query: this.route.queryParamMap,
    items: this.facade.items$
  })
    .pipe(
      map(({ params, query, items }) => {
        const mode = query.get('mode');
        const selectedItemId = +params.get('leasingId')!;
        const leasingMandatesId = +params.get('leasingMandatesId')!;
        const matchedItem = items.find((item) => item.id === selectedItemId);
        return { mode, selectedItemId, leasingMandatesId, matchedItem };
      }),
      tap(({ mode }) => {
        this.editMode = mode === 'edit';
        this.viewOnly = mode === 'view';
      }),
      filter(({ matchedItem }) => !!matchedItem),
      take(1)
    )
    .subscribe(({ matchedItem }) => {
      this.patchMandate(matchedItem!);
      if (this.viewOnly) {
        this.addMandateFeeForm.disable();
      }
    });
}
 private patchMandate(m: MandateFee) {
  this.addMandateFeeForm.patchValue({
    id: m.id,
    mandateId: m.mandateId,
    actualAmount: m.actualAmount,
    actualPrecentage: m.actualPrecentage,
    feeTypeId: m.feeTypeId
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
  if (this.viewOnly) {
    return;
  }

  if (this.addMandateFeeForm.invalid) {
    this.addMandateFeeForm.markAllAsTouched();
    return;
  }

  const payload: Partial<MandateFee> = this.addMandateFeeForm.value;

  if (this.editMode) {
    this.facade.update(payload.id!, payload);
  } else {
    this.facade.create(payload);
  }

  this.addMandateFeeForm.markAsPristine();
  this.navigateToView();
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
