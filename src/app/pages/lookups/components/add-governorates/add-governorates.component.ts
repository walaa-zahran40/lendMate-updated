import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../shared/validators/arabic-only.validator';
import { Governorate } from '../../store/governorates/governorate.model';
import { GovernoratesFacade } from '../../store/governorates/governorates.facade';
import { Country } from '../../store/countries/country.model';
import { loadAll } from '../../store/countries/countries.actions';
import { selectAllCountries } from '../../store/countries/countries.selectors';

@Component({
  selector: 'app-add-governorates',
  standalone: false,
  templateUrl: './add-governorates.component.html',
  styleUrl: './add-governorates.component.scss',
})
export class AddGovernoratesComponent implements OnInit {
  editMode: boolean = false;
  viewOnly = false;
  addGovernoratesLookupsForm!: FormGroup;
  countriesList$!: Observable<Country[]>;
  retrivedId: any;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private facade: GovernoratesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.dispatch(loadAll({}));
    this.countriesList$ = this.store.select(selectAllCountries);
    this.countriesList$.subscribe((data) =>
      console.log('🧪 countriesList$ from store:', data)
    );

    this.addGovernoratesLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      aramex: ['', [Validators.required]],
      countryId: [null, [Validators.required]],
      isActive: [true], // ← new hidden control
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        // we have an id → edit mode
        this.editMode = true;
        this.retrivedId = +id;

        // disable if it’s view mode via ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addGovernoratesLookupsForm.disable();
        }

        // 3. load the existing record & patch the form
        this.facade.loadById(this.retrivedId);
        this.facade.selected$
          .pipe(
            filter(
              (ct): ct is Governorate => !!ct && ct.id === this.retrivedId
            ),
            take(1)
          )
          .subscribe((ct) => {
            this.addGovernoratesLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              aramex: ct!.aramex,
              countryId: ct!.countryId,
              isActive: ct!.isActive,
            });
          });
      } else {
        // no id → add mode: still check if ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addGovernoratesLookupsForm.disable();
        }
      }
    });
  }

  addOrEditGovernorates() {
    console.log('💥 addGovernorates() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addGovernoratesLookupsForm.valid);
    console.log('  form touched:', this.addGovernoratesLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addGovernoratesLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addGovernoratesLookupsForm.get('name');
    const nameARCtrl = this.addGovernoratesLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addGovernoratesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addGovernoratesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, aramex, countryId, isActive } =
      this.addGovernoratesLookupsForm.value;
    const payload: Partial<Governorate> = {
      name,
      nameAR,
      aramex,
      countryId,
      isActive,
    };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, aramex, countryId, isActive } =
        this.addGovernoratesLookupsForm.value;
      const payload: Governorate = {
        id,
        name,
        nameAR,
        aramex,
        countryId,
        isActive,
      };
      console.log(
        '🔄 Dispatching UPDATE id=',
        this.retrivedId,
        ' payload=',
        payload
      );
      this.facade.update(id, payload);
    } else {
      console.log('➕ Dispatching CREATE payload=', payload);
      this.facade.create(payload);
    }

    console.log('🧭 Navigating away to view-governorates');
    this.router.navigate(['/lookups/view-governorates']);
  }
}
