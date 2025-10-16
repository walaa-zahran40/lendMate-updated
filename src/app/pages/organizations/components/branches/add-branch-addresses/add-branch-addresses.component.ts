import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, forkJoin, filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { Area } from '../../../../lookups/store/areas/area.model';
import { selectAllAreas } from '../../../../lookups/store/areas/areas.selectors';
import { Country } from '../../../../lookups/store/countries/country.model';
import { Governorate } from '../../../../lookups/store/governorates/governorate.model';
import { BranchAddress } from '../../../store/branches/branch-addresses/branch-address.model';
import { BranchAddressesFacade } from '../../../store/branches/branch-addresses/branch-addresses.facade';
import { loadCountries } from '../../../../lookups/store/countries/countries.actions';
import { loadGovernorates } from '../../../../lookups/store/governorates/governorates.actions';
import { loadAreas } from '../../../../lookups/store/areas/areas.actions';
import { selectAllGovernorates } from '../../../../lookups/store/governorates/governorates.selectors';
import { selectAllCountries } from '../../../../lookups/store/countries/countries.selectors';

@Component({
  selector: 'app-add-branch-addresses',
  standalone: false,
  templateUrl: './add-branch-addresses.component.html',
  styleUrl: './add-branch-addresses.component.scss',
})
export class AddBranchAddressesComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addBranchAddressesLookupsForm!: FormGroup;
  clientId: any;
  countriesList$!: Observable<Country[]>;
  governoratesList$!: Observable<Governorate[]>;
  areasList$!: Observable<Area[]>;
  branchId: any;
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
    private facade: BranchAddressesFacade,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    console.log('🟢 ngOnInit start');
    // 1️⃣ Read route parameters
    console.log(this.route.snapshot, 'route');
    this.branchId = Number(this.route.snapshot.queryParams['branchId']);

    this.mode =
      (this.route.snapshot.queryParamMap.get('mode') as
        | 'add'
        | 'edit'
        | 'view') ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';
    console.log('🔍 Params:', {
      branchId: this.branchId,
      mode: this.mode,
      editMode: this.editMode,
      viewOnly: this.viewOnly,
    });

    // 2️⃣ Dispatch actions to load lookup data
    console.log('🚀 Dispatching lookup loads');
    this.store.dispatch(loadCountries({}));
    this.store.dispatch(loadGovernorates({}));
    this.store.dispatch(loadAreas({}));

    // 3️⃣ Grab lookup streams
    this.countriesList$ = this.store.select(selectAllCountries);
    this.governoratesList$ = this.store.select(selectAllGovernorates);
    this.areasList$ = this.store.select(selectAllAreas);

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
      this.addBranchAddressesLookupsForm = this.fb.group({
        id: [null],
        details: ['', [Validators.required]],
        detailsAR: ['', [Validators.required, arabicOnlyValidator]],
        areaId: [null, [Validators.required]],
        governorateId: [null, [Validators.required]],
        countryId: [null, [Validators.required]],
        branchId: [null, [Validators.required]],
        isActive: [true],
      });
      console.log(
        '🛠️ Form initialized with defaults:',
        this.addBranchAddressesLookupsForm.value
      );

      // 6️⃣ If add mode, seed branchId
      if (this.mode === 'add') {
        this.addBranchAddressesLookupsForm.patchValue({
          branchId: this.branchId,
        });
        console.log('✏️ Add mode → patched branchId:', this.branchId);
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
            this.addBranchAddressesLookupsForm.patchValue({
              id: ct?.id,
              details: ct?.details,
              detailsAR: ct?.detailsAR,
              areaId: ct?.areaId,
              governorateId: governorateId,
              countryId: countryId,
              branchId: this.branchId,
              isActive: ct?.isActive,
            });
            console.log(
              '📝 Form after patchValue:',
              this.addBranchAddressesLookupsForm.value
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
              this.addBranchAddressesLookupsForm.disable();
            }
          });
      } else if (this.viewOnly) {
        console.log('🔐 viewOnly (no id) → disabling form');
        this.addBranchAddressesLookupsForm.disable();
      }
    });
  }
  // ngOnInit(): void {
  //   // Read route parameters
  //   this.branchId = Number(this.route.snapshot.paramMap.get('branchId'));
  //   this.mode =
  //     (this.route.snapshot.queryParamMap.get('mode') as
  //       | 'add'
  //       | 'edit'
  //       | 'view') ?? 'add';
  //   this.editMode = this.mode === 'edit';
  //   this.viewOnly = this.mode === 'view';

  //   // Dispatch actions to load lookup data
  //   this.store.dispatch(loadCountries());
  //   this.store.dispatch(loadGovernorates());
  //   this.store.dispatch(loadAreas({}));

  //   // Select lookup data from the store
  //   this.countriesList$ = this.store.select(selectCountries);
  //   this.governoratesList$ = this.store.select(selectGovernorates);
  //   this.areasList$ = this.store.select(selectAllAreas);
  //   console.log(
  //     'c,g,a',
  //     this.countriesList$,
  //     this.governoratesList$,
  //     this.areasList$
  //   );
  //   // Subscribe to lookup data and initialize form
  //   forkJoin({
  //     countries: this.countriesList$.pipe(
  //       filter((list) => list.length > 0),
  //       take(1)
  //     ),
  //     governorates: this.governoratesList$.pipe(
  //       filter((list) => list.length > 0),
  //       take(1)
  //     ),
  //     areas: this.areasList$.pipe(
  //       filter((list) => list.length > 0),
  //       take(1)
  //     ),
  //   }).subscribe(({ countries, governorates, areas }) => {
  //     this.countriesList = countries;
  //     this.governoratesList = governorates;
  //     this.areasList = areas;

  //     // Initialize the form
  //     this.addBranchAddressesLookupsForm = this.fb.group({
  //       id: [null],
  //       details: ['', [Validators.required]],
  //       detailsAR: ['', [Validators.required, arabicOnlyValidator]],
  //       areaId: [null, [Validators.required]],
  //       governorateId: [null, [Validators.required]],
  //       countryId: [null, [Validators.required]],
  //       branchId: [null, [Validators.required]],
  //       isActive: [true],
  //     });

  //     // Set default branchId if in add mode
  //     if (this.mode === 'add') {
  //       this.addBranchAddressesLookupsForm.patchValue({
  //         branchId: this.branchId,
  //       });
  //     }

  //     // Set up cascading dropdowns
  //     this.setupCascadingDropdowns();

  //     // If in edit or view mode, load and patch existing record
  //     if (this.editMode || this.viewOnly) {
  //       this.recordId = Number(this.route.snapshot.paramMap.get('id'));
  //       this.facade.loadOne(this.recordId);
  //       console.log("client IDDDDDDDDDDDDDDD", this.recordId);
  //       this.facade.current$
  //         .pipe(
  //           filter((ct): ct is BranchAddress => !!ct && ct.id === this.recordId),
  //           take(1)
  //         )
  //         .subscribe((ct: BranchAddress) => {
  //           // Derive governorateId and countryId from areaId
  //           console.log('selected areaid', ct.areaId);
  //           const selectedArea = this.areasList.find((a) => a.id === ct.areaId);
  //           console.log('selected area', selectedArea);

  //           const governorateId = selectedArea?.governorate.id ?? null;
  //           console.log('selected governorateId', governorateId);

  //           const selectedGovernorate = this.governoratesList.find(
  //             (g) => g.id === governorateId
  //           );
  //           const countryId = selectedGovernorate?.countryId ?? null;

  //           // Patch the form with existing record data
  //           this.addBranchAddressesLookupsForm.patchValue({
  //             id: ct.id,
  //             details: ct.details,
  //             detailsAR: ct.detailsAR,
  //             areaId: ct.areaId,
  //             governorateId,
  //             countryId,
  //             branchId: this.branchId,
  //             isActive: ct.isActive,
  //           });

  //           // Set the filtered lists
  //           this.filteredGovernorates = this.governoratesList.filter(
  //             (g) => g.countryId === countryId
  //           );
  //           this.filteredAreas = this.areasList.filter(
  //             (a) => a.governorate.id === governorateId
  //           );

  //           // Disable form if in view-only mode
  //           if (this.viewOnly) {
  //             this.addBranchAddressesLookupsForm.disable();
  //           }
  //         });
  //     } else if (this.viewOnly) {
  //       // Disable form if in view-only mode without a record ID
  //       this.addBranchAddressesLookupsForm.disable();
  //     }
  //   });
  // }

  private setupCascadingDropdowns(): void {
    // When country changes, filter governorates
    this.addBranchAddressesLookupsForm
      .get('countryId')
      ?.valueChanges.subscribe((countryId) => {
        this.filteredGovernorates = this.governoratesList.filter(
          (g) => g.countryId === countryId
        );

        const currentGovernorateId =
          this.addBranchAddressesLookupsForm.get('governorateId')?.value;
        const isGovernorateValid = this.filteredGovernorates.some(
          (g) => g.id === currentGovernorateId
        );

        if (!isGovernorateValid) {
          this.addBranchAddressesLookupsForm.get('governorateId')?.reset();
        }

        // Reset and clear areas
        // this.filteredAreas = [];
        // this.addBranchAddressesLookupsForm.get('areaId')?.reset();
      });

    // When governorate changes, filter areas
    this.addBranchAddressesLookupsForm
      .get('governorateId')
      ?.valueChanges.subscribe((governorateId) => {
        this.filteredAreas = this.areasList.filter(
          (a) => a.governorate.id === governorateId
        );

        const currentAreaId =
          this.addBranchAddressesLookupsForm.get('areaId')?.value;
        console.log('currentAreaId', currentAreaId);
        const isAreaValid = this.filteredAreas.some(
          (a) => a.id === currentAreaId
        );

        if (!isAreaValid) {
          this.addBranchAddressesLookupsForm.get('areaId')?.reset();
        }
      });
  }

  addOrEditBranchAddresses() {
    const branchParamQP = this.route.snapshot.queryParamMap.get('branchId');

    console.log('💥 addBranchAddresses() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addBranchAddressesLookupsForm.valid);
    console.log('  form touched:', this.addBranchAddressesLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addBranchAddressesLookupsForm.getRawValue()
    );

    if (this.addBranchAddressesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addBranchAddressesLookupsForm.markAllAsTouched();
      return;
    }

    this.addBranchAddressesLookupsForm.patchValue({
      branchId: branchParamQP,
    });

    const { details, detailsAR, areaId, branchId, isActive } =
      this.addBranchAddressesLookupsForm.value;
    const payload: Partial<BranchAddress> = {
      details,
      detailsAR,
      areaId,
      branchId,
      isActive,
    };
    console.log('  → payload object:', payload);

    const data = this.addBranchAddressesLookupsForm
      .value as Partial<BranchAddress>;
    console.log('📦 Payload going to facade:', data);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    // 7) Create vs. update
    if (this.mode === 'add') {
      console.log('➕ Dispatching CREATE');
      this.facade.create(payload);
    } else {
      console.log('✏️ Dispatching UPDATE id=', data.id);
      this.facade.update(data.id!, data);
    }

    if (branchParamQP) {
      console.log('➡️ Navigating back with PATH param:', branchParamQP);
      this.router.navigate([
        '/organizations/view-branch-addresses',
        branchParamQP,
      ]);
    } else if (branchParamQP) {
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        branchParamQP
      );
      this.router.navigate([
        `/organizations/view-branch-addresses/${branchParamQP}`,
      ]);
    } else {
      console.error('❌ Cannot navigate back: currencyId is missing!');
    }
    if (this.addBranchAddressesLookupsForm.valid) {
      this.addBranchAddressesLookupsForm.markAsPristine();
    }

    // console.log('🧭 Navigating away to view-branch-addresses');
    // this.router.navigate(['/organizations/view-branch-addresses']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addBranchAddressesLookupsForm.dirty;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
