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
import { FinancialForm } from '../../../../store/financial-form/financial-form.model';
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
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: MandateFeesFacade,
    private feeTypesFacade: FeeTypesFacade,
    private finantialActivitiesFacade: FinancialFormsFacade,
    private router: Router,
    private messageService: MessageService
  ) {}

ngOnInit() {

  console.log(this.route.snapshot);
  console.log("leasingMandateId" , Number(this.route.snapshot.queryParams['leasingMandateId'])); 
  this.finantialActivitiesFacade.loadByLeasingMandateId(Number(this.route.snapshot.queryParams['leasingMandateId']));
  this.finantialActivities = this.facade.current$; 
  this.finantialActivitiesFacade.loadByLeasingMandateId(Number(this.route.snapshot.queryParams['leasingMandateId']));

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

  this.feeTypesFacade.loadAll(); 
  this.feeTypes$ = this.feeTypesFacade.all$; 

  this.addMandateFeeForm = this.fb.group({
    id: [null],
    mandateId: [Number(this.route.snapshot.paramMap.get('leasingId'))],
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
      `/crm/leasing-mandates/view-mandate-fees/${Number(this.route.snapshot.paramMap.get('leasingId'))}/${Number(this.route.snapshot.queryParams['leasingMandateId'])}`,
    ]);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addMandateFeeForm.dirty;
  }
}
