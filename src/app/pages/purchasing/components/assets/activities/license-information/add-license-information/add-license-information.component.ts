import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, Subject, take } from 'rxjs';
import { LicenseInformationFacade } from '../../../../../store/license-information/license-information.facade';
import { LicenseInformation } from '../../../../../store/license-information/license-information.model';
import { LicenseType } from '../../../../../../lookups/store/license-types/license-type.model';
import { LicenseTypesFacade } from '../../../../../../lookups/store/license-types/license-types.facade';
import { LicenseProvidersFacade } from '../../../../../../lookups/store/license-providers/license-providers.facade';
import { LicenseProvider } from '../../../../../../lookups/store/license-providers/license-provider.model';

@Component({
  selector: 'app-add-license-information',
  standalone: false,
  templateUrl: './add-license-information.component.html',
  styleUrl: './add-license-information.component.scss',
})
export class AddLicenseInformationComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addLicenseInformationForm!: FormGroup;
  retrivedId: any;
  routeId: any;
  recordId!: number;
  private destroy$ = new Subject<void>();
  licenseTypes$!: Observable<LicenseType[]>;
  licenseProviders$!: Observable<LicenseProvider[]>;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: LicenseInformationFacade,
    private router: Router,
    private facadeLicenseTypes: LicenseTypesFacade,
    private facadeLicenseProviders: LicenseProvidersFacade
  ) {}

  ngOnInit(): void {
    console.log('🟢 ngOnInit start');
    // 1️⃣ Read route parameters
    console.log(this.route.snapshot, 'route');
    this.facadeLicenseTypes.loadAll();
    this.licenseTypes$ = this.facadeLicenseTypes.all$;
    this.facadeLicenseProviders.loadAll();
    this.licenseProviders$ = this.facadeLicenseProviders.all$;

    this.routeId = Number(this.route.snapshot.params['id']);

    this.mode =
      (this.route.snapshot.queryParamMap.get('mode') as
        | 'add'
        | 'edit'
        | 'view') ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';
    console.log('🔍 Params:', {
      routeId: this.routeId,
      mode: this.mode,
      editMode: this.editMode,
      viewOnly: this.viewOnly,
    });

    // 5️⃣ Build the form
    this.addLicenseInformationForm = this.fb.group({
      id: [null],
      licenseNumber: [null, Validators.required],
      licenseTypeId: [null, Validators.required],
      licenseProviderId: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      licenseInUseBy: [null, Validators.required],
      isActive: [true],
    });
    console.log(
      '🛠️ Form initialized with defaults:',
      this.addLicenseInformationForm.value
    );

    // 6️⃣ If add mode, seed routeId
    if (this.mode === 'add') {
      this.addLicenseInformationForm.patchValue({
        routeId: this.routeId,
      });
      console.log('✏️ Add mode → patched routeId:', this.routeId);
    }
    // 8️⃣ If editing or viewing, load & patch
    if (this.editMode || this.viewOnly) {
      console.log('edit ', this.editMode, 'route', this.route.snapshot);
      this.recordId = Number(this.route.snapshot.paramMap.get('id'));
      console.log('🔄 Loading existing record id=', this.recordId);
      this.facade.loadById(this.recordId);

      this.facade.selected$
        .pipe(
          filter((ct) => !!ct && ct.id === this.recordId),
          take(1)
        )
        .subscribe((ct) => {
          console.log('🛰️ facade.current$ emitted:', ct);
          // patch form
          this.addLicenseInformationForm.patchValue({
            id: ct?.id,
            licenseNumber: ct?.licenseNumber,
            licenseTypeId: ct?.licenseTypeId,
            licenseProviderId: ct?.licenseProviderId,
            startDate: ct?.startDate,
            endDate: ct?.endDate,
            licenseInUseBy: ct?.licenseInUseBy,
            isActive: ct?.isActive,
          });
          console.log(
            '📝 Form after patchValue:',
            this.addLicenseInformationForm.value
          );
          if (this.viewOnly) {
            console.log('🔐 viewOnly → disabling form');
            this.addLicenseInformationForm.disable();
          }
        });
    } else if (this.viewOnly) {
      console.log('🔐 viewOnly (no id) → disabling form');
      this.addLicenseInformationForm.disable();
    }
  }

  addOrEditLicenseInformation() {
    const assetParam = this.route.snapshot.paramMap.get('id');

    console.log('💥 addLicenseInformation() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addLicenseInformationForm.valid);
    console.log('  form touched:', this.addLicenseInformationForm.touched);
    console.log(
      '  form raw value:',
      this.addLicenseInformationForm.getRawValue()
    );

    if (this.addLicenseInformationForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addLicenseInformationForm.markAllAsTouched();
      return;
    }

    this.addLicenseInformationForm.patchValue({
      routeId: assetParam,
    });

    const {
      licenseNumber,
      licenseTypeId,
      licenseProviderId,
      startDate,
      endDate,
      licenseInUseBy,
      isActive,
    } = this.addLicenseInformationForm.value;
    const payload: Partial<LicenseInformation> = {
      licenseNumber,
      licenseTypeId,
      licenseProviderId,
      startDate,
      endDate,
      licenseInUseBy,
      isActive,
    };
    console.log('  → payload object:', payload);

    const data = this.addLicenseInformationForm
      .value as Partial<LicenseInformation>;
    console.log('📦 Payload going to facade:', data);

    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(retrivedId):', routeId);

    if (this.mode === 'add') {
      console.log('➕ Dispatching CREATE');
      this.facade.create(payload);
    } else {
      console.log('✏️ Dispatching UPDATE id=', data.id);
      this.facade.update(data.id!, data);
    }
    if (this.addLicenseInformationForm.valid) {
      this.addLicenseInformationForm.markAsPristine();
    }

    this.router.navigate([
      `/purchasing/assets/activities/view-license-information/${assetParam}`,
    ]);
  }
  close() {
    console.log('Navigating back to view-license-information');
    this.router.navigate([
      `/purchasing/assets/activities/view-license-information/${this.routeId}`,
    ]);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    console.log('🛡️ canDeactivate called');
    return !this.addLicenseInformationForm.dirty;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
