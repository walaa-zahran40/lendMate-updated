import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable,
  tap,
  filter,
  take,
  distinctUntilChanged,
  combineLatest,
  takeUntil,
  Subject,
} from 'rxjs';
import { Area } from '../../../store/areas/area.model';
import { AreasFacade } from '../../../store/areas/areas.facade';
import { selectAllGovernorates } from '../../../store/governorates/governorates.selectors';
import { Governorate } from '../../../store/governorates/governorate.model';
import { loadAll } from '../../../store/governorates/governorates.actions';

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
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: AreasFacade,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    // 1️⃣ Always dispatch the lookup load
    this.store.dispatch(loadAll({}));

    // 2️⃣ Initialize the select‐options observable
    this.governoratesList$ = this.store.select(selectAllGovernorates);

    // 3️⃣ Build the reactive form
    this.addAreasLookupsForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      nameAR: [
        '',
        [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s0-9\u0660-\u0669]+$/)],
      ],
      governorateId: [null, Validators.required],
      isActive: [true],
    });

    // 4️⃣ Read the :id param to enter edit mode (or remain in add mode)
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const idParam = params.get('id');
      this.editMode = !!idParam;
      this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';

      if (this.viewOnly) {
        this.addAreasLookupsForm.disable();
      }

      if (this.editMode) {
        // dispatch loadById
        this.clientId = +idParam!;
        this.facade.loadById(this.clientId);

        this.facade.selected$
            .pipe(
              filter((ct) => !!ct && ct.id === this.clientId),
                tap((ct) => {
                //  ct?.governorateId = ct?.governorate.id;
                console.log('📦 Selected Area:', ct);
                console.log('📌 governorateId:', ct?.governorateId);
              }),
              take(1)
            )
            .subscribe((ct) => {
              this.addAreasLookupsForm.patchValue({
                id: ct?.id,
                name: ct?.name,
                nameAR: ct?.nameAR,
                governorateId: ct?.governorateId ?? ct?.governorate?.id, // ✅ fallback
                isActive: ct?.isActive,
              });
            });
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

    console.log('🧭 Navigating away to view-areas');
    if (this.addAreasLookupsForm.valid) {
      this.addAreasLookupsForm.markAsPristine();
    }

    this.router.navigate(['/lookups/view-areas']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addAreasLookupsForm.dirty;
  }
}
