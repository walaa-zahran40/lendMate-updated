import { Component, OnInit } from '@angular/core';
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

  //Both
  ngOnInit(): void {
    // (company & individual)
    console.log('route', this.route.snapshot);
    console.log('Building the company form…');
    this.buildFormCompany();
    console.log('Building the individual form…');
    this.buildFormIndividual();

    // Individual
    console.log('Calculating min/max dateOfBirthIndividual…');
    this.minDateOfBirth.setFullYear(this.minDateOfBirth.getFullYear() - 100);
    this.maxDateOfBirth.setFullYear(this.maxDateOfBirth.getFullYear() - 18);
    console.log(`  → minDateOfBirth = ${this.minDateOfBirth.toDateString()}`);
    console.log(`  → maxDateOfBirth = ${this.maxDateOfBirth.toDateString()}`);
    console.log('Setting dateOfBirthIndividual default to maxDateOfBirth…');
    this.addClientFormIndividual
      .get('dateOfBirthIndividual')!
      .setValue(this.maxDateOfBirth);
    //— select identity dropdown list
    // 1) Fire the load request
    this.identityTypeFacade.loadAll();
    // 2) Then subscribe (or better, use an async pipe)
    this.identityTypeFacade.all$
      .pipe(
        filter((list) => list.length > 0),
        take(1)
      )
      .subscribe((res) => {
        console.log('identity list', res);
        this.identityOptions = res;
      });

    //edit and view mode
    // 1️⃣ Detect mode & id
    console.log('Detecting mode & id…', this.route.snapshot);
    const idParam = this.route.snapshot.paramMap.get('clientId');
    console.log('clientId:', idParam);
    const mode = this.route.snapshot.queryParams['mode']; // 'edit' | 'view'
    if (!idParam || (mode !== 'edit' && mode !== 'view')) {
      console.log('No edit/view mode detected, skipping load.');
      return;
    }

    if (idParam && (mode === 'edit' || mode === 'view')) {
      this.clientId = +idParam;
      this.editMode = mode === 'edit';
      this.viewOnly = mode === 'view';
      console.log(`Mode = ${mode}, clientId = ${this.clientId}`);
      // 5) Always load the general client first
      this.clientsFacade.loadById(this.clientId);

      // 6) Subscribe to general‐client stream
      this.clientsFacade.selected$
        .pipe(
          filter((c): c is Client => !!c && c.id === this.clientId),
          take(1)
        )
        .subscribe({
          next: (client) => {
            console.log('Loaded client:', client);

            if (client.clientTypeId === 1) {
              // --- Company path ---
              console.log('⮕ Company, patching company form');
              this.disableIndividualTab = true;
              this.activeTabIndex = 0;
              this.patchForm(client);

              if (this.viewOnly) {
                console.log('⮕ View-only, disabling company form');
                this.disableIndividualTab = true;
                this.activeTabIndex = 0;
                this.patchForm(client);
                this.addClientForm.disable();
              }
            } else {
              // --- Individual path ---
              console.log('⮕ Individual, patching individual form');
              this.disableCompanyTab = true;
              this.activeTabIndex = 1;

              // Now load the individual details
              this.individualFacade.loadById(this.clientId);
              this.individualFacade.selected$
                .pipe(
                  filter((i): i is Individual => !!i && i.id === this.clientId),
                  take(1)
                )
                .subscribe((ind) => {
                  console.log('Loaded individual:', ind);
                  this.patchFormIndividual(ind);

                  if (this.viewOnly) {
                    console.log('⮕ View-only, disabling individual form');
                    this.addClientFormIndividual.disable();
                  }
                });
            }
          },
          error: (err) =>
            console.error('❌ clientsFacade.selected$ error:', err),
          complete: () => console.log('✔️ clientsFacade.selected$ complete'),
        });
    }
  }
  get sectorIdControl(): FormControl {
    return this.addClientForm.get('sectorId') as FormControl;
  }
  get subSectorList(): FormArray {
    return this.addClientForm.get('subSectorIdList') as FormArray;
  }
  get tabValue(): number {
    return this.disableCompanyTab ? 1 : 0;
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
  close() {
    this.router.navigate(['/crm/clients/view-clients']);
  }

  //Company Only
  get legalFormList(): FormArray {
    return this.addClientForm.get('legalFormId') as FormArray;
  }
  get legalFormLawList(): FormArray {
    return this.addClientForm.get('legalFormLawId') as FormArray;
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
  private patchForm(client: Client): void {
    console.log('🛠️ patchForm() entry, client payload:', client);

    // 1) Patch all the simple controls up front
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
      console.log('✅ static fields patched');
    } catch (e) {
      console.error('❌ Error patching static fields:', e);
    }

    // 2) Determine which list actually has data
    const rawList = client.subSectorList ?? [];

    console.log('🔍 rawList computed:', rawList);

    // 3) Bail early if empty
    if (rawList.length === 0) {
      console.warn('⚠️ no sub‐sectors in rawList, skipping dropdown patch');
      return;
    }

    // 4) Extract sectorId and dispatch load
    const sectorId = rawList[0].sectorId;
    console.log(`⏳ dispatching loadSectorById({ id: ${sectorId} })`);
    this.store.dispatch(loadSectorById({ id: sectorId }));

    // 5) Subscribe to sub-sector options
    this.store
      .select(selectAllSubSectors)
      .pipe(
        filter((list) => list.length > 0),
        take(1),
        map((list) => list.filter((s) => s.sectorId === sectorId))
      )
      .subscribe({
        next: (filtered) => {
          console.log('📋 filtered subSectorsList:', filtered);
          this.subSectorsList = filtered;

          // 6) Finally patch the dropdown controls
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
        error: (err) => {
          console.error('❌ Error in selectAllSubSectors subscription:', err);
        },
      });
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
        subSectorIdList: formValue.subSectorIdList.id,
        legalFormLawId: formValue.legalFormLawId,
        legalFormId: formValue.legalFormId,
        taxId: String(formValue.taxId),
      };
      delete updatedClient.sectorId;

      this.clientsFacade.update(this.clientId, updatedClient);
    } else {
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

  //Individual Only
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
  patchFormIndividual(ind: any) {
    // ── load + filter sub-sectors for the individual’s sector ──
    const firstSectorId = ind.subSectorList![0]?.sectorId;
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
            subSectorIdList: ind.subSectorList!.map((s: any) => s.sectorId),
            clientId: this.route.snapshot.params['id'],
          });
        });
    }

    // ── identities array ──
    const arr = this.addClientFormIndividual.get('identities') as FormArray;
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

    // ── the rest of the form ──
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
      '[patchFormIndividual] complete form value:',
      this.addClientFormIndividual.getRawValue()
    );
  }
  saveInfoIndividual() {
    console.log('saveInfoIndividual() called', this.route.snapshot);
    this.individualBusinessId = this.route.snapshot.params['id'];
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
      console.log('form value individual ', this.route.snapshot);
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
        clientId: this.route.snapshot.params['clientId'],
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
      this.clientsFacade.loadAll();
      this.router.navigate(['/crm/clients/view-clients']);
    }
  }
}
