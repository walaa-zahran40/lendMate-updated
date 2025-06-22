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
  // Log route snapshot for debugging
  console.log('Route Snapshot:', this.route.snapshot);

  // Extract route and query parameters
  this.mandateParam = Number(this.route.snapshot.queryParams['leasingId']);
  this.leasingmandateParam = Number(this.route.snapshot.params['leasingMandatesId']);
  const feeId = Number(this.route.snapshot.params['id']); // Add this param in route config

  // Load dependent data
  this.finantialActivitiesFacade.loadByLeasingMandateId(this.leasingmandateParam);
  this.feeTypesFacade.loadAll();
  this.feeTypes$ = this.feeTypesFacade.all$;

  // Build the form
  this.addMandateFeeForm = this.fb.group({
    id: [null],
    mandateId: [this.mandateParam],
    actualPrecentage: [null, Validators.required],
    actualAmount: [null, Validators.required],
    feeTypeId: [null, Validators.required],
  });

  // Load mandate fees for this leasing mandate
  this.facade.loadOne(feeId);

  // Listen to financial activities to check if missing
  this.facade.current$
    .pipe(
      take(1),
      tap((activities) => {
        this.finantialActivities = activities;
        if (!activities || (Array.isArray(activities) && activities.length === 0)) {
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


  // React to route + store state to set mode and patch data
  combineLatest([
    this.route.queryParamMap,
    this.facade.items$
  ])
    .pipe(
      map(([query, items]) => {
        const mode = query.get('mode');
        const matchedItem = items.find((item) => item.id === feeId);

        return { mode, matchedItem };
      }),
      tap(({ mode }) => {
        this.editMode = mode === 'edit';
        this.viewOnly = mode === 'view';
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
  } else {
    this.facade.create(payload);
  }

  this.addMandateFeeForm.markAsPristine();
  this.navigateToView();
}


  navigateToView() {
    console.log(this.route.snapshot)
    this.router.navigate([
      `/crm/leasing-mandates/view-mandate-fees/${Number(this.route.snapshot.paramMap.get('leasingId'))}/${Number(this.route.snapshot.params['leasingMandatesId'])}`,
    ]);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addMandateFeeForm.dirty;
  }
}
