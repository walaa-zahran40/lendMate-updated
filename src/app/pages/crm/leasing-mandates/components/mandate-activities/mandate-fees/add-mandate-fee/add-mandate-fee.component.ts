import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  filter,
  combineLatest,
  Observable,
  Subject,
  Subscription,
  of,
} from 'rxjs';
import {
  catchError,
  map,
  shareReplay,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { MandateFeesFacade } from '../../../../store/mandate-fees/mandate-fees.facade';
import { MandateFee } from '../../../../store/mandate-fees/mandate-fee.model';
import { FeeTypesFacade } from '../../../../../../lookups/store/fee-types/fee-types.facade';
import { FeeType } from '../../../../../../lookups/store/fee-types/fee-type.model';
import { FinancialFormsFacade } from '../../../../store/financial-form/financial-forms.facade';
import { MessageService } from 'primeng/api';
import {
  CalculationConfigurationByFeeType,
  FeeCalculationConfiguration,
} from '../../../../store/financial-form/financial-form.model';
import { FinancialFormsService } from '../../../../store/financial-form/financial-forms.service';

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
  feeTypes$!: Observable<FeeType[]>;

  private subs = new Subscription();
  private activity!: any; // what you bind to the template:
  public displayConfig: {
    calculationFormula: string;
    baseAmount: number;
  } | null = null;
  finantialActivities: any;
  routeId = this.route.snapshot.params['leasingId'];
  mandateRouteId = this.route.snapshot.params['leasingMandatesId'];
  mandateParam: any = 0;
  leasingmandateParam: any = 0;
  calculationFormula: string = '';
  calcConfig$!: Observable<
    CalculationConfigurationByFeeType | null | undefined
  >;
  calcConfigLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  private leasingMandateId = Number(
    this.route.snapshot.params['leasingMandatesId']
  );
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: MandateFeesFacade,
    private feeTypesFacade: FeeTypesFacade,
    private finantialActivitiesFacade: FinancialFormsFacade,
    private router: Router,
    private messageService: MessageService,
    private activitySvc: FinancialFormsService
  ) {
    // —————————————————————————————
    // 1) Build the form
    // —————————————————————————————
    this.addMandateFeeForm = this.fb.group({
      id: [null],
      mandateId: [this.leasingMandateId],
      actualPercentage: [null, Validators.required],
      actualAmount: [{ value: null, disabled: true }, Validators.required],
      feeTypeId: [null, Validators.required],
    });
    this.addMandateFeeForm.get('actualAmount')!.disable({ emitEvent: false });
  }

  ngOnInit(): void {
    // —————————————————————————————
    // 2) Load the Financial Activity once
    // —————————————————————————————
    this.subs.add(
      this.activitySvc
        .getByLeasingId(this.leasingMandateId)
        .pipe(tap((act) => (this.activity = act)))
        .subscribe()
    );

    // —————————————————————————————
    // 3) On feeType change → fetch & parse config → compute formula + base
    // —————————————————————————————
    this.subs.add(
      this.addMandateFeeForm
        .get('actualPercentage')!
        .valueChanges.pipe(
          // only numbers
          filter((pct): pct is number => pct != null && !isNaN(pct)),
          tap((pct) => {
            const base = this.displayConfig?.baseAmount ?? 0;
            const computed = (pct / 100) * base;
            console.log(
              '[DEBUG] % changed →',
              pct,
              'Base→',
              base,
              'Actual→',
              computed
            );
            const actual = Number(computed.toFixed(4));

            // patch without re-triggering valueChanges
            this.addMandateFeeForm.patchValue(
              { actualAmount: actual },
              { emitEvent: false }
            );
          })
        )
        .subscribe()
    );

    // —————————————————————————————
    // 4) All your existing “edit / view / load fee types” logic
    // —————————————————————————————
    this.mandateParam = Number(this.route.snapshot.params['leasingId']);
    this.leasingmandateParam = Number(
      this.route.snapshot.params['leasingMandatesId']
    );
    const feeId = Number(this.route.snapshot.params['id']);
    const mode = this.route.snapshot.queryParamMap.get('mode');
    this.editMode = mode === 'edit';
    this.viewOnly = mode === 'view';

    // ensure there’s at least *some* activity in the facade
    this.finantialActivitiesFacade.loadByLeasingMandateId(
      this.leasingmandateParam
    );
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

    // fee-type dropdown
    this.feeTypesFacade.loadAll();
    this.feeTypes$ = this.feeTypesFacade.all$;

    // patch “edit” mode
    if (!Number.isNaN(feeId)) {
      this.facade.loadOne(feeId);
      combineLatest([this.route.queryParamMap, this.facade.current$])
        .pipe(
          map(([query, item]) => ({
            matchedItem: item && item.id === feeId ? item : null,
          })),
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
    const feeTypeChanges$ = this.addMandateFeeForm
      .get('feeTypeId')!
      .valueChanges.pipe(
        tap(() => {
          this.addMandateFeeForm
            .get('actualPercentage')!
            .reset(null, { emitEvent: false });
          this.addMandateFeeForm
            .get('actualAmount')!
            .reset(null, { emitEvent: false });
        }),
        filter((id): id is number => !!id),
        switchMap((id) =>
          this.activitySvc.getCalculationConfigurationByFeeTypeId(id).pipe(
            tap((raw) => console.log('[DEBUG] raw config DTO →', raw)),
            map((raw) => ({
              ...raw,
              parameterMappings: JSON.parse(
                raw.feeCalculationConfiguration?.parameterMappingsJson || '{}'
              ),
            }))
          )
        ),
        tap((cfg) => {
          if (cfg) {
            // stash formula & baseAmount as before
            console.log('[DEBUG] parsed config →', cfg);
            this.calculationFormula =
              cfg.feeCalculationConfiguration?.calculationFormula;
            const base = this.resolveBaseAmount(this.activity, cfg);
            console.log('[DEBUG] resolved baseAmount →', base);
            this.displayConfig = {
              calculationFormula: this.calculationFormula,
              baseAmount: base,
            };
            this.addMandateFeeForm.patchValue(
              { actualAmount: base },
              { emitEvent: false }
            );
          }
        }),
        shareReplay({ bufferSize: 1, refCount: true })
      ); // now wire it up to your template
    this.calcConfig$ = feeTypeChanges$;

    // if you want to see “late” subscribers or any edge cases:
    this.calcConfig$.subscribe({
      next: (cfg) => {
        if (!cfg) console.warn('[DEBUG] calcConfig$ emitted null (no formula)');
      },
      error: (err) => console.error('[DEBUG] calcConfig$ stream error', err),
    });
  }

  private resolveBaseAmount(act: any, cfg: any): number {
    const map = cfg?.parameterMappings;
    if (!map || !map.BaseAmount) {
      console.warn('⚠️ Missing BaseAmount mapping in calcConfig:', cfg);
      return this.fallbackBaseAmount(act);
    }

    // 1) raw key from the config, e.g. "NFA" or "downPayment"
    const rawKey = map.BaseAmount as string;

    // 2) look in `act` for a property whose name matches, ignoring case
    const prop = Object.keys(act).find(
      (k) => k.toLowerCase() === rawKey.toLowerCase()
    );

    if (prop && act[prop] != null) {
      return act[prop];
    }

    // 3) if we couldn’t find it, warn & fallback
    console.warn(
      `⚠️ Couldn’t resolve BaseAmount="${rawKey}" on activity:`,
      act
    );
    return this.fallbackBaseAmount(act);
  }

  private patchMandate(m: MandateFee) {
    this.addMandateFeeForm.patchValue({
      id: m.id,
      mandateId: m.mandateId,
      actualAmount: m.actualAmount,
      actualPercentage: m.actualPercentage,
      feeTypeId: m.feeTypeId,
    });
  }
  private fallbackBaseAmount(act: any): number {
    const feeTypeId = this.addMandateFeeForm.get('feeTypeId')!.value;

    switch (feeTypeId) {
      case 1:
        return act.nfa;
      case 2:
        return act.downPayment;
      case 3:
        return act.assetCost;
      default:
        return 0;
    }
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
      this.addMandateFeeForm.markAsPristine();
      this.navigateToView();
    } else {
      // 🔁 Create and wait until item appears in the list
      this.facade.create(payload);

      this.facade.items$
        .pipe(
          takeUntil(this.destroy$),
          filter((items) => items && items.length > 0),
          map((items) =>
            items.some(
              (item) =>
                item.mandateId === this.mandateParam &&
                item.actualAmount === payload.actualAmount &&
                item.actualPercentage === payload.actualPercentage
            )
          ),
          filter((match) => match),
          take(1),
          tap(() => {
            // ✅ Only show popup for creation
            this.messageService.add({
              severity: 'success',
              summary: 'Saved',
              detail: 'Mandate fee created successfully',
            });
            this.addMandateFeeForm.markAsPristine();
            this.navigateToView();
          })
        )
        .subscribe();
    }
  }

  navigateToView() {
    console.log(this.route.snapshot);
    this.router.navigate([
      `/crm/leasing-mandates/view-mandate-fees/${Number(
        this.route.snapshot.params['leasingId']
      )}/${Number(this.route.snapshot.params['leasingMandatesId'])}`,
    ]);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addMandateFeeForm.dirty;
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
