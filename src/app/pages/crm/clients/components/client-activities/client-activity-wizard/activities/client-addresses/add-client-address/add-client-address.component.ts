import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { arabicOnlyValidator } from '../../../../../../../../../shared/validators/arabic-only.validator';
import { AddressType } from '../../../../../../../../lookups/store/address-types/address-type.model';
import { Area } from '../../../../../../../../lookups/store/areas/area.model';
import { Country } from '../../../../../../../../lookups/store/countries/country.model';
import { Governorate } from '../../../../../../../../lookups/store/governorates/governorate.model';
import { ClientAddress } from '../../../../../../store/client-addresses/client-address.model';
import { ClientAddressesFacade } from '../../../../../../store/client-addresses/client-addresses.facade';

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
  addressTypesList: AddressType[] = [];
  filteredGovernorates: Governorate[] = [];
  filteredAreas: Area[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientAddressesFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    const bundle = this.route.snapshot.data['bundle'];
    console.log('bundle:', bundle);

    this.mode = bundle?.mode ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';
    // prefer param clientId for add route; otherwise QP
    const clientIdFromParam = this.route.snapshot.paramMap.get('clientId');
    this.clientId = clientIdFromParam
      ? Number(clientIdFromParam)
      : bundle?.clientIdFromQP ?? null;

    // build form
    this.addClientAddressesLookupsForm = this.fb.group({
      id: [null],
      details: [''],
      detailsAR: ['', [arabicOnlyValidator]],
      areaId: [null, [Validators.required]],
      governorateId: [null, [Validators.required]],
      countryId: [null, [Validators.required]],
      clientId: [null, [Validators.required]],
      addressTypeId: [null, [Validators.required]],
      isActive: [true],
    });

    // cascading dropdowns
    this.setupCascadingDropdowns();
    // lookups
    this.countriesList = bundle?.countries ?? [];
    console.log('countriesList:', this.countriesList);
    this.governoratesList = bundle?.governorates ?? [];
    console.log('governoratesList:', this.governoratesList);
    this.areasList = bundle?.areas ?? [];
    console.log('areasList:', this.areasList);
    this.addressTypesList = bundle?.addressTypes ?? [];
    console.log('Address Types List:', this.addressTypesList);
    this.filteredGovernorates = [...this.governoratesList];
    this.filteredAreas = [...this.areasList];

    // seed clientId in add mode
    if (this.mode === 'add' && this.clientId != null) {
      this.addClientAddressesLookupsForm.patchValue({
        clientId: this.clientId,
      });
    }
    // patch record in edit/view
    if ((this.editMode || this.viewOnly) && bundle.record) {
      const ct = bundle.record as ClientAddress;

      // derive gov & country from area
      const selArea = this.areasList.find((a: any) => a.id === ct.areaId);
      const governorateId = selArea?.governorate?.id ?? null;
      const selGov = this.governoratesList.find(
        (g: any) => g.id === governorateId
      );
      const countryId = selGov?.countryId ?? null;

      this.addClientAddressesLookupsForm.patchValue({
        id: ct.id,
        details: ct.details,
        detailsAR: ct.detailsAR,
        areaId: ct.areaId,
        governorateId,
        countryId,
        clientId: this.clientId,
        addressTypeId: ct.addressTypeId,
        isActive: ct.isActive,
      });

      // filter lists
      this.filteredGovernorates = this.governoratesList.filter(
        (g: any) => g.countryId === countryId
      );
      this.filteredAreas = this.areasList.filter(
        (a: any) => a.governorate.id === governorateId
      );
    }

    if (this.viewOnly) this.addClientAddressesLookupsForm.disable();
  }

  private setupCascadingDropdowns(): void {
    this.addClientAddressesLookupsForm
      .get('countryId')
      ?.valueChanges.subscribe((countryId) => {
        this.filteredGovernorates = this.governoratesList?.filter(
          (g: any) => g.countryId === countryId
        );
        const govId =
          this.addClientAddressesLookupsForm.get('governorateId')?.value;
        if (!this.filteredGovernorates?.some((g: any) => g.id === govId)) {
          this.addClientAddressesLookupsForm.get('governorateId')?.reset();
        }
      });

    this.addClientAddressesLookupsForm
      .get('governorateId')
      ?.valueChanges.subscribe((governorateId) => {
        this.filteredAreas = this.areasList?.filter(
          (a: any) => a.governorate.id === governorateId
        );
        const areaId = this.addClientAddressesLookupsForm.get('areaId')?.value;
        if (!this.filteredAreas?.some((a: any) => a.id === areaId)) {
          this.addClientAddressesLookupsForm.get('areaId')?.reset();
        }
      });
  }

  addOrEditClientAddresses() {
    if (this.addClientAddressesLookupsForm.invalid) {
      this.addClientAddressesLookupsForm.markAllAsTouched();
      return;
    }

    // ensure clientId is set (QP or param)
    const qpClientId = this.route.snapshot.queryParamMap.get('clientId');
    const clientIdFinal = qpClientId ? Number(qpClientId) : this.clientId;

    this.addClientAddressesLookupsForm.patchValue({ clientId: clientIdFinal });

    const data =
      this.addClientAddressesLookupsForm.getRawValue() as Partial<ClientAddress>;

    if (this.mode === 'add') {
      this.facade.create(data);
    } else {
      this.facade.update(data.id!, data);
    }

    this.addClientAddressesLookupsForm.markAsPristine();

    if (clientIdFinal != null) {
      this.router.navigate([
        '/crm/clients/view-client-addresses',
        clientIdFinal,
      ]);
    } else {
      console.error('Cannot navigate back: clientId is missing!');
    }
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
