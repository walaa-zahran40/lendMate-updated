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
  // Flags driven by mode
  editMode = false;
  viewOnly = false;

  // Reactive form
  addClientContactPersonForm!: FormGroup;

  // Lists and IDs
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
    //Drop Down Lists
    // Load all facade data
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

    // Wait for the lists to be populated, then assign them
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
      console.log(
        '✅ Lookups loaded:',
        countries.length,
        'countries,',
        governorates.length,
        'governorates,',
        areas.length,
        'areas'
      );

      this.countriesList = countries;
      this.governoratesList = governorates;
      this.areasList = areas;
    });

    // Read mode and set flags
    this.mode = (this.route.snapshot.queryParamMap.get('mode') as any) ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    // Read IDs
    this.parentClientId = Number(
      this.route.snapshot.queryParamMap.get('clientId')
    );
    if (this.editMode || this.viewOnly) {
      console.log('route add', this.route.snapshot);
      this.recordId = Number(this.route.snapshot.params['clientId']);
      this.clientContactPersonFacade.loadOne(this.recordId);
    }

    // Build form with clientId
    this.addClientContactPersonForm = this.fb.group({
      name: [null, Validators.required],
      nameAR: [null, Validators.required],
      genderId: [null, Validators.required],
      governorateId: [null],
      countryId: [null],
      title: [null],
      titleAR: [null],
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

    this.addClientContactPersonForm.patchValue({
      clientId: this.route.snapshot.queryParamMap.get('clientId'),
    });

    // Patch for edit/view mode
    if (this.editMode || this.viewOnly) {
      this.clientContactPersonFacade.current$
        .pipe(
          takeUntil(this.destroy$),
          filter((rec) => !!rec)
        )
        .subscribe({
          next: (rec) => {
            console.log('💾 Loaded contact-person record:', rec);
            console.log('🔑 rec keys:', Object.keys(rec));

            // 1) patch simple fields
            this.addClientContactPersonForm.patchValue({
              id: rec.id,
              clientId: this.route.snapshot.queryParamMap.get('clientId'),
              name: rec.name,
              nameAR: rec.nameAR,
              genderId: rec.genderId,
              title: rec.title,
              titleAR: rec.titleAR,
              email: rec.email,
              isAuthorizedSign: rec.isAuthorizedSign,
              isKeyManager: rec.isKeyManager,
              isFinance: rec.isFinance,
              areaId: rec.areaId,
              governorateId: rec.governorateId,
              countryId: rec.countryId,
              addressTypeId: rec.addressTypeId,
              addressDetails: rec.addressDetails,
              addressDetailsAr: rec.addressDetailsAr,
            });
            console.log(
              '📝 After patchValue, form value:',
              this.addClientContactPersonForm.value
            );

            // 2) identities
            const idArr = this.addClientContactPersonForm.get(
              'identities'
            ) as FormArray;
            console.log('👥 identities before clear:', idArr.length);
            idArr.clear();
            console.log('👥 identities after clear:', idArr.length);
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
            console.log('👥 identities after rebuild:', idArr.length);

            // 3) phone types
            const phArr = this.addClientContactPersonForm.get(
              'phoneTypes'
            ) as FormArray;
            console.log('📞 phoneTypes before clear:', phArr.length);
            phArr.clear();
            console.log('📞 phoneTypes after clear:', phArr.length);
            rec.contactPersonPhoneNumbers?.forEach((pp) => {
              phArr.push(
                this.fb.group({
                  id: [pp.id],
                  phoneNumber: [
                    pp.phoneNumber,
                    [
                      Validators.required,
                      Validators.pattern(/^[0-9]+$/), // ← only digits, at least one
                    ],
                  ],
                  phoneTypeId: [pp.phoneTypeId, Validators.required],
                })
              );
            });
            console.log('📞 phoneTypes after rebuild:', phArr.length);
          },
          error: (err) => {
            console.error('❌ Error loading contact-person from facade:', err);
          },
        });
    }
  }

  get identities(): FormArray {
    return this.addClientContactPersonForm.get('identities') as FormArray;
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

    // 4) Early return in view-only
    if (this.viewOnly) {
      console.warn('🚫 viewOnly mode — aborting submit');
      return;
    }

    // 5) Form validity
    if (this.addClientContactPersonForm.invalid) {
      this.addClientContactPersonForm.markAllAsTouched();
      return;
    }

    // 6) The actual payload
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
      //governorateId : formValue.governorateId,
      //countryId : formValue.countryId,
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
        //governorateId : formValue.governorateId,
        //countryId : formValue.countryId,
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
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addClientContactPersonForm.dirty;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
