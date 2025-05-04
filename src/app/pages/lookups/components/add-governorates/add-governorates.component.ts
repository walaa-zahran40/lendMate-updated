import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../shared/validators/arabic-only.validator';
import { Governorate } from '../../store/governorates/governorate.model';
import { GovernorateFacade } from '../../store/governorates/governorates.facade';
import { loadCountries, loadCountry } from '../../store/countries/countries.actions';

@Component({
  selector: 'app-add-governorates',
  standalone: false,
  templateUrl: './add-governorates.component.html',
  styleUrl: './add-governorates.component.scss',
})
export class AddGovernoratesComponent implements OnInit{
  editMode: boolean = false;
  viewOnly = false;
  addGovernoratesLookupsForm!: FormGroup;
  countriesList: any[] = [];
  retrivedId: any;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private facade: GovernorateFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addGovernoratesLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      aramix: ['', [Validators.required]],
      countryId: ['', [Validators.required]],
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
        this.facade.loadOne(this.retrivedId);
        this.facade.current$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addGovernoratesLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              aramix:ct!.aramex,
              countryId:ct!.countryId,
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

    this.store.dispatch(loadCountries());
  
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

    const { name, nameAR, isActive } = this.addGovernoratesLookupsForm.value;
    const payload: Partial<Governorate> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } =
        this.addGovernoratesLookupsForm.value;
      const payload: Governorate = { id, name, nameAR, isActive };
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