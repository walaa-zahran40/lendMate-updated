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
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { positiveNumberValidator } from '../../../../../shared/validators/positive-only.validator';
import { LegalFormService } from '../../services/legal-form.service';
import { Sector } from '../../../../../shared/interfaces/sector.interface';
import { LegalFormLawService } from '../../services/legal-form-law.service';
import { filter, map, Observable, take } from 'rxjs';
import { ClientTypesFacade } from '../../store/client-types/client-types.facade';
import {
  loadClient,
  updateClient,
  createClient,
} from '../../store/clients/clients.actions';
import {
  selectSubSectorList,
  selectSelectedClient,
} from '../../store/clients/clients.selectors';
import { selectAllSectors } from '../../../../../shared/components/form/store/sector-drop-down/sector.selectors';
import {
  loadSectorById,
  loadSectors,
} from '../../../../../shared/components/form/store/sector-drop-down/sector.actions';
import { SubSectors } from '../../../../../shared/interfaces/sub-sector.interface';
import { selectAllSubSectors } from '../../../../../shared/components/form/store/sub-sector-drop-down/sub-sector.selectors';
import { loadSubSectors } from '../../../../../shared/components/form/store/sub-sector-drop-down/sub-sector.actions';
import { IndividualFacade } from '../../store/individual/individual.facade';
import { IdentityFacade } from '../../store/identity/identity.facade';
import { Individual } from '../../store/individual/individual.state';

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
  selectedClientType = null;
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
  identityOptions: {
    id: number;
    name: string;
    nameAR: string;
    isActive: boolean;
  }[] = [];
  public activeTabIndex = 0; // 0 = company, 1 = individual
  public disableCompanyTab = false;
  public disableIndividualTab = false;
  individualCode!: string;
  // You’ll look up the “Individual” type’s ID at runtime:
  individualTypeId!: number;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private clientTypesFacade: ClientTypesFacade,
    private legalFormService: LegalFormService,
    private legalFormlawService: LegalFormLawService,
    private route: ActivatedRoute,
    private individualFacade: IndividualFacade,
    private identityFacade: IdentityFacade
  ) {}

  ngOnInit() {
    // 0) reset everything
    this.editMode = false;
    this.activeTabIndex = 0;
    this.disableCompanyTab = false;
    this.disableIndividualTab = false;

    // 1) build forms
    this.buildFormCompany();
    this.buildFormIndividual();

    // 2) grab the “Individual” code
    this.clientTypesFacade.loadClientTypes();
    this.clientTypesFacade.types$
      .pipe(
        filter((t) => t.length > 0),
        take(1)
      )
      .subscribe((types) => {
        const indivType = types.find(
          (x) => x.name.toLowerCase() === 'individual'
        )!;
        this.individualCode = indivType.code;
        this.selectedClientType = indivType.id;

        const idParam = this.route.snapshot.paramMap.get('id');
        if (!idParam) {
          // — add mode: company tab by default, **both tabs enabled**
          this.activeTabIndex = 0;
          this.disableCompanyTab = false;
          this.disableIndividualTab = false;
          return;
        }

        // — edit mode:
        this.editMode = true;
        this.clientId = +idParam;
        const typeParam = this.route.snapshot.queryParamMap.get('type') ?? '';
        const isIndEdit = typeParam === this.individualCode;

        if (isIndEdit) {
          // ─── editing an individual ───
          this.activeTabIndex = 1;
          this.disableCompanyTab = true;
          this.disableIndividualTab = false;
          this.individualFacade.load(this.clientId); // or loadById()

          this.individualFacade.selected$.subscribe((data) => {
            if (data) {
              this.individualBusinessId = data.id; // ✅ ← this is the internal detail ID (like 22)
              // this.clientId = data.clientId;       // ✅ ← this is the external client ID (like 3108)
              this.patchForm(data); // ✅ ← patch the form with the fetched data
            }
          });
          this.individualFacade.load(this.clientId);
          this.individualFacade.selected$
            .pipe(filter((i) => !!i))
            .subscribe((ind) => this.patchFormIndividual(ind!));
        } else {
          // ─── editing a company ───
          this.activeTabIndex = 0;
          this.disableCompanyTab = false;
          this.disableIndividualTab = true;

          this.store.dispatch(loadClient({ clientId: this.clientId }));
          this.store
            .select(selectSelectedClient)
            .pipe(filter((c) => !!c))
            .subscribe((c) => this.patchForm(c!));
        }
      });

    // 3) kick off your other lookups...
    this.store.dispatch(loadSectors());
    this.store.dispatch(loadSubSectors());
    this.identityFacade.loadAll();
    this.store
      .select(selectAllSectors)
      .subscribe((s) => (this.sectorsList = s));
    this.identityFacade.identityTypes$.subscribe(
      (l) => (this.identityOptions = l)
    );
  }

  private patchFormIndividual(ind: Individual) {
    // mirror what you do for patchForm, but target addClientFormIndividual…
    this.subSectorsList = ind.subSectorList.map((s) => ({
      id: s.id,
      name: s.name,
      nameAR: s.nameAR,
      sectorId: s.sectorId,
    }));
    // Clear & rebuild the FormArray
    const arr = this.addClientFormIndividual.get('identities') as FormArray;
    arr.clear();

    ind.clientIdentities.forEach((ci) =>
      arr.push(
        this.fb.group({
          identificationNumber: [ci.identificationNumber, Validators.required],
          // <-- scalar initial value
          selectedIdentities: [ci.clientIdentityTypeId, Validators.required],
          isMain: [ci.isMain, Validators.required],
        })
      )
    );

    this.addClientFormIndividual.patchValue({
      nameEnglishIndividual: ind.name,
      nameArabicIndividual: ind.nameAR,
      businessActivityIndividual: ind.businessActivity,
      shortNameIndividual: ind.shortName,
      sectorId: ind.subSectorList[0]?.sectorId,
      subSectorIdList: ind.subSectorList.map((s) => s.sectorId),
      emailIndividual: ind.email,
      jobTitleIndividual: ind.jobTitle,
      dateOfBirthIndividual: new Date(ind.birthDate),
      genderIndividual: ind.genderId,
      // for the identities FormArray, you may need to clear out and recreate:
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
      identificationNumber: ['', Validators.required],
      selectedIdentities: [[], Validators.required],
      isMain: [false, Validators.required],
    });
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

  fetchLegalForms(): void {
    this.legalFormService.getAllLegalForms().subscribe((response: any) => {
      this.dropdownlegalLawItems = [
        ...response.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          nameAR: item.nameAR,
        })),
      ];
    });
  }
  fetchLegalFormLaws(): void {
    this.legalFormlawService
      .getAllLegalFormLaws()
      .subscribe((response: any) => {
        this.dropdownlegalFormLawItems = [
          ...response.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            nameAR: item.nameAR,
          })),
        ];
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
        sectorId: formValue.sectorId,
      };
      // delete updatedClient.sectorId;

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

    const formValue = this.addClientFormIndividual.value;
    console.log('[Form Raw Value]', formValue);

    if (this.editMode) {
      const changes: any = {
        id: this.individualBusinessId, // ✅ Use actual business detail ID, not clientId
        name: formValue.nameEnglishIndividual,
        nameAR: formValue.nameArabicIndividual,
        shortName: formValue.shortNameIndividual,
        clientTypeId: 2,
        clientId: this.clientId, // ✅ Keep clientId in payload
        businessActivity: formValue.businessActivityIndividual,
        email: formValue.emailIndividual,
        jobTitle: formValue.jobTitleIndividual,
        birthDate: (formValue.dateOfBirthIndividual as Date)?.toISOString(),
        genderId: formValue.genderIndividual,
        subSectorIdList: formValue.subSectorIdList,
        clientIdentities: formValue.identities?.map((i: any) => ({
          id: i.id,
          identificationNumber: i.identificationNumber,
          clientIdentityTypeId: i.selectedIdentities,
          isMain: i.isMain,
        })),
      };

      console.log('[Edit Mode] PATCH Payload:', changes);
      this.individualFacade.update(this.individualBusinessId, changes); // ✅ Correct ID
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
        clientIdentities: formValue.identities?.map((i: any) => ({
          id: i.id,
          identificationNumber: i.identificationNumber,
          clientIdentityTypeId: i.selectedIdentities,
          isMain: i.isMain,
        })),
      };

      console.log('[Create Mode] POST Payload:', payload);
      this.individualFacade.create(payload);
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
