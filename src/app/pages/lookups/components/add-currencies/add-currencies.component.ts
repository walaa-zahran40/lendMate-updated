import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../shared/validators/arabic-only.validator';
import { Currency } from '../../store/curencies/currency.model';
import { CurrenciesFacade } from '../../store/curencies/currencies.facade';

@Component({
  selector: 'app-add-currencies',
  standalone: false,
  templateUrl: './add-currencies.component.html',
  styleUrl: './add-currencies.component.scss',
})
export class AddCurrenciesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addCurrenciesLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: CurrenciesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addCurrenciesLookupsForm = this.fb.group({
      id: [null],
      name: [
        '',
        [Validators.required], 
      ],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      iso: [
        '',
        [Validators.required], 
      ],
      isDefault: [
        false,
        [Validators.required], 
      ],
      isActive: [true],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
      console.log("Arwaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" ,{id});

        this.editMode = true;
        this.clientId = +id;


        console.log(this.viewOnly);

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addCurrenciesLookupsForm.disable();
        }

        this.facade.loadOne(this.clientId);
        this.facade.current$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addCurrenciesLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              iso:ct!.iso,
              isDefault:ct!.isDefault,
              isActive: ct!.isActive,
            });
          });
      } else {
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addCurrenciesLookupsForm.disable();
        }
      }
    });
  }

  addOrEditCurrency() {
    console.log('💥 addCurrency() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addCurrenciesLookupsForm.valid);
    console.log('  form touched:', this.addCurrenciesLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addCurrenciesLookupsForm.getRawValue()
    );

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addCurrenciesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addCurrenciesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, iso , isDefault  } = this.addCurrenciesLookupsForm.value;
    const payload: Partial<Currency> = { name, nameAR, iso , isDefault  };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, iso, isDefault, isActive } =
        this.addCurrenciesLookupsForm.value;
      const payload: Currency = {
        id, name, nameAR, iso, isDefault, isActive,
        code: ''
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

    console.log('🧭 Navigating away to view-company-types');
    this.router.navigate(['/lookups/view-currencies']);
  }
}
