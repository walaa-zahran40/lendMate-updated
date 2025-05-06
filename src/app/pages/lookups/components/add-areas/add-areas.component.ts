import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap, filter, take } from 'rxjs';
import { loadAll } from '../../store/sectors/sectors.actions';
import { Area } from '../../store/areas/area.model';
import { AreasFacade } from '../../store/areas/areas.facade';
import { Country } from '../../store/countries/country.model';
import { selectCountries } from '../../store/countries/countries.selectors';
import { selectGovernorates } from '../../store/governorates/governorates.selectors';
import { Governorate } from '../../store/governorates/governorate.model';
import { loadGovernorates } from '../../store/governorates/governorates.actions';

@Component({
  selector: 'app-add-areas',
  standalone: false,
  templateUrl: './add-areas.component.html',
  styleUrl: './add-areas.component.scss',
})
export class AddAreasComponent {
  editMode: boolean = false;
  viewOnly = false;
  addAreasLookupsForm!: FormGroup;
  clientId: any;
  governoratesList$!: Observable<Governorate[]>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: AreasFacade,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    //Select Box
    console.log('🔵 ngOnInit: start');
    this.store.dispatch(loadGovernorates());
    this.governoratesList$ = this.store.select(selectGovernorates);
    console.log('governorates list', this.governoratesList$);
    this.governoratesList$.subscribe((data) =>
      console.log('🧪 governoratesList$ from store:', data)
    );

    // 1. Build the form
    this.addAreasLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: ['', [Validators.required]],
      nameAR: [
        '',
        [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)],
      ],
      governorateId: [null, [Validators.required]],
      isActive: [true], // ← new hidden control
    });
    console.log(
      '🔵 Form initialized with default values:',
      this.addAreasLookupsForm.value
    );

    // 2. Watch route params
    this.route.paramMap.subscribe((params) => {
      console.log('🔵 Route paramMap:', params);
      const idParam = params.get('id');
      console.log('🔵 Retrieved id param:', idParam);

      if (idParam) {
        // edit mode
        this.editMode = true;
        this.clientId = +idParam;
        console.log('🔵 Entering EDIT mode for id =', this.clientId);

        // view-only?
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        console.log('🔵 viewOnly flag:', this.viewOnly);
        if (this.viewOnly) {
          this.addAreasLookupsForm.disable();
          console.log('🔵 Form disabled for view-only');
        }

        // load & patch
        console.log('🔵 Dispatching loadById for', this.clientId);
        this.facade.loadById(this.clientId);

        this.facade.selected$
          .pipe(
            tap((ct) => console.log('🔵 selected$ emission:', ct)),
            filter((ct) => !!ct),
            tap((ct) =>
              console.log('🔵 selected$ passed filter, patching form with:', ct)
            ),
            take(1)
          )
          .subscribe((ct) => {
            this.addAreasLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              governorateId: ct!.governorateId,
              isActive: ct!.isActive,
            });
            console.log(
              '🔵 Form after patchValue:',
              this.addAreasLookupsForm.value
            );
          });
      } else {
        // add mode
        this.editMode = false;
        console.log('🔵 Entering ADD mode');

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        console.log('🔵 viewOnly flag (add mode):', this.viewOnly);
        if (this.viewOnly) {
          this.addAreasLookupsForm.disable();
          console.log('🔵 Form disabled for view-only in add mode');
        }
      }
    });
  }

  addOrEditAreas() {
    console.log('💥 addOrEditAreas() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addAreasLookupsForm.valid);
    console.log('  form touched:', this.addAreasLookupsForm.touched);
    console.log('  form raw value:', this.addAreasLookupsForm.getRawValue());

    // Print individual control errors
    const nameCtrl = this.addAreasLookupsForm.get('name');
    const nameARCtrl = this.addAreasLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addAreasLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addAreasLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive, governorateId } =
      this.addAreasLookupsForm.value;
    const payload: Partial<Area> = { name, nameAR, isActive, governorateId };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive, governorate, governorateId } =
        this.addAreasLookupsForm.value;
      const payload: Area = {
        id,
        name,
        nameAR,
        isActive,
        governorate,
        governorateId,
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

    console.log('🧭 Navigating away to view-grace-periods');
    this.router.navigate(['/lookups/view-areas']);
  }
}
