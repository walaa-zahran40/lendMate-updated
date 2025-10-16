import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subject,
  Observable,
  forkJoin,
  filter,
  take,
  takeUntil,
  of,
  tap,
} from 'rxjs';
import { AddressTypesFacade } from '../../../../../../../../lookups/store/address-types/address-types.facade';
import { Area } from '../../../../../../../../lookups/store/areas/area.model';
import { AreasFacade } from '../../../../../../../../lookups/store/areas/areas.facade';
import { CountriesFacade } from '../../../../../../../../lookups/store/countries/countries.facade';
import { Country } from '../../../../../../../../lookups/store/countries/country.model';
import { Governorate } from '../../../../../../../../lookups/store/governorates/governorate.model';
import { GovernoratesFacade } from '../../../../../../../../lookups/store/governorates/governorates.facade';
import { IdentificationType } from '../../../../../../../../lookups/store/identification-types/identification-type.model';
import { IdentificationTypesFacade } from '../../../../../../../../lookups/store/identification-types/identification-types.facade';
import { PhoneType } from '../../../../../../../../lookups/store/phone-types/phone-type.model';
import { PhoneTypesFacade } from '../../../../../../../../lookups/store/phone-types/phone-types.facade';
import { ClientContactPerson } from '../../../../../../store/client-contact-persons/client-contact-person.model';
import { ClientContactPersonsFacade } from '../../../../../../store/client-contact-persons/client-contact-persons.facade';

@Component({
  selector: 'app-add-contact-person',
  standalone: false,
  templateUrl: './add-contact-person.component.html',
  styleUrl: './add-contact-person.component.scss',
})
export class AddContactPersonComponent implements OnInit, OnDestroy {
  editMode = false;
  viewOnly = false;
  private ignoreCascades = false;

  addClientContactPersonForm!: FormGroup;

  mode!: 'add' | 'edit' | 'view';
  parentClientId!: number;
  recordId!: number;
  addressTypes$!: any;
  private destroy$ = new Subject<void>();

  phoneTypes$!: Observable<PhoneType[]>;
  identityTypes$!: Observable<IdentificationType[]>;
  countries$!: Observable<Country[]>;
  governorates$!: Observable<Governorate[]>;
  areas$!: Observable<Area[]>;
  countriesList: Country[] = [];
  governoratesList: Governorate[] = [];
  areasList: Area[] = [];
  filteredGovernorates: Governorate[] = [];
  filteredAreas: Area[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private clientContactPersonFacade: ClientContactPersonsFacade,
    private addressTypesFacade: AddressTypesFacade,
    private countriesFacade: CountriesFacade,
    private governoratesFacade: GovernoratesFacade,
    private areasFacade: AreasFacade,
    private phoneTypesFacade: PhoneTypesFacade,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    // 1) Build the form
    this.addClientContactPersonForm = this.fb.group({
      name: [null, Validators.required],
      nameAR: [null, Validators.required],
      genderId: [null, Validators.required],
      governorateId: [null],
      countryId: [null],
      title: [null, Validators.required],
      titleAR: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      isAuthorizedSign: [true, Validators.required],
      isKeyManager: [true, Validators.required],
      isFinance: [true, Validators.required],
      areaId: [null],
      addressTypeId: [null],
      addressDetails: [null],
      addressDetailsAr: [null],
      identities: this.fb.array([this.createIdentityGroup()]),
      phoneTypes: this.fb.array([this.createPhoneTypeGroup()]),
    });

    // 2) Pull resolver bundle
    const bundle = this.route.snapshot.data['bundle'] as {
      mode: 'add' | 'edit' | 'view';
      record?: ClientContactPerson;
      clientIdFromQP?: number;
      addressTypes: any[];
      countries: any[];
      governorates: any[];
      areas: any[];
      phoneTypes: any[];
      identityTypes: any[];
    };

    this.mode = bundle.mode;
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';
    this.parentClientId =
      bundle.clientIdFromQP ??
      Number(this.route.snapshot.paramMap.get('clientId'));

    // 3) Wire lookups (observable for templates)
    this.addressTypes$ = of(bundle.addressTypes);
    this.countries$ = of(bundle.countries);
    this.governorates$ = of(bundle.governorates);
    this.areas$ = of(bundle.areas);
    this.phoneTypes$ = of(bundle.phoneTypes);
    this.identityTypes$ = of(bundle.identityTypes);

    // 4) Keep raw arrays for cascading filters
    this.countriesList = bundle.countries;
    this.governoratesList = bundle.governorates;
    this.areasList = bundle.areas;

    // 5) Cascades
    this.setupCascadingDropdowns();

    // 6) Default clientId (useful for add)
    this.addClientContactPersonForm.patchValue({
      clientId: this.parentClientId,
    });

    // 7) Edit / View: patch record safely
    const rec = bundle.record;
    if ((this.editMode || this.viewOnly) && rec) {
      this.recordId = rec.id!;
      this.ignoreCascades = true;

      // Build filtered lists first (so p-select has the options ready)
      this.filteredGovernorates = this.governoratesList.filter(
        (g: any) => g.countryId === Number(rec.countryId)
      );
      this.filteredAreas = this.areasList.filter(
        (a: any) => a.governorate.id === Number(rec.governorateId)
      );

      // Defer value patching so child dropdowns render with options already set
      Promise.resolve().then(() => {
        // Patch cascading selects (emitEvent:false prevents valueChanges loops)
        this.addClientContactPersonForm
          .get('countryId')!
          .setValue(Number(rec.countryId), { emitEvent: false });
        this.addClientContactPersonForm
          .get('governorateId')!
          .setValue(Number(rec.governorateId), { emitEvent: false });
        this.addClientContactPersonForm
          .get('areaId')!
          .setValue(Number(rec.areaId), { emitEvent: false });

        // Patch scalar fields
        this.addClientContactPersonForm.patchValue(
          {
            id: rec.id,
            clientId: this.parentClientId,
            name: rec.name,
            nameAR: rec.nameAR,
            genderId: rec.genderId,
            title: rec.title,
            titleAR: rec.titleAR,
            email: rec.email,
            isAuthorizedSign: rec.isAuthorizedSign,
            isKeyManager: rec.isKeyManager,
            isFinance: rec.isFinance,
            addressTypeId: rec.addressTypeId,
            addressDetails: rec.addressDetails,
            addressDetailsAr: rec.addressDetailsAr,
          },
          { emitEvent: false }
        );

        // --- Rebuild FormArrays from record ---

        // Identities (API could use either naming; support both)
        const idsFA = this.addClientContactPersonForm.get(
          'identities'
        ) as FormArray;
        idsFA.clear();
        const recIdentities =
          rec.contactPersonIdentities ??
          rec.clientContactPersonIdentities ??
          [];
        if (recIdentities.length) {
          recIdentities.forEach((ci) => {
            const group = this.fb.group({
              id: [ci.id],
              identificationNumber: [
                ci.identificationNumber,
                Validators.required,
              ],
              selectedIdentities: [
                ci.identificationTypeId,
                Validators.required,
              ],
              isMain: [!!ci.isMain],
            });
            if (this.viewOnly) group.disable({ emitEvent: false });
            idsFA.push(group);
          });
        } else {
          const g = this.createIdentityGroup();
          if (this.viewOnly) g.disable({ emitEvent: false });
          idsFA.push(g);
        }

        // Phone numbers (API could use either naming; support both)
        const phFA = this.addClientContactPersonForm.get(
          'phoneTypes'
        ) as FormArray;
        phFA.clear();
        const recPhones =
          rec.contactPersonPhoneNumbers ?? rec.clientContactPhoneNumbers ?? [];
        if (recPhones.length) {
          recPhones.forEach((pp) => {
            const group = this.fb.group({
              id: [pp.id],
              phoneNumber: [
                pp.phoneNumber,
                [Validators.required, Validators.pattern(/^[0-9]+$/)],
              ],
              phoneTypeId: [pp.phoneTypeId, Validators.required],
            });
            if (this.viewOnly) group.disable({ emitEvent: false });
            phFA.push(group);
          });
        } else {
          const g = this.createPhoneTypeGroup();
          if (this.viewOnly) g.disable({ emitEvent: false });
          phFA.push(g);
        }

        // Re-enable cascades & finally lock the whole form in view mode
        this.ignoreCascades = false;
        if (this.viewOnly) {
          this.addClientContactPersonForm.disable({ emitEvent: false });
        }

        // Let Angular/PrimeNG pick up changes
        this.cdr.detectChanges();
      });
    }
  }

  get identities(): FormArray {
    return this.addClientContactPersonForm.get('identities') as FormArray;
  }
  createIdentityGroup(): FormGroup {
    return this.fb.group({
      id: [],
      identificationNumber: ['', Validators.required],
      selectedIdentities: [[], Validators.required],
      isMain: [false],
    });
  }
  get phoneTypes(): FormArray {
    return this.addClientContactPersonForm.get('phoneTypes') as FormArray;
  }
  createPhoneTypeGroup(): FormGroup {
    return this.fb.group({
      id: [],
      phoneNumber: ['', Validators.required],
      phoneTypeId: [[], Validators.required],
    });
  }
  private setupCascadingDropdowns(): void {
    this.addClientContactPersonForm
      .get('countryId')!
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((countryId: any) => {
        if (this.ignoreCascades) return;
        const id = Number(countryId);

        this.filteredGovernorates = this.governoratesList.filter(
          (g: any) => g.countryId === id
        );

        // reset downstreams without triggering valueChanges again
        this.addClientContactPersonForm
          .get('governorateId')!
          .setValue(null, { emitEvent: false });
        this.filteredAreas = [];
        this.addClientContactPersonForm
          .get('areaId')!
          .setValue(null, { emitEvent: false });
      });

    this.addClientContactPersonForm
      .get('governorateId')!
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((govId: any) => {
        if (this.ignoreCascades) return;
        const id = Number(govId);

        this.filteredAreas = this.areasList.filter(
          (a: any) => a.governorate.id === id
        );

        this.addClientContactPersonForm
          .get('areaId')!
          .setValue(null, { emitEvent: false });
      });
  }

  addIdentity() {
    console.log('Adding new identity group');
    this.identities.push(this.createIdentityGroup());
  }

  removeIdentity(i: number) {
    console.log('Removing identity group at index', i);
    if (this.identities.length > 1) {
      this.identities.removeAt(i);
    }
  }

  addPhoneType() {
    console.log('Adding new identity group');
    this.phoneTypes.push(this.createPhoneTypeGroup());
  }

  removePhoneType(i: number) {
    console.log('Removing identity group at index', i);
    if (this.phoneTypes.length > 1) {
      this.phoneTypes.removeAt(i);
    }
  }

  addOrEditClientContactPerson() {
    console.log('🛣️ Route snapshot:', this.route.snapshot);
    const clientIdParam = this.route.snapshot.queryParamMap.get('clientId');

    if (this.viewOnly) {
      console.warn('🚫 viewOnly mode — aborting submit');
      return;
    }

    if (this.addClientContactPersonForm.invalid) {
      this.addClientContactPersonForm.markAllAsTouched();
      return;
    }

    const formValue = this.addClientContactPersonForm.value;
    const contactPersonIdentitiesPayload = formValue.identities?.map(
      (i: any) => {
        console.log('i', i);
        const entry: any = {
          identificationNumber: i.identificationNumber,
          identificationTypeId: i.selectedIdentities,
          isMain: i.isMain,
        };
        if (this.editMode && i.id != null) {
          entry.id = Number(i.id);
        }
        return entry;
      }
    );

    const contactPersonPhoneTypesPayload = formValue.phoneTypes?.map(
      (i: any) => {
        const entry: any = {
          phoneNumber: i.phoneNumber,
          phoneTypeId: i.phoneTypeId,
        };
        if (this.editMode && i.id != null) {
          entry.id = Number(i.id);
        }
        return entry;
      }
    );

    console.log('arwaa', formValue[0]);
    const data: Partial<ClientContactPerson> = {
      clientId: Number(this.route.snapshot.paramMap.get('clientId')),
      name: formValue.name,
      nameAR: formValue.nameAR,
      title: formValue.title,
      titleAR: formValue.titleAR,
      genderId: formValue.genderId,
      email: formValue.email,
      isAuthorizedSign: formValue.isAuthorizedSign,
      isKeyManager: formValue.isKeyManager,
      isFinance: formValue.isFinance,
      areaId: formValue.areaId,
      addressTypeId: formValue.addressTypeId,
      addressDetails: formValue.addressDetails,
      addressDetailsAr: formValue.addressDetailsAr,
      clientContactPersonIdentities: contactPersonIdentitiesPayload,
      clientContactPhoneNumbers: contactPersonPhoneTypesPayload,
    };

    console.log(
      '🔄 Dispatching UPDATE id=',
      this.recordId,
      ' created  payload=',
      data
    );

    if (this.mode === 'add') {
      this.clientContactPersonFacade.create({
        ...data,
      });
    } else {
      const formValue = this.addClientContactPersonForm.value;

      const updateData: ClientContactPerson = {
        id: this.recordId,
        clientId: this.parentClientId,
        name: formValue.name,
        nameAR: formValue.nameAR,
        title: formValue.title,
        titleAR: formValue.titleAR,
        genderId: formValue.genderId,
        email: formValue.email,
        isAuthorizedSign: formValue.isAuthorizedSign,
        isKeyManager: formValue.isKeyManager,
        isFinance: formValue.isFinance,
        areaId: formValue.areaId,
        addressTypeId: formValue.addressTypeId,
        addressDetails: formValue.addressDetails,
        addressDetailsAr: formValue.addressDetailsAr,
      };

      console.log(
        '🔄 Dispatching UPDATE id=',
        this.recordId,
        ' UPDATED payload=',
        updateData
      );

      this.clientContactPersonFacade.update(this.recordId, {
        ...updateData,
        clientContactPersonIdentities: contactPersonIdentitiesPayload,
        clientContactPhoneNumbers: contactPersonPhoneTypesPayload,
      });
    }

    if (this.addClientContactPersonForm.valid) {
      this.addClientContactPersonForm.markAsPristine();
    }

    if (clientIdParam) {
      console.log('➡️ Navigating back with PATH param:', clientIdParam);
      this.router.navigate([
        '/crm/clients/view-contact-persons',
        clientIdParam,
      ]);
    } else {
      console.error('❌ Cannot navigate back: clientId is missing!');
    }
  }
  canDeactivate(): boolean {
    return !this.addClientContactPersonForm.dirty;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
