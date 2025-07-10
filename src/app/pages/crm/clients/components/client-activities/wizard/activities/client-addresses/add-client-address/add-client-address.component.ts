import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, forkJoin, filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../../../../../../shared/validators/arabic-only.validator';
import { AddressType } from '../../../../../../../../lookups/store/address-types/address-type.model';
import { selectAllAddressTypes } from '../../../../../../../../lookups/store/address-types/address-types.selectors';
import { Area } from '../../../../../../../../lookups/store/areas/area.model';
import { loadAreas } from '../../../../../../../../lookups/store/areas/areas.actions';
import { selectAllAreas } from '../../../../../../../../lookups/store/areas/areas.selectors';
import { loadCountries } from '../../../../../../../../lookups/store/countries/countries.actions';
import { selectAllCountries } from '../../../../../../../../lookups/store/countries/countries.selectors';
import { Country } from '../../../../../../../../lookups/store/countries/country.model';
import { Governorate } from '../../../../../../../../lookups/store/governorates/governorate.model';
import { loadGovernorates } from '../../../../../../../../lookups/store/governorates/governorates.actions';
import { selectAllGovernorates } from '../../../../../../../../lookups/store/governorates/governorates.selectors';
import { ClientAddress } from '../../../../../../store/client-addresses/client-address.model';
import { ClientAddressesFacade } from '../../../../../../store/client-addresses/client-addresses.facade';
import { loadAll as loadAddressTypes } from '../../../../../../../../lookups/store/address-types/address-types.actions';

@Component({
  selector: 'app-add-client-address',
  standalone: false,
  templateUrl: './add-client-address.component.html',
  styleUrl: './add-client-address.component.scss',
})
export class AddClientAddressesComponent implements OnInit {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addClientAddressesLookupsForm!: FormGroup;
  retrivedId: any;
  countriesList$!: Observable<Country[]>;
  governoratesList$!: Observable<Governorate[]>;
  areasList$!: Observable<Area[]>;
  addressTypesList$!: Observable<AddressType[]>;
  clientId: any;
  recordId!: number;
  private destroy$ = new Subject<void>();
  countriesList: Country[] = [];
  governoratesList: Governorate[] = [];
  areasList: Area[] = [];
  filteredGovernorates: Governorate[] = [];
  filteredAreas: Area[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientAddressesFacade,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    console.log('🟢 ngOnInit start');
    // 1️⃣ Read route parameters
    console.log(this.route.snapshot, 'route');
    this.clientId = Number(this.route.snapshot.queryParams['clientId']);

    this.mode =
      (this.route.snapshot.queryParamMap.get('mode') as
        | 'add'
        | 'edit'
        | 'view') ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';
    console.log('🔍 Params:', {
      clientId: this.clientId,
      mode: this.mode,
      editMode: this.editMode,
      viewOnly: this.viewOnly,
    });

    // 2️⃣ Dispatch actions to load lookup data
    console.log('🚀 Dispatching lookup loads');
    this.store.dispatch(loadCountries({}));
    this.store.dispatch(loadGovernorates({}));
    this.store.dispatch(loadAreas({}));
    this.store.dispatch(loadAddressTypes({}));

    // 3️⃣ Grab lookup streams
    this.countriesList$ = this.store.select(selectAllCountries);
    this.governoratesList$ = this.store.select(selectAllGovernorates);
    this.areasList$ = this.store.select(selectAllAreas);
    this.addressTypesList$ = this.store.select(selectAllAddressTypes);

    // 4️⃣ Wait for all lookups to arrive
    forkJoin({
      countries: this.countriesList$.pipe(
        filter((l) => l.length > 0),
        take(1)
      ),
      governorates: this.governoratesList$.pipe(
        filter((l) => l.length > 0),
        take(1)
      ),
      areas: this.areasList$.pipe(
        filter((l) => l.length > 0),
        take(1)
      ),
    }).subscribe(({ countries, governorates, areas }) => {
      console.log(
        '✅ Lookups loaded:',
        countries.length,
        'countries,',
        governorates.length,
        'governorates,',
        areas.length,
        'areas'
      );
      this.countriesList = countries;
      this.governoratesList = governorates;
      this.areasList = areas;

      // 5️⃣ Build the form
      this.addClientAddressesLookupsForm = this.fb.group({
        id: [null],
        details: ['', [Validators.required]],
        detailsAR: ['', [Validators.required, arabicOnlyValidator]],
        areaId: [null, [Validators.required]],
        governorateId: [null, [Validators.required]],
        countryId: [null, [Validators.required]],
        clientId: [null, [Validators.required]],
        addressTypeId: [null, [Validators.required]],
        isActive: [true],
      });
      console.log(
        '🛠️ Form initialized with defaults:',
        this.addClientAddressesLookupsForm.value
      );

      // 6️⃣ If add mode, seed clientId
      if (this.mode === 'add') {
        this.addClientAddressesLookupsForm.patchValue({
          clientId: this.clientId,
        });
        console.log('✏️ Add mode → patched clientId:', this.clientId);
      }

      // 7️⃣ Set up cascading dropdowns
      this.setupCascadingDropdowns();

      // 8️⃣ If editing or viewing, load & patch
      if (this.editMode || this.viewOnly) {
        console.log('edit ', this.editMode, 'route', this.route.snapshot);
        this.recordId = Number(this.route.snapshot.paramMap.get('id'));
        console.log('🔄 Loading existing record id=', this.recordId);
        this.facade.loadOne(this.recordId);

        this.facade.current$
          .pipe(
            filter((ct) => !!ct && ct.id === this.recordId),
            take(1)
          )
          .subscribe((ct) => {
            console.log('🛰️ facade.current$ emitted:', ct);

            // derive gov & country from area
            const selArea = this.areasList.find((a) => a.id === ct?.areaId);
            console.log('🏷️ selectedArea:', selArea);
            const governorateId = selArea?.governorate.id ?? null;
            const selGov = this.governoratesList.find(
              (g) => g.id === governorateId
            );
            const countryId = selGov?.countryId ?? null;
            console.log(
              '🌐 derived governorateId:',
              governorateId,
              'countryId:',
              countryId
            );

            // patch form
            this.addClientAddressesLookupsForm.patchValue({
              id: ct?.id,
              details: ct?.details,
              detailsAR: ct?.detailsAR,
              areaId: ct?.areaId,
              governorateId: governorateId,
              countryId: countryId,
              clientId: this.clientId,
              addressTypeId: ct?.addressTypeId,
              isActive: ct?.isActive,
            });
            console.log(
              '📝 Form after patchValue:',
              this.addClientAddressesLookupsForm.value
            );

            // filtered dropdown lists
            this.filteredGovernorates = this.governoratesList.filter(
              (g) => g.countryId === countryId
            );
            this.filteredAreas = this.areasList.filter(
              (a) => a.governorate.id === governorateId
            );
            console.log(
              '🔢 filteredGovernorates:',
              this.filteredGovernorates.length,
              'filteredAreas:',
              this.filteredAreas.length
            );

            // view-only?
            if (this.viewOnly) {
              console.log('🔐 viewOnly → disabling form');
              this.addClientAddressesLookupsForm.disable();
            }
          });
      } else if (this.viewOnly) {
        console.log('🔐 viewOnly (no id) → disabling form');
        this.addClientAddressesLookupsForm.disable();
      }
    });
  }

  private setupCascadingDropdowns(): void {
    // When country changes, filter governorates
    this.addClientAddressesLookupsForm
      .get('countryId')
      ?.valueChanges.subscribe((countryId) => {
        this.filteredGovernorates = this.governoratesList.filter(
          (g) => g.countryId === countryId
        );

        const currentGovernorateId =
          this.addClientAddressesLookupsForm.get('governorateId')?.value;
        const isGovernorateValid = this.filteredGovernorates.some(
          (g) => g.id === currentGovernorateId
        );

        if (!isGovernorateValid) {
          this.addClientAddressesLookupsForm.get('governorateId')?.reset();
        }

        // Reset and clear areas
        // this.filteredAreas = [];
        // this.addClientAddressesLookupsForm.get('areaId')?.reset();
      });

    // When governorate changes, filter areas
    this.addClientAddressesLookupsForm
      .get('governorateId')
      ?.valueChanges.subscribe((governorateId) => {
        this.filteredAreas = this.areasList.filter(
          (a) => a.governorate.id === governorateId
        );

        const currentAreaId =
          this.addClientAddressesLookupsForm.get('areaId')?.value;
        console.log('currentAreaId', currentAreaId);
        const isAreaValid = this.filteredAreas.some(
          (a) => a.id === currentAreaId
        );

        if (!isAreaValid) {
          this.addClientAddressesLookupsForm.get('areaId')?.reset();
        }
      });
  }

  addOrEditClientAddresses() {
    const clientParamQP = this.route.snapshot.queryParamMap.get('clientId');

    console.log('💥 addClientAddresses() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addClientAddressesLookupsForm.valid);
    console.log('  form touched:', this.addClientAddressesLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addClientAddressesLookupsForm.getRawValue()
    );

    if (this.addClientAddressesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addClientAddressesLookupsForm.markAllAsTouched();
      return;
    }

    this.addClientAddressesLookupsForm.patchValue({
      clientId: clientParamQP,
    });

    const { details, detailsAR, areaId, clientId, addressTypeId, isActive } =
      this.addClientAddressesLookupsForm.value;
    const payload: Partial<ClientAddress> = {
      details,
      detailsAR,
      areaId,
      clientId,
      addressTypeId,
      isActive,
    };
    console.log('  → payload object:', payload);

    const data = this.addClientAddressesLookupsForm
      .value as Partial<ClientAddress>;
    console.log('📦 Payload going to facade:', data);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(retrivedId):', routeId);

    // 7) Create vs. update
    if (this.mode === 'add') {
      console.log('➕ Dispatching CREATE');
      this.facade.create(payload);
    } else {
      console.log('✏️ Dispatching UPDATE id=', data.id);
      this.facade.update(data.id!, data);
    }
    if (this.addClientAddressesLookupsForm.valid) {
      this.addClientAddressesLookupsForm.markAsPristine();
    }

    if (clientParamQP) {
      console.log('➡️ Navigating back with PATH param:', clientParamQP);
      this.router.navigate([
        '/crm/clients/view-client-addresses',
        clientParamQP,
      ]);
    } else if (clientParamQP) {
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        clientParamQP
      );
      this.router.navigate([
        `/crm/clients/view-client-addresses/${clientParamQP}`,
      ]);
    } else {
      console.error('❌ Cannot navigate back: clientId is missing!');
    }
    // console.log('🧭 Navigating away to view-client-addresses');
    // this.router.navigate(['/organizations/view-client-addresses']);
  }

  /** Called by the guard. */
  canDeactivate(): boolean {
    console.log('🛡️ canDeactivate called');
    return !this.addClientAddressesLookupsForm.dirty;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
