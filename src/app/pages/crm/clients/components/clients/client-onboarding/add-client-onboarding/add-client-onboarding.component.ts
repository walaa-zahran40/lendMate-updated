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
import { ClientIdentityTypesFacade } from '../../../../store/client-identity-types/client-identity-types.facade';
import { ClientsOnboardingFacade } from '../../../../store/_client-onboarding/allclients/clients-onboarding.facade';
import { IndividualOnboardingsFacade } from '../../../../store/_client-onboarding/individuals/individuals-onboarding.facade';
import { ClientOnboarding } from '../../../../store/_client-onboarding/allclients/client-onboarding.model';
import { IndividualOnboarding } from '../../../../store/_client-onboarding/individuals/individual-onboarding.model';
import { selectAllSubSectors } from '../../../../../../lookups/store/sub-sectors/sub-sectors.selectors';
import { selectAllClientStatusActions } from '../../../../../../lookups/store/client-statuses-actions/client-status-actions.selectors';

@Component({
  selector: 'app-add-client-onboarding',
  standalone: false,
  templateUrl: './add-client-onboarding.component.html',
  styleUrls: ['./add-client-onboarding.component.scss'],
})
export class AddClientOnboardingComponent implements OnInit, OnDestroy {
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
  workFlowActionList: any[] = [];
  selectedAction: string = '';

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private clientsFacade: ClientsOnboardingFacade,
    private individualFacade: IndividualOnboardingsFacade,
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
      // subscribe to every control’s valueChanges:

      console.log('✅ buildFormCompany done', this.addClientForm.controls);
    } catch (e) {
      console.error('❌ buildFormCompany threw', e);
    }

    // Build individual form
    try {
      this.buildFormIndividual();
      console.log('✅ individual done', this.addClientForm.controls);

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
          filter((c): c is ClientOnboarding => !!c && c.id === this.clientId),
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
          filter(
            (i): i is IndividualOnboarding =>
              !!i && i.clientId === this.clientId
          ),
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
    console.log('Navigating back to view-clients-onboarding');
    this.router.navigate(['/crm/clients/view-clients-onboarding']);
  }

  // Company form
  buildFormCompany(): void {
    this.addClientForm = this.fb.group({
      name: ['', Validators.required],
      nameAR: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\u0600-\u06FF\s0-9\u0660-\u0669]+$/),
        ],
      ],
      businessActivity: [''],
      taxId: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{3}-[0-9]{3}-[0-9]{3}$'),
        ],
      ],
      shortName: [''],
      sectorId: [[], Validators.required],
      subSectorIdList: [[], Validators.required],
    });
    Object.keys(this.addClientForm.controls).forEach((controlName) => {
      const ctrl = this.addClientForm.get(controlName)!;
      ctrl.valueChanges.subscribe((value) => {
        console.log(
          `[CompanyForm] ${controlName}:`,
          `value=`,
          value,
          `→ valid?`,
          ctrl.valid,
          'form',
          this.addClientForm.valid
        );
      });
    });
  }

  private patchForm(client: ClientOnboarding): void {
    console.log('🛠️ patchForm() start', client);
    try {
      this.addClientForm.patchValue({
        id: client.id,
        name: client.name,
        nameAR: client.nameAR,
        businessActivity: client.businessActivity,
        taxId: client.taxId!,
        shortName: client.shortName,
      });
      console.log('✅ static fields patched', this.addClientForm.getRawValue());

      // 🔍 TEST LOG PLACEMENT
      console.log('📍 Reached before workflow setup', client);

      this.workFlowActionList = client.allowedActionsList;
      console.log('📍 Before map');
      this.workFlowActionList = client.allowedActionsList.map((action) => ({
        id: action.id,
        label: action.name,
        icon: 'pi pi-times',
      }));
      this.selectedAction = client.currentStatusName ?? '';
      console.log('✅ this.selectedAction', this.selectedAction);

      const rawList = client.subSectorList ?? [];
      console.log('🔍 rawList:', rawList);
      if (rawList.length === 0) {
        console.warn('⚠️ no sub‐sectors in rawList, skipping dropdown patch');
        return;
      }

      const sectorId = rawList[0].sectorId;
      console.log(`⏳ Would dispatch loadSectorById({ id: ${sectorId} })`);

      // TEMP: comment out store code entirely to isolate

      this.store
        .select(selectAllSubSectors)
        .pipe(
          filter((list) => list.length > 0),
          take(1),
          map((list) => list.filter((s) => s.sectorId === sectorId)),
          tap((filtered) => console.log('⤷ filtered subSectors:', filtered))
        )
        .subscribe({
          next: (filtered) => {
            this.subSectorsList = filtered;
            const selectedIds = rawList.map((s: any) => s.id);
            this.addClientForm.patchValue({
              sectorId,
              subSectorIdList: selectedIds,
            });
            console.log('✅ dropdown fields patched');
          },
          error: (err) =>
            console.error('❌ Error in selectAllSubSectors subscription:', err),
        });
    } catch (e) {
      console.error('❌ patchForm() crashed:', e);
    }
  }

  handleWorkflowAction(event: { actionId: number; comment: string }): void {
    const payload = {
      clientId: this.clientId,
      clientStatusActionId: event.actionId,
      comment: event.comment,
      isCurrent: true,
    };

    this.clientsFacade.performWorkflowAction(event.actionId, payload);
    this.clientsFacade.workFlowActionSuccess$.subscribe({
      next: () => {
        console.log('Workflow action submitted successfully.');
        this.refreshAllowedActions();
      },
    });
  }

  refreshAllowedActions(): void {
    this.clientsFacade.loadById(this.clientId);
    this.clientsFacade.selected$.subscribe({
      next: (client) => {
        var workFlowAction = [...(client?.allowedActionsList ?? [])];
        this.workFlowActionList = workFlowAction.map((action) => ({
          id: action.id,
          label: action.name,
          icon: 'pi pi-times',
        })); // clone to ensure change detection
      },
      error: (err) => {
        console.error('Failed to refresh actions:', err);
      },
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
        clientTypeId: 1,
        subSectorIdList: formValue.subSectorIdList,
        taxId: formValue.taxId,
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
        taxId: formValue.taxId,
        shortName: formValue.shortName,
        sectorId: formValue.sectorId,
        subSectorIdList: formValue.subSectorIdList,
      };
      this.clientsFacade.create(payload);
    }
    if (this.addClientForm.valid) {
      this.addClientForm.markAsPristine();
    }

    this.router.navigate(['/crm/clients/view-clients-onboarding']);
  }

  // Individual form
  buildFormIndividual() {
    this.addClientFormIndividual = this.fb.group({
      nameEnglishIndividual: ['', Validators.required],
      nameArabicIndividual: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\u0600-\u06FF\s0-9\u0660-\u0669]+$/),
        ],
      ],
      businessActivityIndividual: [''],
      shortNameIndividual: [''],
      sectorId: [[]],
      subSectorIdList: [[]],
      emailIndividual: [''],
      jobTitleIndividual: [''],
      dateOfBirthIndividual: [null],
      genderIndividual: [null],
      identities: this.fb.array([this.createIdentityGroup()]),
    });
    Object.keys(this.addClientFormIndividual.controls).forEach(
      (controlName) => {
        const ctrl = this.addClientFormIndividual.get(controlName)!;
        ctrl.valueChanges.subscribe((value) => {
          console.log(
            `[IndividualForm] ${controlName}:`,
            `value=`,
            value,
            `→ valid?`,
            ctrl.valid,
            'form',
            this.addClientFormIndividual.valid
          );
        });
      }
    );
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

    console.log('📍 Reached before workflow setup');

    // this.workFlowActionList = ind.allowedActionsList;
    // console.log("📍 Before map");
    // this.workFlowActionList = ind.allowedActionsList.map(action => ({
    //   id: action.id,
    //   label: action.name,
    //   icon: 'pi pi-times',
    // }));
    // console.log("✅ workflowaction", this.workFlowActionList);
  }

  saveInfoIndividual() {
    // console.log(
    //   '💾 saveInfoIndividual() start; valid?',
    //   this.addClientFormIndividual.valid
    // );
    // if (this.addClientFormIndividual.invalid) {
    //   console.warn(
    //     '❗ individual form invalid, errors:',
    //     this.addClientFormIndividual.errors
    //   );
    //   this.addClientFormIndividual.markAllAsTouched();
    //   return;
    // }

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
    if (this.addClientFormIndividual.valid) {
      this.addClientFormIndividual.markAsPristine();
    }

    this.router.navigate(['/crm/clients/view-clients-onboarding']);
  } /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addClientFormIndividual.dirty && !this.addClientForm.dirty;
  }
}
