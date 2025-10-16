import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, filter, take, Observable } from 'rxjs';
import { VendorsFacade } from '../../../store/vendors/vendors.facade';
import { VendorAddress } from '../../../store/vendor-addresses/vendor-address.model';
import { Vendor } from '../../../store/vendors/vendor.model';
import { VendorAddressesFacade } from '../../../store/vendor-addresses/vendor-addresses.facade';
import { AddressTypesFacade } from '../../../store/address-types/address-types.facade';
import { AreasFacade } from '../../../store/areas/areas.facade';
import { AddressType } from '../../../store/address-types/address-type.model';
import { Area } from '../../../store/areas/area.model';

@Component({
  selector: 'app-add-vendor-address',
  standalone: false,
  templateUrl: './add-vendor-address.component.html',
  styleUrl: './add-vendor-address.component.scss',
})
export class AddVendorAddressComponent {
  editMode: boolean = false;
  viewOnly = false;
  addVendorAddressesLookupsForm!: FormGroup;
  clientId: any;
  vendors$!: Observable<Vendor[]>;
  addressTypes$!: Observable<AddressType[]>;
  areas$!: Observable<Area[]>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: VendorAddressesFacade,
    private facadeVendors: VendorsFacade,
    private facadeAreas: AreasFacade,
    private facadeAddressTypes: AddressTypesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    //Select Box
    console.log('🔵 ngOnInit: start');

    // 1. Build the form
    this.addVendorAddressesLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      details: ['', [Validators.required]],
      detailsAR: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\u0600-\u06FF\s0-9\u0660-\u0669]+$/),
        ],
      ],
      vendorId: [null, [Validators.required]],
      addressTypeId: [null, [Validators.required]],
      areaId: [null, [Validators.required]],
      isMain: [false, [Validators.required]],
      isActive: [true], // ← new hidden control
    });
    console.log(
      '🔵 Form initialized with default values:',
      this.addVendorAddressesLookupsForm.value
    );
    this.facadeVendors.loadAll();
    this.vendors$ = this.facadeVendors.all$;

    this.facadeAddressTypes.loadAll();
    this.addressTypes$ = this.facadeAddressTypes.all$;

    this.facadeAreas.loadAll();
    this.areas$ = this.facadeAreas.all$;

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
          this.addVendorAddressesLookupsForm.disable();
          console.log('🔵 Form disabled for view-only');
        }

        // load & patch
        console.log('🔵 Dispatching loadById for', this.clientId);
        this.facade.loadById(this.clientId);

        this.facade.selected$
          .pipe(
            tap((ct) => console.log('🔵 selected$ emission:', ct)),
            filter(
              (ct): ct is VendorAddress => !!ct && ct.id === this.clientId
            ),
            tap((ct) =>
              console.log('🔵 selected$ passed filter, patching form with:', ct)
            ),
            take(1)
          )
          .subscribe((ct) => {
            this.addVendorAddressesLookupsForm.patchValue({
              id: ct!.id,
              details: ct!.details,
              detailsAR: ct!.detailsAR,
              vendorId: ct!.vendorId,
              addressTypeId: ct!.addressTypeId,
              areaId: ct!.areaId,
              isMain: ct!.isMain,
              isActive: ct!.isActive,
            });
            console.log(
              '🔵 Form after patchValue:',
              this.addVendorAddressesLookupsForm.value
            );
          });
      } else {
        // add mode
        this.editMode = false;
        console.log('🔵 Entering ADD mode');

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        console.log('🔵 viewOnly flag (add mode):', this.viewOnly);
        if (this.viewOnly) {
          this.addVendorAddressesLookupsForm.disable();
          console.log('🔵 Form disabled for view-only in add mode');
        }
      }
    });
  }

  addOrEditVendorAddresses() {
    console.log('💥 addOrEditSectors() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addVendorAddressesLookupsForm.valid);
    console.log('  form touched:', this.addVendorAddressesLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addVendorAddressesLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addVendorAddressesLookupsForm.get('name');
    const nameARCtrl = this.addVendorAddressesLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addVendorAddressesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addVendorAddressesLookupsForm.markAllAsTouched();
      return;
    }

    const {
      id,
      details,
      detailsAR,
      vendorId,
      addressTypeId,
      areaId,
      isActive,
      isMain,
    } = this.addVendorAddressesLookupsForm.value;
    const payload: Partial<VendorAddress> = {
      details,
      id,
      detailsAR,
      vendorId,
      addressTypeId,
      areaId,
      isActive,
      isMain,
    };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const {
        details,
        id,
        detailsAR,
        vendorId,
        addressTypeId,
        areaId,
        isActive,
        isMain,
      } = this.addVendorAddressesLookupsForm.value;
      const payload: VendorAddress = {
        details,
        id,
        detailsAR,
        vendorId,
        addressTypeId,
        areaId,
        isActive,
        isMain,
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
    if (this.addVendorAddressesLookupsForm.valid) {
      this.addVendorAddressesLookupsForm.markAsPristine();
    }

    console.log('🧭 Navigating away to view-grace-periods');
    this.router.navigate(['/lookups/view-vendor-addresses']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addVendorAddressesLookupsForm.dirty;
  }
}
