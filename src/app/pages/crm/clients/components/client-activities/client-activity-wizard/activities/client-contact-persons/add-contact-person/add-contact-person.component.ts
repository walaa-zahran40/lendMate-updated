import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, forkJoin, filter, take, takeUntil } from 'rxjs';
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
    private identityTypesFacade: IdentificationTypesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addClientContactPersonForm = this.fb.group({
      name: [null, Validators.required],
      nameAR: [null, Validators.required],
      genderId: [null, Validators.required],
      governorateId: [null],
      countryId: [null],
      title: [null, Validators.required],
      titleAR: [null, Validators.required],
      email: [null, Validators.required],
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
    this.setupCascadingDropdowns();

    this.addressTypesFacade.loadAll();
    this.addressTypes$ = this.addressTypesFacade.all$;

    this.countriesFacade.loadAll();
    this.countries$ = this.countriesFacade.all$;

    this.governoratesFacade.loadAll();
    this.governorates$ = this.governoratesFacade.all$;

    this.areasFacade.loadAll();
    this.areas$ = this.areasFacade.all$;

    this.phoneTypesFacade.loadAll();
    this.phoneTypes$ = this.phoneTypesFacade.all$;

    this.identityTypesFacade.loadAll();
    this.identityTypes$ = this.identityTypesFacade.all$;

    forkJoin({
      countries: this.countries$.pipe(
        filter((l) => l.length > 0),
        take(1)
      ),
      governorates: this.governorates$.pipe(
        filter((l) => l.length > 0),
        take(1)
      ),
      areas: this.areas$.pipe(
        filter((l) => l.length > 0),
        take(1)
      ),
    }).subscribe(({ countries, governorates, areas }) => {
      this.countriesList = countries;
      this.governoratesList = governorates;
      this.areasList = areas;
      const selCountry =
        this.addClientContactPersonForm.get('countryId')!.value;
      this.filteredGovernorates = selCountry
        ? governorates.filter((g) => g.countryId === selCountry)
        : governorates;

      const selGov =
        this.addClientContactPersonForm.get('governorateId')!.value;
      this.filteredAreas = selGov
        ? areas.filter((a) => a.governorate.id === selGov)
        : areas;
    });

    this.mode = (this.route.snapshot.queryParamMap.get('mode') as any) ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    this.parentClientId = Number(
      this.route.snapshot.queryParamMap.get('clientId')
    );
    if (this.editMode || this.viewOnly) {
      console.log('route add', this.route.snapshot);
      this.recordId = Number(this.route.snapshot.params['clientId']);
      this.clientContactPersonFacade.loadOne(this.recordId);
    }

    this.addClientContactPersonForm.patchValue({
      clientId: this.route.snapshot.queryParamMap.get('clientId'),
    });

    if (this.editMode || this.viewOnly) {
      this.clientContactPersonFacade.current$
        .pipe(
          takeUntil(this.destroy$),
          filter((rec) => !!rec)
        )
        .subscribe({
          next: (rec) => {
            const form = this.addClientContactPersonForm;

            this.ignoreCascades = true;

            form
              .get('countryId')!
              .patchValue(rec.countryId, { emitEvent: false });
            this.filteredGovernorates = this.governoratesList.filter(
              (g) => g.countryId === rec.countryId
            );

            form
              .get('governorateId')!
              .patchValue(rec.governorateId, { emitEvent: false });
            this.filteredAreas = this.areasList.filter(
              (a) => a.governorate.id === rec.governorateId
            );

            form.get('areaId')!.patchValue(rec.areaId, { emitEvent: false });

            form.patchValue(
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

            this.ignoreCascades = false;

            const idArr = form.get('identities') as FormArray;
            idArr.clear();
            rec.contactPersonIdentities?.forEach((ci) => {
              idArr.push(
                this.fb.group({
                  id: [ci.id],
                  identificationNumber: [
                    ci.identificationNumber,
                    Validators.required,
                  ],
                  selectedIdentities: [
                    ci.identificationTypeId,
                    Validators.required,
                  ],
                  isMain: [ci.isMain, Validators.required],
                })
              );
            });

            const phArr = form.get('phoneTypes') as FormArray;
            phArr.clear();
            rec.contactPersonPhoneNumbers?.forEach((pp) => {
              phArr.push(
                this.fb.group({
                  id: [pp.id],
                  phoneNumber: [
                    pp.phoneNumber,
                    [Validators.required, Validators.pattern(/^[0-9]+$/)],
                  ],
                  phoneTypeId: [pp.phoneTypeId, Validators.required],
                })
              );
            });
          },
          error: (err) => console.error(err),
        });
    }
  }

  get identities(): FormArray {
    return this.addClientContactPersonForm.get('identities') as FormArray;
  }
  private setupCascadingDropdowns(): void {
    this.addClientContactPersonForm
      .get('countryId')!
      .valueChanges.subscribe((countryId: number) => {
        this.filteredGovernorates = this.governoratesList.filter(
          (g) => g.countryId === countryId
        );
        this.addClientContactPersonForm.get('governorateId')!.reset();
        this.filteredAreas = [];
        this.addClientContactPersonForm.get('areaId')!.reset();
      });

    this.addClientContactPersonForm
      .get('governorateId')!
      .valueChanges.subscribe((govId: number) => {
        this.filteredAreas = this.areasList.filter(
          (a) => a.governorate.id === govId
        );
        this.addClientContactPersonForm.get('areaId')!.reset();
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
  createIdentityGroup(): FormGroup {
    return this.fb.group({
      id: [],
      identificationNumber: ['', Validators.required],
      selectedIdentities: [[], Validators.required],
      isMain: [false, Validators.required],
    });
  }

  get phoneTypes(): FormArray {
    return this.addClientContactPersonForm.get('phoneTypes') as FormArray;
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

  createPhoneTypeGroup(): FormGroup {
    return this.fb.group({
      id: [],
      phoneNumber: ['', Validators.required],
      phoneTypeId: [[], Validators.required],
    });
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
    console.log('route', this.route.snapshot);
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
