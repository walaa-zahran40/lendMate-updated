import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { arabicOnlyValidator } from '../../../../../../../shared/validators/arabic-only.validator';
import { positiveNumberValidator } from '../../../../../../../shared/validators/positive-only.validator';
import { Observable, filter, take, map, tap } from 'rxjs';
import { SubSectors } from '../../../../../../../shared/interfaces/sub-sector.interface';
import { Sector } from '../../../../../../lookups/store/sectors/sector.model';
import { ClientsFacade } from '../../../../store/_clients/allclients/clients.facade';
import { Individual } from '../../../../store/_clients/individuals/individual.model';
import { ClientIdentityTypesFacade } from '../../../../store/client-identity-types/client-identity-types.facade';
import { loadSectorById } from '../../../../store/sector-drop-down/sector.actions';
import { selectAllSubSectors } from '../../../../store/sub-sector-drop-down/sub-sector.selectors';
import { IndividualsFacade } from '../../../../store/_clients/individuals/individuals.facade';
import { Client } from '../../../../store/_clients/allclients/client.model';

@Component({
  selector: 'app-add-client',
  standalone: false,
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit, OnDestroy {
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
  viewOnly = false;
  individualTypeId!: number;
  individualBusinessId!: any;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private clientsFacade: ClientsFacade,
    private individualFacade: IndividualsFacade,
    private identityTypeFacade: ClientIdentityTypesFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('🔧 ngOnInit start', {
      snapshot: this.route.snapshot,
      queryParams: this.route.snapshot.queryParams,
    });

    // Build company form
    try {
      this.buildFormCompany();
      console.log('✅ buildFormCompany done', this.addClientForm.value);
    } catch (e) {
      console.error('❌ buildFormCompany threw', e);
    }

    // Build individual form
    try {
      this.buildFormIndividual();
      console.log(
        '✅ buildFormIndividual done',
        this.addClientFormIndividual.value
      );
    } catch (e) {
      console.error('❌ buildFormIndividual threw', e);
    }

    // Calculate DOB limits
    console.log('Calculating min/max dateOfBirthIndividual…');
    this.minDateOfBirth.setFullYear(this.minDateOfBirth.getFullYear() - 100);
    this.maxDateOfBirth.setFullYear(this.maxDateOfBirth.getFullYear() - 18);
    console.log(`  → minDateOfBirth = ${this.minDateOfBirth.toDateString()}`);
    console.log(`  → maxDateOfBirth = ${this.maxDateOfBirth.toDateString()}`);
    console.log('Setting dateOfBirthIndividual default to maxDateOfBirth…');
    this.addClientFormIndividual
      .get('dateOfBirthIndividual')!
      .setValue(this.maxDateOfBirth);

    // Load identity types
    console.log('Loading identity types…');
    this.identityTypeFacade.loadAll();
    this.identityTypeFacade.all$
      .pipe(
        tap((list) => console.log('identityTypeFacade.all$ emitted', list)),
        filter((list) => list.length > 0),
        take(1)
      )
      .subscribe({
        next: (res) => {
          console.log('✔ identityOptions loaded', res);
          this.identityOptions = res;
        },
        error: (err) => console.error('❌ identityTypeFacade.all$ error', err),
      });

    // Detect edit/view mode
    console.log('Detecting mode & id…');
    console.log('route snapshot:', this.route.snapshot);
    const idParam = this.route.snapshot.paramMap.get('clientId');
    const mode = this.route.snapshot.queryParams['mode']; // 'edit' | 'view'
    const type = this.route.snapshot.queryParams['type'];
    console.log('→ idParam:', idParam, 'mode:', mode, 'type:', type);

    if (!idParam || (mode !== 'edit' && mode !== 'view')) {
      console.log('No edit/view mode detected, skipping load.');
      return;
    }

    this.clientId = +idParam;
    this.editMode = mode === 'edit';
    this.viewOnly = mode === 'view';
    console.log(`Mode = ${mode}, clientId = ${this.clientId}`);

    if (type === 'Company') {
      // Company path
      this.clientsFacade.loadById(this.clientId);
      this.clientsFacade.selected$
        .pipe(
          filter((c): c is Client => !!c && c.id === this.clientId),
          take(1)
        )
        .subscribe({
          next: (client) => {
            console.log('Loaded client:', client);
            this.disableIndividualTab = true;
            this.activeTabIndex = 0;
            this.patchForm(client);

            if (this.viewOnly) {
              console.log('⮕ View-only, disabling company form');
              this.addClientForm.disable();
            }
          },
          error: (err) =>
            console.error('❌ clientsFacade.selected$ error:', err),
          complete: () => console.log('✔️ clientsFacade.selected$ complete'),
        });
    }

    if (type === 'Individual') {
      // Individual path
      console.log('⮕ Individual, patching individual form');
      this.disableCompanyTab = true;
      this.activeTabIndex = 1;

      this.individualFacade.loadById(this.clientId);
      this.individualFacade.selected$
        .pipe(
          filter((i): i is Individual => !!i && i.clientId === this.clientId),
          take(1)
        )
        .subscribe({
          next: (ind) => {
            this.individualBusinessId = ind.id;

            console.log('Loaded individual:', ind);
            this.patchFormIndividual(ind);

            if (this.viewOnly) {
              console.log('⮕ View-only, disabling individual form');
              this.addClientFormIndividual.disable();
            }
          },
          error: (err) =>
            console.error('❌ individualFacade.selected$ error:', err),
          complete: () => console.log('✔️ individualFacade.selected$ complete'),
        });
    }
  }

  ngOnDestroy(): void {
    console.log('🗑️ ngOnDestroy: clearing selected client');
    this.clientsFacade.clearSelected();
  }

  // Helpers & getters
  get sectorIdControl(): FormControl {
    return this.addClientForm.get('sectorId') as FormControl;
  }
  get subSectorList(): FormArray {
    return this.addClientForm.get('subSectorIdList') as FormArray;
  }
  get tabValue(): number {
    return this.disableCompanyTab ? 1 : 0;
  }
  get legalFormList(): FormArray {
    return this.addClientForm.get('legalFormId') as FormArray;
  }
  get legalFormLawList(): FormArray {
    return this.addClientForm.get('legalFormLawId') as FormArray;
  }
  get identities(): FormArray {
    return this.addClientFormIndividual.get('identities') as FormArray;
  }

  onSectorChanged(sectorId: number) {
    console.log('➡ onSectorChanged', sectorId);
    this.store
      .select(selectAllSubSectors)
      .pipe(
        take(1),
        tap((list) => console.log('selectAllSubSectors full list:', list)),
        map((list) => list.filter((s) => s.sectorId === sectorId)),
        tap((filtered) => console.log('Filtered subSectorsList:', filtered))
      )
      .subscribe({
        next: (filtered) => {
          this.subSectorsList = filtered;
          console.log('⤷ Clearing subSectorIdList to []');
          this.addClientForm.patchValue({ subSectorIdList: [] });
        },
        error: (err) =>
          console.error('❌ onSectorChanged subscription error', err),
      });
  }

  close() {
    console.log('Navigating back to view-clients');
    this.router.navigate(['/crm/clients/view-clients']);
  }

  // Company form
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
        [Validators.pattern(/^(19|20)\d{2}$/), Validators.min(0)],
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

  private patchForm(client: Client): void {
    console.log('🛠️ patchForm() start', client);
    try {
      this.addClientForm.patchValue({
        id: client.id,
        name: client.name,
        nameAR: client.nameAR,
        businessActivity: client.businessActivity,
        taxId: +client.taxId!,
        shortName: client.shortName,
        isIscore: client.isIscore,
        isStampDuty: client.isStampDuty,
        legalFormId: client.legalFormId,
        legalFormLawId: client.legalFormLawId,
        mainShare: client.mainShare,
        marketShare: client.marketShare,
        marketSize: client.marketSize,
        employeesNo: client.employeesNo,
        establishedYear: client.establishedYear,
        website: client.website,
      });
      console.log('✅ static fields patched', this.addClientForm.getRawValue());
    } catch (e) {
      console.error('❌ Error patching static fields:', e);
    }

    const rawList = client.subSectorList ?? [];
    console.log('🔍 rawList:', rawList);
    if (rawList.length === 0) {
      console.warn('⚠️ no sub‐sectors in rawList, skipping dropdown patch');
      return;
    }

    const sectorId = rawList[0].sectorId;
    console.log(`⏳ Would dispatch loadSectorById({ id: ${sectorId} })`);
    // this.store.dispatch(loadSectorById({ id: sectorId }));

    this.store
      .select(selectAllSubSectors)
      .pipe(
        filter((list) => list.length > 0),
        take(1),
        map((list) => list.filter((s) => s.sectorId === sectorId)),
        tap((filtered) =>
          console.log('⤷ filtered subSectors for patchForm:', filtered)
        )
      )
      .subscribe({
        next: (filtered) => {
          this.subSectorsList = filtered;
          const selectedIds = rawList.map((s: any) => s.id);
          try {
            this.addClientForm.patchValue({
              sectorId,
              subSectorIdList: selectedIds,
            });
            console.log('✅ dropdown fields patched:', {
              sectorId,
              selectedIds,
            });
          } catch (e) {
            console.error('❌ Error patching dropdown fields:', e);
          }
        },
        error: (err) =>
          console.error('❌ Error in selectAllSubSectors subscription:', err),
      });
  }

  saveInfo() {
    console.log('💾 saveInfo() start; valid?', this.addClientForm.valid);
    if (this.addClientForm.invalid) {
      console.warn('❗ form invalid, errors:', this.addClientForm.errors);
      this.addClientForm.markAllAsTouched();
      return;
    }

    const formValue = this.addClientForm.value;
    console.log('→ formValue:', formValue);

    if (this.editMode) {
      console.log('✏️ update mode payload:', formValue);
      const updatedClient = {
        id: this.clientId,
        name: formValue.name,
        nameAR: formValue.nameAR,
        shortName: formValue.shortName,
        businessActivity: formValue.businessActivity,
        isIscore: formValue.isIscore,
        taxId: String(formValue.taxId),
        clientTypeId: 1,
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
      this.clientsFacade.update(this.clientId, updatedClient);
    } else {
      console.log('🆕 create mode payload:', formValue);
      const payload = {
        clientTypeId: 1,
        id: this.clientId,
        name: formValue.name,
        nameAR: formValue.nameAR,
        businessActivity: formValue.businessActivity,
        taxId: String(formValue.taxId),
        shortName: formValue.shortName,
        sectorId: formValue.sectorId,
        subSectorIdList: formValue.subSectorIdList,
        isIscore: formValue.isIscore,
        legalFormLawId: formValue.legalFormLawId,
        legalFormId: formValue.legalFormId,
        isStampDuty: formValue.isStampDuty,
        mainShare: formValue.mainShare,
        establishedYear: formValue.establishedYear,
        website: formValue.website,
        marketShare: formValue.marketShare,
        marketSize: formValue.marketSize,
        employeesNo: formValue.employeesNo,
      };
      this.clientsFacade.create(payload);
    }

    this.router.navigate(['/crm/clients/view-clients']);
  }

  // Individual form
  buildFormIndividual() {
    this.addClientFormIndividual = this.fb.group({
      nameEnglishIndividual: ['', Validators.required],
      nameArabicIndividual: ['', [Validators.required, arabicOnlyValidator()]],
      businessActivityIndividual: ['', Validators.required],
      shortNameIndividual: ['', Validators.required],
      sectorId: [[], Validators.required],
      subSectorIdList: [[], Validators.required],
      emailIndividual: ['', [Validators.required, Validators.email]],
      jobTitleIndividual: ['', Validators.required],
      dateOfBirthIndividual: [null, Validators.required],
      genderIndividual: [null, Validators.required],
      identities: this.fb.array([this.createIdentityGroup()]),
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

  private patchFormIndividual(ind: any) {
    console.log('🛠️ patchFormIndividual() start', ind);
    try {
      this.addClientFormIndividual.patchValue({
        nameEnglishIndividual: ind.name,
        nameArabicIndividual: ind.nameAR,
        businessActivityIndividual: ind.businessActivity,
        shortNameIndividual: ind.shortName,
        emailIndividual: ind.email,
        jobTitleIndividual: ind.jobTitle,
        dateOfBirthIndividual: new Date(ind.birthDate!),
        genderIndividual: ind.genderId,
      });
      console.log(
        '✅ individual static fields patched',
        this.addClientFormIndividual.getRawValue()
      );
    } catch (e) {
      console.error('❌ Error patching individual static fields:', e);
    }

    const arr = this.identities;
    arr.clear();
    ind.clientIdentities!.forEach((ci: any) => {
      const fg = this.fb.group({
        id: [ci.id],
        identificationNumber: [ci.identificationNumber, Validators.required],
        selectedIdentities: [ci.clientIdentityTypeId, Validators.required],
        isMain: [ci.isMain, Validators.required],
      });
      arr.push(fg);
    });

    const rawList = ind.subSectorList ?? [];
    console.log('🔍 rawList computed:', rawList);
    if (rawList.length === 0) {
      console.warn('⚠️ no sub‐sectors in rawList, skipping dropdown patch');
      return;
    }

    const sectorId = rawList[0].sectorId;
    console.log(`⏳ Would dispatch loadSectorById({ id: ${sectorId} })`);
    // this.store.dispatch(loadSectorById({ id: sectorId }));

    this.store
      .select(selectAllSubSectors)
      .pipe(
        filter((list) => list.length > 0),
        take(1),
        map((list) => list.filter((s) => s.sectorId === sectorId)),
        tap((filtered) => console.log('⤷ filtered subSectorsList:', filtered))
      )
      .subscribe({
        next: (filtered) => {
          this.subSectorsList = filtered;
          const selectedIds = rawList.map((s: any) => s.id);
          try {
            this.addClientFormIndividual.patchValue({
              sectorId,
              subSectorIdList: selectedIds,
            });
            console.log('✅ dropdown fields patched:', {
              sectorId,
              selectedIds,
            });
          } catch (e) {
            console.error('❌ Error patching individual dropdown fields:', e);
          }
        },
        error: (err) =>
          console.error('❌ Error in selectAllSubSectors subscription:', err),
      });

    console.log(
      '[patchFormIndividual] complete form value:',
      this.addClientFormIndividual.getRawValue()
    );
  }

  saveInfoIndividual() {
    console.log(
      '💾 saveInfoIndividual() start; valid?',
      this.addClientFormIndividual.valid
    );
    if (this.addClientFormIndividual.invalid) {
      console.warn(
        '❗ individual form invalid, errors:',
        this.addClientFormIndividual.errors
      );
      this.addClientFormIndividual.markAllAsTouched();
      return;
    }

    const formValue = this.addClientFormIndividual.value;
    console.log('[Form Raw getRawValue]', formValue);
    formValue.identities?.forEach((i: any, idx: number) => {
      console.log(`[FormRaw identities][${idx}]`, i);
    });

    const clientIdentitiesPayload = formValue.identities?.map((i: any) => {
      const entry: any = {
        identificationNumber: i.identificationNumber,
        clientIdentityTypeId: i.selectedIdentities,
        isMain: i.isMain,
      };
      if (this.editMode && i.id != null) {
        entry.id = Number(i.id);
      }
      return entry;
    });

    if (this.editMode) {
      console.log('✏️ update individual payload building…');
      const changes: any = {
        id: this.individualBusinessId,
        name: formValue.nameEnglishIndividual,
        nameAR: formValue.nameArabicIndividual,
        shortName: formValue.shortNameIndividual,
        clientTypeId: 2,
        businessActivity: formValue.businessActivityIndividual,
        email: formValue.emailIndividual,
        jobTitle: formValue.jobTitleIndividual,
        birthDate: (formValue.dateOfBirthIndividual as Date).toISOString(),
        genderId: formValue.genderIndividual,
        subSectorIdList: formValue.subSectorIdList,
        clientIdentities: clientIdentitiesPayload,
        clientId: this.route.snapshot.params['clientId'],
      };
      console.log('[Edit Mode] PATCH Payload:', changes);
      this.individualFacade.update(this.individualBusinessId, {
        ...changes,
        clientIdentities: clientIdentitiesPayload,
      });
    } else {
      console.log('🆕 create individual payload building…');
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
        birthDate: (formValue.dateOfBirthIndividual as Date).toISOString(),
        genderId: formValue.genderIndividual,
        clientIdentities: clientIdentitiesPayload,
      };
      console.log('[Create Mode] POST Payload:', payload);
      this.individualFacade.create({
        ...payload,
        clientIdentities: clientIdentitiesPayload,
      });
    }
    this.router.navigate(['/crm/clients/view-clients']);
  }
}
