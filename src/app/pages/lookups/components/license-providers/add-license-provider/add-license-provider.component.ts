import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, filter, take } from 'rxjs';
import { LicenseProvider } from '../../../store/license-providers/license-provider.model';
import { LicenseProvidersFacade } from '../../../store/license-providers/license-providers.facade';

@Component({
  selector: 'app-add-license-provider',
  standalone: false,
  templateUrl: './add-license-provider.component.html',
  styleUrl: './add-license-provider.component.scss',
})
export class AddLicenseProviderComponent {
  editMode: boolean = false;
  viewOnly = false;
  addLicenseProvidersLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: LicenseProvidersFacade,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('🔵 ngOnInit: start');

    // 1. Build the form
    this.addLicenseProvidersLookupsForm = this.fb.group({
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
      this.addLicenseProvidersLookupsForm.value
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
          this.addLicenseProvidersLookupsForm.disable();
          console.log('🔵 Form disabled for view-only');
        }

        // load & patch
        console.log('🔵 Dispatching loadById for', this.clientId);
        this.facade.loadById(this.clientId);

        this.facade.selected$
          .pipe(
            tap((ct) => console.log('🔵 selected$ emission:', ct)),
            filter(
              (ct): ct is LicenseProvider => !!ct && ct.id === this.clientId
            ),
            tap((ct) =>
              console.log('🔵 selected$ passed filter, patching form with:', ct)
            ),
            take(1)
          )
          .subscribe((ct) => {
            this.addLicenseProvidersLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              isActive: ct!.isActive,
            });
            console.log(
              '🔵 Form after patchValue:',
              this.addLicenseProvidersLookupsForm.value
            );
          });
      } else {
        // add mode
        this.editMode = false;
        console.log('🔵 Entering ADD mode');

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        console.log('🔵 viewOnly flag (add mode):', this.viewOnly);
        if (this.viewOnly) {
          this.addLicenseProvidersLookupsForm.disable();
          console.log('🔵 Form disabled for view-only in add mode');
        }
      }
    });
  }

  addOrEditLicenseProviders() {
    console.log('💥 addOrEditLicenseProviders() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addLicenseProvidersLookupsForm.valid);
    console.log('  form touched:', this.addLicenseProvidersLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addLicenseProvidersLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addLicenseProvidersLookupsForm.get('name');
    const nameARCtrl = this.addLicenseProvidersLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addLicenseProvidersLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addLicenseProvidersLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } =
      this.addLicenseProvidersLookupsForm.value;
    const payload: Partial<LicenseProvider> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } =
        this.addLicenseProvidersLookupsForm.value;
      const payload: LicenseProvider = { id, name, nameAR, isActive };
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
    if (this.addLicenseProvidersLookupsForm.valid) {
      this.addLicenseProvidersLookupsForm.markAsPristine();
    }

    console.log('🧭 Navigating away to view-grace-periods');
    this.router.navigate(['/lookups/view-license-providers']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addLicenseProvidersLookupsForm.dirty;
  }
}
