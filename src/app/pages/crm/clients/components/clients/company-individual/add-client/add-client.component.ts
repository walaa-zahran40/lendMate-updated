import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { arabicOnlyValidator } from '../../../../../../../shared/validators/arabic-only.validator';
import { positiveNumberValidator } from '../../../../../../../shared/validators/positive-only.validator';
import { Sector } from '../../../../../../../shared/interfaces/sector.interface';
import { combineLatest, filter, map, Observable, take } from 'rxjs';
import {
  loadClient,
  updateClient,
  createClient,
} from '../../../../store/clients/clients.actions';
import {
  selectSubSectorList,
  selectSelectedClient,
} from '../../../../store/clients/clients.selectors';
import { selectAllSectors } from '../../../../store/sector-drop-down/sector.selectors';
import {
  loadSectorById,
  loadSectors,
} from '../../../../store/sector-drop-down/sector.actions';
import { SubSectors } from '../../../../../../../shared/interfaces/sub-sector.interface';
import { selectAllSubSectors } from '../../../../store/sub-sector-drop-down/sub-sector.selectors';
import { loadSubSectors } from '../../../../store/sub-sector-drop-down/sub-sector.actions';
import { IndividualFacade } from '../../../../store/individual/individual.facade';
import { Individual } from '../../../../store/individual/individual.state';
import { ClientIdentitiesFacade } from '../../../../store/client-identities/client-identities.facade';
import { ClientIdentityTypesFacade } from '../../../../store/client-identity-types/client-identity-types.facade';
import { ClientTypesFacade } from '../../../../../../lookups/store/client-types/client-types.facade';

@Component({
  selector: 'app-add-client',
  standalone: false,
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit {
  addClientForm!: FormGroup;
  addClientFormIndividual!: FormGroup;
  addClient = true;
  selectedSectorId: number = 0;
  allSectors: any[] = [];
  sectorsList: any[] = [];
  subSectorsList: any[] = [];
  subSectorsSafe$!: Observable<SubSectors[]>;
  selectedClientType: any;
  dropdownClientTypeItems: any[] = [];
  company: boolean = false;
  individual: any = false;
  subSectorList$ = this.store.select(selectSubSectorList);
  dropdownlegalLawItems: Sector[] = [];
  dropdownlegalFormLawItems: Sector[] = [];
  selectedClient$!: Observable<any>;
  sectorById$!: Observable<any>;
  public editMode: boolean = false;
  public clientId: any = null;
  selectedLegalFormLawId: number | null = null;
  selectedLegalFormId: any;
  selectedSubSectorId: any;
  formGroup!: FormGroup;
  identityOptions: any;
  public activeTabIndex = 0; // 0 = company, 1 = individual
  public disableCompanyTab = false;
  public disableIndividualTab = false;
  individualCode!: any;
  maxDateOfBirth = new Date(); // today
  minDateOfBirth = new Date();
  // You’ll look up the “Individual” type’s ID at runtime:
  individualTypeId!: number;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private clientTypesFacade: ClientTypesFacade,
    private route: ActivatedRoute,
    private individualFacade: IndividualFacade,
    private identityFacade: ClientIdentitiesFacade,
    private identityTypeFacade: ClientIdentityTypesFacade
  ) {}

  ngOnInit(): void {
    // — build both forms (company & individual)

    console.log('Building the company form…');
    this.buildFormCompany();
    console.log('Building the individual form…');
    this.buildFormIndividual();

    // — calculate min/max DOB

    console.log('Calculating min/max dateOfBirthIndividual…');
    this.minDateOfBirth.setFullYear(this.minDateOfBirth.getFullYear() - 100);
    this.maxDateOfBirth.setFullYear(this.maxDateOfBirth.getFullYear() - 18);
    console.log(`  → minDateOfBirth = ${this.minDateOfBirth.toDateString()}`);
    console.log(`  → maxDateOfBirth = ${this.maxDateOfBirth.toDateString()}`);

    //— set default DOB to max (first available)
    console.log('Setting dateOfBirthIndividual default to maxDateOfBirth…');
    this.addClientFormIndividual
      .get('dateOfBirthIndividual')!
      .setValue(this.maxDateOfBirth);

    // — identity‐types always for dropdown
    console.log('Loading identity types for dropdown…');
    this.identityTypeFacade.loadAll();
    this.identityTypeFacade.all$
      .pipe(
        filter((arr) => arr.length > 0),
        take(1)
      )
      .subscribe((types) => {
        if (!this.editMode) {
          console.log('  → ADD MODE: identityOptions = all types', types);
          this.identityOptions = types;
        }
      });

    console.log(
      'Determining if we are in edit or add mode…',
      this.route.snapshot
    );
    const raw = this.route.snapshot.params['clientId'];
    if (raw) {
      this.editMode = true;
      console.log('Loading existing client identities…');
      this.identityFacade.loadAll(); // ideally: loadByClientId(this.clientId!)
      combineLatest({
        identities: this.identityFacade.all$.pipe(
          filter((arr) => arr.length > 0),
          take(1)
        ),
        types: this.identityTypeFacade.all$.pipe(
          filter((arr) => arr.length > 0),
          take(1)
        ),
      }).subscribe(({ identities, types }) => {
        console.log('  → identities loaded:', identities);
        const used = Array.from(
          new Set(identities.map((i) => i.identificationTypeId))
        );
        const filtered = types.filter((t) => used.includes(t.id));
        console.log('  → filtered identityOptions:', filtered);
        this.identityOptions = filtered;
        console.log('  → Building FormArray for identities…');
        const groups = identities.map((ci) =>
          this.fb.group({
            id: [ci.id],
            identificationNumber: [
              ci.identificationNumber,
              Validators.required,
            ],
            selectedIdentities: [ci.identificationTypeId, Validators.required],
            isMain: [ci.isMain, Validators.required],
          })
        );
        this.addClientFormIndividual.setControl(
          'identities',
          this.fb.array(groups)
        );
        console.log('  → identities FormArray set');
      });
    } else {
      this.editMode = false;
    }
    // — if editing, load only that client’s identities
    if (this.editMode) {
    }
    // this.clientId = raw ? +raw : null;
    // this.editMode = !!this.clientId;
    // console.log(`  → clientId = ${this.clientId}`);
    // console.log(`  → editMode = ${this.editMode}`);

    // // — client‐type tabs logic
    // console.log('Loading client types to decide which tab to show…');
    // this.clientTypesFacade.loadAll();
    // this.clientTypesFacade.all$
    //   .pipe(
    //     filter((arr) => arr.length > 0),
    //     take(1)
    //   )
    //   .subscribe((types) => {
    //     console.log('  → clientTypes loaded:', types);
    //     const indivType = types.find(
    //       (t) => t.name.toLowerCase() === 'individual'
    //     )!;
    //     this.individualCode = indivType.code;
    //     this.selectedClientType = indivType.id;
    //     console.log(
    //       `  → individualCode = ${this.individualCode}, selectedClientType = ${this.selectedClientType}`
    //     );
    //     const isIndEdit =
    //       this.route.snapshot.queryParamMap.get('type') === this.individualCode;
    //     if (!this.editMode) {
    //       console.log('  → ADD MODE: enabling both tabs');
    //       this.activeTabIndex = 0;
    //       this.disableCompanyTab = false;
    //       this.disableIndividualTab = false;
    //     } else if (isIndEdit) {
    //       console.log('  → EDIT INDIVIDUAL branch selected');
    //       this.activeTabIndex = 1;
    //       this.disableCompanyTab = true;
    //       console.log(
    //         `  → Dispatching IndividualFacade.load(${this.clientId})`
    //       );
    //       this.individualFacade.load(this.clientId!);
    //       this.individualFacade.selected$
    //         .pipe(
    //           filter((i) => !!i),
    //           take(1)
    //         )
    //         .subscribe((data) => {
    //           console.log('    → Individual data received:', data);
    //           this.individualBusinessId = data.id;
    //           this.patchFormIndividual(data);
    //           console.log('    → Individual form patched');
    //           // disable form in view mode
    //           if (this.editMode) {
    //             console.log('    → Disabling individual form for view-only');
    //             this.addClientFormIndividual.disable({ emitEvent: false });
    //           }
    //         });
    //     } else {
    //       console.log('  → EDIT COMPANY branch selected');
    //       this.activeTabIndex = 0;
    //       this.disableIndividualTab = true;
    //       console.log(
    //         `  → Dispatching loadClient({ clientId: ${this.clientId} })`
    //       );
    //       this.store.dispatch(loadClient({ clientId: this.clientId! }));
    //       this.store
    //         .select(selectSelectedClient)
    //         .pipe(
    //           filter((c) => !!c),
    //           take(1)
    //         )
    //         .subscribe((c) => {
    //           console.log('    → Company data received:', c);
    //           this.patchForm(c!);
    //           console.log('    → Company form patched');
    //           // disable form in view mode
    //           if (this.editMode) {
    //             console.log('    → Disabling company form for view-only');
    //             this.addClientForm.disable({ emitEvent: false });
    //           }
    //         });
    //     }
    //   });
    // // — load sectors & sub-sectors once
    // console.log('Dispatching loadSectors() and loadSubSectors()…');
    // this.store.dispatch(loadSectors());
    // this.store.dispatch(loadSubSectors());
    // this.store.select(selectAllSectors).subscribe((secs) => {
    //   console.log('  → sectorsList updated:', secs);
    //   this.sectorsList = secs;
    // });
    // this.store.select(selectAllSubSectors).subscribe((subs) => {
    //   console.log('  → subSectorsList updated:', subs);
    //   this.subSectorsList = subs;
    // });
    // console.log('ngOnInit: complete');
  }

  get tabValue(): number {
    return this.disableCompanyTab ? 1 : 0;
  }

  private patchFormIndividual(ind: Individual) {
    // ── load + filter sub-sectors for the individual’s sector ──
    const firstSectorId = ind.subSectorList[0]?.sectorId;
    if (firstSectorId) {
      // tell NgRx to fetch (or ensure loaded) the sub-sectors for that sector
      this.store.dispatch(loadSectorById({ id: firstSectorId }));
      this.store
        .select(selectAllSubSectors)
        .pipe(
          filter((subs) => subs.length > 0), // wait until they’re in the store
          take(1),
          map((subs) => subs.filter((s) => s.sectorId === firstSectorId))
        )
        .subscribe((filtered) => {
          this.subSectorsList = filtered;

          // now patch just the two controls that matter:
          this.addClientFormIndividual.patchValue({
            sectorId: firstSectorId,
            subSectorIdList: ind.subSectorList.map((s) => s.sectorId),
            clientId: this.route.snapshot.params['id'],
          });
        });
    }

    // ── identities array ──
    const arr = this.addClientFormIndividual.get('identities') as FormArray;
    arr.clear();
    ind.clientIdentities.forEach((ci) => {
      const fg = this.fb.group({
        id: [ci.id],
        identificationNumber: [ci.identificationNumber, Validators.required],
        selectedIdentities: [ci.clientIdentityTypeId, Validators.required],
        isMain: [ci.isMain, Validators.required],
      });
      arr.push(fg);
    });

    // ── the rest of the form ──
    this.addClientFormIndividual.patchValue({
      nameEnglishIndividual: ind.name,
      nameArabicIndividual: ind.nameAR,
      businessActivityIndividual: ind.businessActivity,
      shortNameIndividual: ind.shortName,
      emailIndividual: ind.email,
      jobTitleIndividual: ind.jobTitle,
      dateOfBirthIndividual: new Date(ind.birthDate),
      genderIndividual: ind.genderId,
    });

    console.log(
      '[patchFormIndividual] complete form value:',
      this.addClientFormIndividual.getRawValue()
    );
  }
  buildFormCompany(): void {
    this.addClientForm = this.fb.group({
      name: ['', Validators.required],
      nameAR: ['', [Validators.required, arabicOnlyValidator()]],
      businessActivity: ['', Validators.required],
      taxId: ['', [Validators.required, positiveNumberValidator()]],
      shortName: ['', Validators.required],
      sectorId: [[], Validators.required],
      subSectorIdList: [[], Validators.required],
      legalFormLawId: [null],
      legalFormId: [null],
      isStampDuty: [false],
      isIscore: [false],
      mainShare: [null, [Validators.min(0)]],

      establishedYear: [
        2000,
        [
          Validators.pattern(/^(19|20)\d{2}$/), // Valid years: 1900–2099
          Validators.min(0),
        ],
      ],
      website: [
        'mansor.com',
        [
          Validators.pattern(
            /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/
          ),
        ],
      ],
      marketShare: [null, [Validators.min(0), Validators.max(100)]],
      marketSize: [null, [Validators.min(0)]],
      employeesNo: [null, [Validators.min(0)]],
    });
  }
  buildFormIndividual() {
    this.addClientFormIndividual = this.fb.group({
      nameEnglishIndividual: ['', Validators.required],
      nameArabicIndividual: ['', [Validators.required, arabicOnlyValidator()]],
      businessActivityIndividual: ['', Validators.required],
      shortNameIndividual: ['', Validators.required],
      sectorId: [null, Validators.required],
      subSectorIdList: [[], Validators.required],
      emailIndividual: ['', [Validators.required, Validators.email]],
      jobTitleIndividual: ['', Validators.required],
      dateOfBirthIndividual: [null, Validators.required],
      genderIndividual: [null, Validators.required],

      // initialize your FormArray with one entry
      identities: this.fb.array([this.createIdentityGroup()]),
    });
  }
  get identities(): FormArray {
    return this.addClientFormIndividual.get('identities') as FormArray;
  }
  addIdentity() {
    this.identities.push(this.createIdentityGroup());
  }

  removeIdentity(i: number) {
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

  patchForm(client: any): void {
    console.log('🛠️ patchForm got:', client);
    if (!client?.subSectorList?.length) {
      console.warn('⚠️ no subSectorList to patch––skipping');
      return;
    }
    const sectorId = client.subSectorList[0].sectorId;
    if (!sectorId) return;

    this.store.dispatch(loadSectorById({ id: sectorId }));

    this.store
      .select(selectAllSubSectors)
      .pipe(
        filter((subs) => subs.length > 0),
        take(1),
        map((subs) => {
          const sectorSubs = subs.filter((s) => s.sectorId === sectorId);

          // Add any missing selected subs (edge case where they don't exist in filtered list)
          const extraSelectedSubs = client.subSectorList.filter(
            (s: any) => !sectorSubs.some((sub) => sub.id === s.sectorId)
          );

          return [...sectorSubs, ...extraSelectedSubs];
        })
      )
      .subscribe((finalSubs) => {
        this.subSectorsList = finalSubs;

        // Then patch the form after options are available
        this.addClientForm.patchValue({
          ...client,
          sectorId,
          subSectorIdList: client.subSectorList.map((s: any) => s.sectorId),
          legalFormId: client.legalFormId?.id || client.legalFormId,
          legalFormLawId: client.legalFormLawId?.id || client.legalFormLawId,
        });
      });
  }

  get sectorIdControl(): FormControl {
    return this.addClientForm.get('sectorId') as FormControl;
  }

  get subSectorList(): FormArray {
    return this.addClientForm.get('subSectorIdList') as FormArray;
  }
  get legalFormList(): FormArray {
    return this.addClientForm.get('legalFormId') as FormArray;
  }

  get legalFormLawList(): FormArray {
    return this.addClientForm.get('legalFormLawId') as FormArray;
  }

  saveInfo() {
    if (this.addClientForm.invalid) {
      this.addClientForm.markAllAsTouched();
      return;
    }

    const formValue = this.addClientForm.value;
    if (this.editMode) {
      console.log('form value company ', formValue);
      const updatedClient = {
        ...formValue,
        id: this.clientId,
        clientTypeId: 1,
        subSectorIdList: formValue.subSectorIdList,
        legalFormLawId: formValue.legalFormLawId,
        legalFormId: formValue.legalFormId,
        taxId: String(formValue.taxId),
      };
      delete updatedClient.sectorId;

      this.store.dispatch(updateClient({ client: updatedClient }));
    } else {
      const payload = {
        id: this.clientId,
        name: formValue.name,
        nameAR: formValue.nameAR,
        shortName: formValue.shortName,
        businessActivity: formValue.businessActivity,
        isIscore: formValue.isIscore,
        taxId: String(formValue.taxId),
        clientTypeId: 1,
        sectorId: formValue.sectorId,
        subSectorIdList: formValue.subSectorIdList,
        isStampDuty: formValue.isStampDuty,
        legalFormLawId: formValue.legalFormLawId,
        legalFormId: formValue.legalFormId,
        mainShare: formValue.mainShare,
        marketShare: formValue.marketShare,
        establishedYear: formValue.establishedYear,
        website: formValue.website,
        employeesNo: formValue.employeesNo,
        marketSize: formValue.marketSize,
      };
      this.store.dispatch(createClient({ payload }));
    }
  }

  individualBusinessId!: any; // Add this at class level to store ID 22
  saveInfoIndividual() {
    if (this.addClientFormIndividual.invalid) {
      console.warn('[Validation] Individual form is invalid');
      this.addClientFormIndividual.markAllAsTouched();
      return;
    }

    // 1) grab absolutely everything, even disabled fields
    const formValue = this.addClientFormIndividual.getRawValue();
    console.log('[Form Raw getRawValue]', formValue);

    // 2) inspect the identities array
    console.log('[Form Raw identities array]', formValue.identities);
    formValue.identities?.forEach((i: any, idx: number) => {
      console.log(`[FormRaw identities][${idx}].id =`, i.id);
    });

    // 3) build payload
    const clientIdentitiesPayload = formValue.identities?.map((i: any) => {
      const entry: any = {
        identificationNumber: i.identificationNumber,
        clientIdentityTypeId: i.selectedIdentities,
        isMain: i.isMain,
      };

      // only include id when in edit mode (and i.id is truthy)
      if (this.editMode && i.id != null) {
        entry.id = Number(i.id);
      }

      return entry;
    });

    if (this.editMode) {
      const changes: any = {
        id: this.individualBusinessId,
        name: formValue.nameEnglishIndividual,
        nameAR: formValue.nameArabicIndividual,
        shortName: formValue.shortNameIndividual,
        clientTypeId: 2,
        businessActivity: formValue.businessActivityIndividual,
        email: formValue.emailIndividual,
        jobTitle: formValue.jobTitleIndividual,
        birthDate: (formValue.dateOfBirthIndividual as Date)?.toISOString(),
        genderId: formValue.genderIndividual,
        subSectorIdList: formValue.subSectorIdList,
        clientIdentities: clientIdentitiesPayload,
        clientId: this.route.snapshot.params['id'],
      };

      console.log('[Edit Mode] PATCH Payload:', changes);
      this.individualFacade.update(this.individualBusinessId, {
        ...changes,
        clientIdentities: clientIdentitiesPayload,
      });
    } else {
      const payload = {
        name: formValue.nameEnglishIndividual,
        nameAR: formValue.nameArabicIndividual,
        shortName: formValue.shortNameIndividual,
        businessActivity: formValue.businessActivityIndividual,
        clientTypeId: 2,
        sectorId: formValue.sectorId,
        subSectorIdList: formValue.subSectorIdList,
        email: formValue.emailIndividual,
        jobTitle: formValue.jobTitleIndividual,
        birthDate: (formValue.dateOfBirthIndividual as Date)?.toISOString(),
        genderId: formValue.genderIndividual,
        clientIdentities: clientIdentitiesPayload,
      };

      console.log('[Create Mode] POST Payload:', payload);
      this.individualFacade.create({
        ...payload,
        clientIdentities: clientIdentitiesPayload,
      });
    }
  }

  onLegalFormLawSelectionChange(selectedLaw: any) {
    this.selectedLegalFormLawId = selectedLaw?.id || null;
    this.addClientForm.get('legalFormId')?.reset(); // reset legal form
  }
  onClientTypeChange(event: any) {
    if (event && event.value) {
      this.selectedClientType = event;
    }
  }

  onSectorChanged(sectorId: number) {
    this.selectedSectorId = sectorId;

    this.store
      .select(selectAllSubSectors)
      .pipe(
        take(1),
        map((subSectors) => subSectors.filter((s) => s.sectorId === sectorId))
      )
      .subscribe((filtered) => {
        this.subSectorsList = filtered;

        // Clear selected sub-sectors to prevent stale values
        this.addClientForm.patchValue({ subSectorIdList: [] });
      });
  }
}
