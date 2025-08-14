import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, filter, take } from 'rxjs';
import { LicenseType } from '../../../store/license-types/license-type.model';
import { LicenseTypesFacade } from '../../../store/license-types/license-types.facade';

@Component({
  selector: 'app-add-license-type',
  standalone: false,
  templateUrl: './add-license-type.component.html',
  styleUrl: './add-license-type.component.scss',
})
export class AddLicenseTypeComponent {
  editMode: boolean = false;
  viewOnly = false;
  addLicenseTypesLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: LicenseTypesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('🔵 ngOnInit: start');

    // 1. Build the form
    this.addLicenseTypesLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: ['', [Validators.required]],
      nameAR: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\u0600-\u06FF\s0-9\u0660-\u0669]+$/),
        ],
      ],
      isActive: [true], // ← new hidden control
    });
    console.log(
      '🔵 Form initialized with default values:',
      this.addLicenseTypesLookupsForm.value
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
          this.addLicenseTypesLookupsForm.disable();
          console.log('🔵 Form disabled for view-only');
        }

        // load & patch
        console.log('🔵 Dispatching loadById for', this.clientId);
        this.facade.loadById(this.clientId);

        this.facade.selected$
          .pipe(
            tap((ct) => console.log('🔵 selected$ emission:', ct)),
            filter((ct): ct is LicenseType => !!ct && ct.id === this.clientId),
            tap((ct) =>
              console.log('🔵 selected$ passed filter, patching form with:', ct)
            ),
            take(1)
          )
          .subscribe((ct) => {
            this.addLicenseTypesLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              isActive: ct!.isActive,
            });
            console.log(
              '🔵 Form after patchValue:',
              this.addLicenseTypesLookupsForm.value
            );
          });
      } else {
        // add mode
        this.editMode = false;
        console.log('🔵 Entering ADD mode');

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        console.log('🔵 viewOnly flag (add mode):', this.viewOnly);
        if (this.viewOnly) {
          this.addLicenseTypesLookupsForm.disable();
          console.log('🔵 Form disabled for view-only in add mode');
        }
      }
    });
  }

  addOrEditLicenseTypes() {
    console.log('💥 addOrEditLicenseTypes() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addLicenseTypesLookupsForm.valid);
    console.log('  form touched:', this.addLicenseTypesLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addLicenseTypesLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addLicenseTypesLookupsForm.get('name');
    const nameARCtrl = this.addLicenseTypesLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addLicenseTypesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addLicenseTypesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } = this.addLicenseTypesLookupsForm.value;
    const payload: Partial<LicenseType> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } =
        this.addLicenseTypesLookupsForm.value;
      const payload: LicenseType = { id, name, nameAR, isActive };
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
    if (this.addLicenseTypesLookupsForm.valid) {
      this.addLicenseTypesLookupsForm.markAsPristine();
    }

    console.log('🧭 Navigating away to view-grace-periods');
    this.router.navigate(['/lookups/view-license-types']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addLicenseTypesLookupsForm.dirty;
  }
}
