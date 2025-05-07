import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { CurrencyExchangeRate } from '../../store/currency-exchange-rates/currency-exchange-rate.model';
import { CurrencyExchangeRatesFacade } from '../../store/currency-exchange-rates/currency-exchange-rates.facade';
import { Currency } from '../../store/currencies/currency.model';
import { CurrenciesFacade } from '../../store/currencies/currencies.facade';

@Component({
  selector: 'app-add-currencies-exchange',
  standalone: false,
  templateUrl: './add-currencies-exchange.component.html',
  styleUrls: ['./add-currencies-exchange.component.scss'],
})
export class AddCurrenciesExchangeComponent implements OnInit, OnDestroy {
  // Flags driven by mode
  editMode = false;
  viewOnly = false;

  // Reactive form
  addCurrenciesExchangeForm!: FormGroup;

  // Lists and IDs
  currencies: Currency[] = [];
  mode!: 'add' | 'edit' | 'view';
  parentCurrencyId!: number;
  recordId!: number;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private exchangeFacade: CurrencyExchangeRatesFacade,
    private currencyFacade: CurrenciesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    // Read mode and set flags
    this.mode = (this.route.snapshot.queryParamMap.get('mode') as any) ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    // Read IDs
    this.parentCurrencyId = Number(
      this.route.snapshot.queryParamMap.get('currencyId')
    );
    if (this.editMode || this.viewOnly) {
      this.recordId = Number(this.route.snapshot.paramMap.get('id'));
      this.exchangeFacade.loadOne(this.recordId);
    }

    // Build form with currencyId
    this.addCurrenciesExchangeForm = this.fb.group({
      id: [null],
      currencyId: [null, Validators.required],
      exchangeDate: [null, Validators.required],
      exchangeRate: [null, [Validators.required, Validators.min(0)]],
      isActive: [true],
      isCurrent: [true],
    });

    // Load currency dropdown
    this.currencyFacade.loadAll();
    this.currencyFacade.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe((list) => (this.currencies = list));

    // Patch for add mode
    if (this.mode === 'add') {
      this.addCurrenciesExchangeForm.patchValue({
        currencyId: this.parentCurrencyId,
      });
    }

    // Patch for edit/view mode
    if (this.editMode || this.viewOnly) {
      this.exchangeFacade.current$
        .pipe(
          takeUntil(this.destroy$),
          filter((rec) => !!rec)
        )
        .subscribe((rec) => {
          console.log('red', rec);
          this.addCurrenciesExchangeForm.patchValue({
            id: rec.id,
            currencyId: this.parentCurrencyId,
            exchangeDate: new Date(rec.exchangeDate),
            exchangeRate: rec.exchangeRate,
            isActive: rec!.isActive,
            isCurrent: rec!.isCurrent,
          });
        });
    }
  }

  addOrEditCurrencyExchangeRate() {
    // 1) Log the full ActivatedRoute snapshot
    console.log('🛣️ Route snapshot:', this.route.snapshot);

    // 2) Extract both paramMap and queryParamMap in parallel
    const idParam = this.route.snapshot.paramMap.get('id');
    const currencyParamQP = this.route.snapshot.queryParamMap.get('currencyId');

    console.log(`🔍 QueryParams → currencyId = ${currencyParamQP}`);

    // 3) Log the component’s mode flags
    console.log(
      `⚙️ mode = ${this.mode}, editMode = ${this.editMode}, viewOnly = ${this.viewOnly}`
    );

    // 4) Early return in view-only
    if (this.viewOnly) {
      console.warn('🚫 viewOnly mode — aborting submit');
      return;
    }

    // 5) Form validity
    if (this.addCurrenciesExchangeForm.invalid) {
      console.warn('❌ Form is invalid → marking all touched');
      this.addCurrenciesExchangeForm.markAllAsTouched();
      return;
    }

    // 6) The actual payload
    const data = this.addCurrenciesExchangeForm
      .value as Partial<CurrencyExchangeRate>;
    console.log('📦 Payload going to facade:', data);

    // 7) Create vs. update
    if (this.mode === 'add') {
      console.log('➕ Dispatching CREATE');
      this.exchangeFacade.create(data);
    } else {
      console.log('✏️ Dispatching UPDATE id=', data.id);
      this.exchangeFacade.update(data.id!, data);
    }

    // 8) Navigate back: try both query-param and path-param approaches
    if (currencyParamQP) {
      console.log('➡️ Navigating back with PATH param:', currencyParamQP);
      this.router.navigate([
        '/lookups/view-currency-exchange-rates',
        currencyParamQP,
      ]);
    } else if (currencyParamQP) {
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        currencyParamQP
      );
      this.router.navigate([
        `/lookups/view-currency-exchange-rates/${currencyParamQP}`,
      ]);
    } else {
      console.error('❌ Cannot navigate back: currencyId is missing!');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
