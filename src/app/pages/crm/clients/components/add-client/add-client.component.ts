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
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { positiveNumberValidator } from '../../../../../shared/validators/positive-only.validator';
import { LegalFormService } from '../../../../../shared/services/legal-form.service';
import { Sector } from '../../../../../shared/interfaces/sector.interface';
import { LegalFormLawService } from '../../../../../shared/services/legal-form-law.service';
import { filter, Observable, take } from 'rxjs';
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
import {
  selectAllSectors,
  selectSelectedSector,
} from '../../../../../shared/components/form/store/sector-drop-down/sector.selectors';
import { loadSectorById } from '../../../../../shared/components/form/store/sector-drop-down/sector.actions';
import { SubSectors } from '../../../../../shared/interfaces/sub-sector.interface';
import { selectAllSubSectors } from '../../../../../shared/components/form/store/sub-sector-drop-down/sub-sector.selectors';

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
  subSectorList$ = this.store.select(selectSubSectorList);
  dropdownlegalLawItems: Sector[] = [];
  dropdownlegalFormLawItems: Sector[] = [];
  selectedClient$!: Observable<any>;
  sectorById$!: Observable<any>;
  public editMode: boolean = false;
  public clientId: number | null = null;
  selectedLegalFormLawId: number | null = null;
  selectedLegalFormId: any;
  selectedSubSectorId: any;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private clientTypesFacade: ClientTypesFacade,
    private legalFormService: LegalFormService,
    private legalFormlawService: LegalFormLawService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Initialize your form here (or call a separate method)
    this.buildForm();
    this.clientTypesFacade.loadClientTypes();
    this.clientTypesFacade.types$.subscribe((types) => {
      this.dropdownClientTypeItems = [...types];
      this.selectedClientType = this.dropdownClientTypeItems[1]?.id;
    });

    this.addClientFormIndividual = this.fb.group({
      nameEnglishIndividual: ['', Validators.required],
      nameAR: ['', [Validators.required, arabicOnlyValidator()]],
      businessActivity: ['', Validators.required],
      taxId: ['', [Validators.required, positiveNumberValidator()]],
      shortName: ['', Validators.required],
      sectorId: [[], Validators.required],
      subSectorIdList: [[], Validators.required],
      legalFormLawId: [null, Validators.required],
      legalFormId: [null, Validators.required],
      isStampDuty: [null, Validators.required],
      isIscore: [null, Validators.required],
      mainShare: [null, [Validators.required, Validators.min(0)]],
      establishedYear: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(19|20)\d{2}$/), // Valid years: 1900–2099
        ],
      ],
      website: [
        null,
        [
          Validators.pattern(
            /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/
          ),
          Validators.required,
        ],
      ],
      marketShare: [
        null,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      marketSize: [null, [Validators.min(0), Validators.required]],
      employeesNo: [null, [Validators.required, Validators.min(0)]],
    });
    this.store.select(selectAllSectors).subscribe((sectors) => {
      this.sectorsList = sectors || [];
    });
    this.store.select(selectAllSubSectors).subscribe((subSectors) => {
      this.subSectorsList = subSectors || [];
    });

    // Check for an 'id' parameter to determine if we are in edit mode
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('📌 Route Param ID:', idParam);
    if (idParam) {
      this.editMode = true;
      this.clientId = +idParam;
      // Dispatch an action to load the client data for editing
      console.log('📤 Dispatching loadClient for ID:', this.clientId);
      this.store.dispatch(loadClient({ clientId: this.clientId }));

      // Subscribe to the store to patch the form when data is loaded
      this.selectedClient$ = this.store.select(selectSelectedClient);
      this.selectedClient$.subscribe((client) => {
        console.log('📥 Fetched client from store:', client);
        if (client) {
          if (!client.subSectorList) {
            console.warn('⚠️ client.subSectorList is undefined');
          } else if (client.subSectorList.length === 0) {
            console.warn('⚠️ client.subSectorList is empty');
          } else {
            console.log(
              '✅ subSectorList[0].sectorId:',
              client.subSectorList[0]?.sectorId
            );
          }

          this.patchForm(client);
        } else {
          console.warn('⚠️ No client data available yet');
        }
      });
    } else {
      console.warn('⚠️ No ID param found in route');
    }
  }
  buildForm(): void {
    this.addClientForm = this.fb.group({
      name: ['', Validators.required],
      nameAR: ['', [Validators.required, arabicOnlyValidator()]],
      businessActivity: ['', Validators.required],
      taxId: ['', [Validators.required, positiveNumberValidator()]],
      shortName: ['', Validators.required],
      sectorId: [[], Validators.required],
      subSectorIdList: [[], Validators.required],
      legalFormLawId: [null, Validators.required],
      legalFormId: [null, Validators.required],
      isStampDuty: [null, Validators.required],
      isIscore: [null, Validators.required],
      mainShare: [null, [Validators.required, Validators.min(0)]],
      establishedYear: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(19|20)\d{2}$/), // Valid years: 1900–2099
        ],
      ],
      website: [
        null,
        [
          Validators.pattern(
            /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/
          ),
          Validators.required,
        ],
      ],
      marketShare: [
        null,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      marketSize: [null, [Validators.min(0), Validators.required]],
      employeesNo: [null, [Validators.required, Validators.min(0)]],
    });

    console.log('Form initialized:', this.addClientForm);
  }
  patchForm(client: any): void {
    console.log('client', client);
    console.log('client.legalFormId:', client.legalFormId);
    console.log('client.legalFormLawId:', client.legalFormLawId);

    const sectorId =
      client.subSectorList && client.subSectorList.length > 0
        ? client.subSectorList[0].sectorId
        : null;
    console.log(
      '🟡 Extracted sectorId from client.subSectorList[0]:',
      sectorId
    );
    console.log('🧠 client.subSectorList:', client.subSectorList);

    if (sectorId) {
      // 1. Dispatch sector load action
      this.store.dispatch(loadSectorById({ id: sectorId }));
      console.log('🟢 Dispatched loadSectorById for ID:', sectorId);

      // 2. Patch sector object once available in store
      this.sectorById$ = this.store.select(selectSelectedSector);
      this.sectorById$.subscribe((sector) => {
        if (sector) {
          console.log('🟢 Not Patched sector object into form:', sector.id);

          this.addClientForm.patchValue({
            sectorId: sector.id,
          });

          console.log('🟢 Patched sector object into form:', sector.id);
        }
      });
    }
    // 3. Continue patching the rest of the form
    this.addClientForm.patchValue({
      name: client.name,
      nameAR: client.nameAR,
      businessActivity: client.businessActivity,
      taxId: client.taxId,
      shortName: client.shortName,
      sectorId: sectorId,
      subSectorIdList: client.subSectorList?.map((s: any) => s.id),
      legalFormLawId: client.legalFormLawId,
      legalFormId: client.legalFormId?.id || client.legalFormId,
      isStampDuty: client.isStampDuty,
      isIscore: client.isIscore,
      mainShare: client.mainShare,
      establishedYear: client.establishedYear,
      website: client.website,
      marketShare: client.marketShare,
      marketSize: client.marketSize,
      employeesNo: client.employeesNo,
    });
    console.log('sec', client.subSectorList);

    this.selectedSubSectorId =
      client.subSectorIdList?.id || client.subSectorIdList;
    this.selectedLegalFormId = client.legalFormId?.id || client.legalFormId;
    this.selectedLegalFormLawId =
      client.legalFormLawId?.id || client.legalFormLawId;

    console.log('🧾 Final patched form value:', this.addClientForm.value);
  }

  fetchLegalForms(): void {
    this.legalFormService.getAllLegalForms().subscribe(
      (response: any) => {
        this.dropdownlegalLawItems = [
          ...response.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            nameAR: item.nameAR,
          })),
        ];
      },
      (error) => {
        const apiErrorMessage =
          error?.error?.message || 'An unexpected error occurred';
        console.error('Error fetching legal forms:', apiErrorMessage);
      }
    );
  }
  fetchLegalFormLaws(): void {
    this.legalFormlawService.getAllLegalFormLaws().subscribe(
      (response: any) => {
        this.dropdownlegalFormLawItems = [
          ...response.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            nameAR: item.nameAR,
          })),
        ];
      },
      (error) => {
        const apiErrorMessage =
          error?.error?.message || 'An unexpected error occurred';
        console.error('Error fetching legal form laws:', apiErrorMessage);
      }
    );
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
    console.log('Form Value:', formValue);
    if (this.editMode) {
      const updatedClient = {
        ...formValue,
        id: this.clientId,
        clientTypeId: this.selectedClientType,
        subSectorIdList: formValue.subSectorIdList,
        legalFormLawId: formValue.legalFormLawId.id,
        legalFormId: formValue.legalFormId.id,
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
        clientTypeId: this.selectedClientType,
        sectorId: formValue.sectorId,
        subSectorIdList: formValue.subSectorIdList,
        isStampDuty: formValue.isStampDuty,
        legalFormLawId: formValue.legalFormLawId.id,
        legalFormId: formValue.legalFormId.id,
        mainShare: formValue.mainShare,
        marketShare: formValue.marketShare,
        establishedYear: formValue.establishedYear,
        website: formValue.website,
        employeesNo: formValue.employeesNo,
        marketSize: formValue.marketSize,
      };
      console.log('form', formValue);
      this.store.dispatch(createClient({ payload }));
    }
  }

  saveInfoIndividual() {
    console.log('Form Valid:', this.addClientForm.valid);
    console.log('Form Status:', this.addClientForm.status);
    console.log('Form Errors:', this.addClientForm.errors);
    console.log('Form Value:', this.addClientForm.value);

    Object.keys(this.addClientForm.controls).forEach((key) => {
      const control = this.addClientForm.get(key);
      console.log(
        `Control: ${key}, Valid: ${control?.valid}, Errors:`,
        control?.errors
      );
    });

    if (this.addClientForm.invalid) {
      this.addClientForm.markAllAsTouched();
      console.log(this.addClientForm.errors);
      return;
    }
    const formValue = this.addClientForm.value;
    console.log(formValue);

    const payload = {
      name: formValue.name,
      nameAR: formValue.nameAR,
      shortName: formValue.shortName,
      businessActivity: formValue.businessActivity,
      taxId: formValue.taxId,
      legalFormId: Number(formValue.legalFormId?.id),
      legalFormLawId: Number(formValue.legalFormLawId?.id),
      isStampDuty: formValue.isStampDuty,
      isIscore: formValue.isIscore,
      clientTypeId: this.selectedClientType,
      subSectorIdList: formValue.subSectorIdList.map((item: any) => item.id),
      mainShare: formValue.mainShare,
      establishedYear: formValue.establishedYear,
      website: formValue.website,
      marketShare: formValue.marketShare,
      marketSize: formValue.marketSize,
      employeesNo: formValue.employeesNo,
    };

    this.store.dispatch(createClient({ payload }));
  }
  onLegalFormLawSelectionChange(selectedLaw: any) {
    this.selectedLegalFormLawId = selectedLaw?.id || null;
    this.addClientForm.get('legalFormId')?.reset(); // reset legal form
  }
  onClientTypeChange(event: any) {
    if (event && event.value) {
      this.selectedClientType = event;
    } else {
      console.error('Invalid Company Type selected:', event);
    }
  }

  onSectorChanged(sectorId: number) {
    this.selectedSectorId = sectorId;
    console.log('✅ Sector changed in parent. New ID:', this.selectedSectorId);
    const subSectorArray = this.addClientForm.get('subSectorList') as FormArray;
    if (subSectorArray && subSectorArray.length) {
      while (subSectorArray.length !== 0) {
        subSectorArray.removeAt(0);
      }
    }
  }
}
