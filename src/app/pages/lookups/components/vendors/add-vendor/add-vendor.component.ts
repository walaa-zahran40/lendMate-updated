import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  combineLatest,
  filter,
  map,
  shareReplay,
  take,
  tap,
} from 'rxjs';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { Vendor } from '../../../store/vendors/vendor.model';
import { VendorsFacade } from '../../../store/vendors/vendors.facade';
import { SubSector } from '../../../store/sub-sectors/sub-sector.model';
import { SubSectorsFacade } from '../../../store/sub-sectors/sub-sectors.facade';

@Component({
  selector: 'app-add-vendor',
  standalone: false,
  templateUrl: './add-vendor.component.html',
  styleUrl: './add-vendor.component.scss',
})
export class AddVendorComponent {
  editMode: boolean = false;
  viewOnly = false;
  addVendorsLookupsForm!: FormGroup;
  clientId: any;
  subSectorsList$!: Observable<SubSector[]>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: VendorsFacade,
    private router: Router,
    private subSectorsFacade: SubSectorsFacade
  ) {}

  ngOnInit() {
    this.addVendorsLookupsForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      taxNumber: ['', [Validators.required]],
      subSectorIdList: [[], Validators.required],
      isActive: [true],
    });

    // 1) kick off lookups
    this.subSectorsFacade.loadAll();
    this.subSectorsList$ = this.subSectorsFacade.all$.pipe(
      map((list) => (list ?? []).map((s) => ({ ...s, id: Number(s.id) }))),
      tap((list) => console.log('📦 Sub Sectors List (normalized):', list)),
      shareReplay(1)
    );

    // 2) route handling
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
      if (this.viewOnly) {
        console.log('👁️ View-only mode → disabling form');
        this.addVendorsLookupsForm.disable();
      }

      if (!id) {
        console.log('ℹ️ No vendor id in route → create mode');
        return;
      }

      this.editMode = true;
      this.clientId = +id;
      console.log('✏️ Edit mode. clientId =', this.clientId);

      // always (re)load by id when opening the screen
      this.facade.loadById(this.clientId);

      const vendor$ = this.facade
        .vendorById$(this.clientId)
        .pipe(filter((v: Vendor | undefined): v is Vendor => !!v));

      const subSectorsReady$ = this.subSectorsList$.pipe(
        filter((list) => Array.isArray(list) && list.length > 0)
      );

      combineLatest([vendor$, subSectorsReady$])
        .pipe(take(1))
        .subscribe(([ct]) => {
          console.log('📥 Vendor from store:', ct);
          console.log('📥 Vendor.subSectorList:', ct.subSectorList);
          console.log('📥 Vendor.subSectorIdList:', ct.subSectorIdList);

          const ids =
            Array.isArray(ct.subSectorList) && ct.subSectorList.length > 0
              ? ct.subSectorList.map((s) => Number(s.id)) // ✅ use vendor.subSectorList
              : (ct.subSectorIdList ?? []).map(Number); // fallback, if present

          console.log('🔑 Derived subSectorIds:', ids);

          this.addVendorsLookupsForm.patchValue(
            {
              id: ct.id,
              name: ct.name,
              nameAR: ct.nameAR,
              taxNumber: ct.taxNumber,
              subSectorIdList: ids, // number[]
              isActive: ct.isActive,
            },
            { emitEvent: false }
          );

          console.log(
            '📝 Form after patchValue:',
            this.addVendorsLookupsForm.getRawValue()
          );

          // Hardening: explicitly reapply the value once options are in place
          const ctrl = this.addVendorsLookupsForm.get('subSectorIdList');
          ctrl?.setValue([...ids], { emitEvent: false });

          console.log(
            '✅ subSectorIdList control after setValue:',
            ctrl?.value
          );
        });
    });
  }

  addOrEditVendor() {
    console.log(
      'subSectorIdList raw:',
      this.addVendorsLookupsForm.get('subSectorIdList')?.value
    );
    console.log(
      'types:',
      (this.addVendorsLookupsForm.get('subSectorIdList')?.value ?? []).map(
        (v: any) => typeof v
      )
    );

    console.log('💥 addVendors() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addVendorsLookupsForm.valid);
    console.log('  form touched:', this.addVendorsLookupsForm.touched);
    console.log('  form raw value:', this.addVendorsLookupsForm.getRawValue());

    // Print individual control errors
    const nameCtrl = this.addVendorsLookupsForm.get('name');
    const nameARCtrl = this.addVendorsLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addVendorsLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addVendorsLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, taxNumber, subSectorIdList, isActive } =
      this.addVendorsLookupsForm.value;
    const raw = this.addVendorsLookupsForm.value.subSectorIdList ?? [];

    /** Case A: control holds IDs (correct with optionValue="id") */
    const normalizedSubSectors = (
      this.addVendorsLookupsForm.value.subSectorIdList ?? []
    )
      .filter((x: any) => x !== null && x !== undefined) // don’t use Boolean()
      .map((x: any) => Number(x))
      .filter((n: number) => Number.isFinite(n));

    const payload: Partial<Vendor> = {
      name,
      nameAR,
      taxNumber,
      subSectorIdList: normalizedSubSectors, // ✅ number[]
      isActive,
    };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, taxNumber, subSectorIdList, isActive } =
        this.addVendorsLookupsForm.value;
      const payload: Vendor = {
        id,
        name,
        nameAR,
        taxNumber,
        subSectorIdList: (subSectorIdList ?? []).map(Number), // ✅
        isActive,
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
    if (this.addVendorsLookupsForm.valid) {
      this.addVendorsLookupsForm.markAsPristine();
    }

    console.log('🧭 Navigating away to view-vendors');
    this.router.navigate(['/lookups/view-vendors']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addVendorsLookupsForm.dirty;
  }
}
