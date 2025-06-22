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
import { FinancialFormsFacade } from '../../../../store/financial-form/financial-forms.facade';
import { MessageService } from 'primeng/api';

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
  finantialActivities : any ;  
  routeId = this.route.snapshot.params['leasingId'];
  mandateRouteId = this.route.snapshot.params['leasingMandatesId'];
  mandateParam : any = 0 ; 
  leasingmandateParam : any = 0;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: MandateFeesFacade,
    private feeTypesFacade: FeeTypesFacade,
    private finantialActivitiesFacade: FinancialFormsFacade,
    private router: Router,
    private messageService: MessageService
  ) {}

ngOnInit(): void {
  console.log('Route Snapshot:', this.route.snapshot);

  this.mandateParam = Number(this.route.snapshot.params['leasingId']);
  this.leasingmandateParam = Number(this.route.snapshot.params['leasingMandatesId']);
  const feeId = Number(this.route.snapshot.params['id']); // Ensure this param exists in route config
  const mode = this.route.snapshot.queryParamMap.get('mode');
  this.editMode = mode === 'edit';
  this.viewOnly = mode === 'view';

  console.log("this.leasingmandateParam " , );
  this.finantialActivitiesFacade.loadByLeasingMandateId(this.leasingmandateParam);
    
  this.facade.current$
      .pipe(
        take(1),
        tap((activity) => {
          this.finantialActivities = activity;
          if (!activity || (Array.isArray(activity) && activity.length === 0)) {
            this.messageService.add({
              severity: 'warn',
              summary: 'Missing Financial Activity',
              detail: 'Please add financial activity first.',
              life: 5000,
            });
          }
        })
      )
      .subscribe();

  // Load fee types (used in all modes)
  this.feeTypesFacade.loadAll();
  this.feeTypes$ = this.feeTypesFacade.all$;

  // Form setup
  this.addMandateFeeForm = this.fb.group({
    id: [null],
    mandateId: [this.mandateParam],
    actualPrecentage: [null, Validators.required],
    actualAmount: [null, Validators.required],
    feeTypeId: [null, Validators.required],
  });

  // Always load the specific fee item (for view/edit)
  if (!Number.isNaN(feeId)) {
  this.facade.loadOne(feeId);

  // Patch form once current item is available
  combineLatest([
    this.route.queryParamMap,
    this.facade.current$
  ])
    .pipe(
      map(([query, item]) => {
        const matchedItem = item && item.id === feeId ? item : null;
        return { matchedItem };
      }),
      filter(({ matchedItem }) => !!matchedItem),
      take(1),
      tap(({ matchedItem }) => {
        this.patchMandate(matchedItem!);
        if (this.viewOnly) {
          this.addMandateFeeForm.disable();
        }
      })
    )
    .subscribe();
}

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

    // ✅ Navigate immediately after update — no popup
    this.navigateToView();
  } else {
    // 🔁 Create and wait until item appears in the list
    this.facade.create(payload);

    this.facade.items$
      .pipe(
        takeUntil(this.destroy$),
        filter(items => items && items.length > 0),
        map(items => items.some(item =>
          item.mandateId === this.mandateParam &&
          item.actualAmount === payload.actualAmount &&
          item.actualPrecentage === payload.actualPrecentage
        )),
        filter(match => match),
        take(1),
        tap(() => {
          // ✅ Only show popup for creation
          this.messageService.add({
            severity: 'success',
            summary: 'Saved',
            detail: 'Mandate fee created successfully',
          });
          this.navigateToView();
        })
      )
      .subscribe();
  }
}


  navigateToView() {
    console.log(this.route.snapshot)
    this.router.navigate([
      `/crm/leasing-mandates/view-mandate-fees/${Number(this.route.snapshot.params['leasingId'])}/${Number(this.route.snapshot.params['leasingMandatesId'])}`,
    ]);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addMandateFeeForm.dirty;
  }
}
