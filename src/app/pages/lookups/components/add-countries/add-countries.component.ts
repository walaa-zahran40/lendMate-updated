import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesFacade } from '../../store/countries/countries.facade';
import { filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../shared/validators/arabic-only.validator';
import { Country } from '../../store/countries/country.model';

@Component({
  selector: 'app-add-countries',
  standalone: false,
  templateUrl: './add-countries.component.html',
  styleUrl: './add-countries.component.scss',
})
export class AddCountriesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addCountriesLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: CountriesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addCountriesLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      code2: ['', [Validators.required]],
      code3: ['', [Validators.required]],
      
      isActive: [true], // ← new hidden control
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        // we have an id → edit mode
        this.editMode = true;
        this.clientId = +id;

        // disable if it’s view mode via ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addCountriesLookupsForm.disable();
        }

        // 3. load the existing record & patch the form
        this.facade.loadOne(this.clientId);
        this.facade.current$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addCountriesLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              code2: ct!.code2,
              code3:ct!.code3,
              isActive: ct!.isActive,
            });
          });
      } else {
        // no id → add mode: still check if ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addCountriesLookupsForm.disable();
        }
      }
    });
  }

  addOrEditCountries() {
    console.log('💥 addCountries() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addCountriesLookupsForm.valid);
    console.log('  form touched:', this.addCountriesLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addCountriesLookupsForm.getRawValue()
    );

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addCountriesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addCountriesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, code2, code3,isActive } = this.addCountriesLookupsForm.value;
    const payload: Partial<Country> = { name, nameAR, code2, code3, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, code2, code3 ,isActive} =
        this.addCountriesLookupsForm.value;
      const payload: Country = { id, name, nameAR,code2, code3,isActive };
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

    console.log('🧭 Navigating away to view-countries');
    this.router.navigate(['/lookups/view-countries']);
  }
}

