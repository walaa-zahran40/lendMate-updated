import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { filter, take } from "rxjs";
import { arabicOnlyValidator } from "../../../../shared/validators/arabic-only.validator";
import { selectCurrencies } from '../../store/currencies/currencies.selectors';
import { CurrencyExchangeRate } from "../../store/currency-exchange-rates/currency-exchange-rate.model";
import { CurrencyExchangeRatesFacade } from "../../store/currency-exchange-rates/currency-exchange-rates.facade";
import { loadCurrencies } from "../../store/currencies/currencies.actions";

@Component({
  selector: 'app-add-currencies-exchange',
  standalone: false,
  templateUrl: './add-currencies-exchange.component.html',
  styleUrl: './add-currencies-exchange.component.scss',
})
export class AddCurrenciesExchangeComponent {
  editMode: boolean = false;
  viewOnly = false;
  addCurrenciesExchangeLookupsForm!: FormGroup;
  clientId: any;
  currencies$!: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: CurrencyExchangeRatesFacade,
    private router: Router,
        private store: Store
  ) {}

  ngOnInit() {
    //Select Box
        console.log('🔵 ngOnInit: start');
        this.store.dispatch(loadCurrencies());
        this.currencies$ = this.store.select(selectCurrencies);
        console.log('currencies list', this.currencies$);
        this.currencies$.subscribe((data: any) =>
          console.log('🧪 currencies$ from store:', data)
        );

    this.addCurrenciesExchangeLookupsForm = this.fb.group({
      id: [null],
      exchangeDate: ['', [Validators.required]],
      exchangeRate: [1, [Validators.required, arabicOnlyValidator]],
      currencyId: [null, [Validators.required]],
      parentCurrencyExchangeRateId: [null],
      isActive: [true],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.clientId = +id;

        console.log(this.viewOnly);

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addCurrenciesExchangeLookupsForm.disable();
        }

        this.facade.loadOne(this.clientId);
        this.facade.current$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addCurrenciesExchangeLookupsForm.patchValue({
              id: ct!.id,
              exchangeDate: ct!.exchangeDate,
              exchangeRate: ct!.exchangeRate,
              currencyId: ct!.currencyId
            });
          });
      } else {

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addCurrenciesExchangeLookupsForm.disable();
        }
      }
    });
  }

  addOrEditCurrencyExchangeRate() {
    console.log('💥 addCurrencyExchangeRate() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addCurrenciesExchangeLookupsForm.valid);
    console.log('  form touched:', this.addCurrenciesExchangeLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addCurrenciesExchangeLookupsForm.getRawValue()
    );

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addCurrenciesExchangeLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addCurrenciesExchangeLookupsForm.markAllAsTouched();
      return;
    }

    const { exchangeDate, exchangeRate, currencyId } =
      this.addCurrenciesExchangeLookupsForm.value;
    const payload: Partial<CurrencyExchangeRate> = { exchangeDate, exchangeRate, currencyId };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, exchangeDate, exchangeRate, currencyId } =
        this.addCurrenciesExchangeLookupsForm.value;
      const payload: CurrencyExchangeRate = {
        id,
        exchangeDate,
        exchangeRate,
        currencyId
      };
      console.log(
        '🔄 Dispatching UPDATE id=',
        this.clientId,
        ' payload=',
        payload
      );
      this.facade.update(id, payload);
    } else {
      console.log('➕ Dispatching CREATE payload=', payload);
      this.facade.create(payload);
    }

    this.router.navigate(['/lookups/view-currency-exchange-rates']);
  }
}


