import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAllSectors } from '../../../../../shared/components/dropdowns/store/sector.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { positiveNumberValidator } from '../../../../../shared/validators/positive-only.validator';
import { LegalFormService } from '../../../../../shared/services/legal-form.service';
import { Sector } from '../../../../../shared/interfaces/sector.interface';
import { LegalFormLawService } from '../../../../../shared/services/legal-form-law.service';
import { Observable } from 'rxjs';
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
  selectedClientType = null;
  dropdownClientTypeItems: any[] = [];
  subSectorList$ = this.store.select(selectSubSectorList);
  dropdownlegalLawItems: Sector[] = [];
  dropdownlegalFormLawItems: Sector[] = [];
  selectedClient$!: Observable<any>;
  public editMode: boolean = false;
  public clientId: number | null = null;
  selectedLegalFormLawId: number | null = null;
  selectedLegalFormId: any;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private clientTypesFacade: ClientTypesFacade,
    private legalFormService: LegalFormService,
    private legalFormlawService: LegalFormLawService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.clientTypesFacade.loadClientTypes();
    this.clientTypesFacade.types$.subscribe((types) => {
      this.dropdownClientTypeItems = [...types];
      this.selectedClientType = this.dropdownClientTypeItems[1]?.id;
    });

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

    // Dynamically update the form control from NgRx state
    this.subSectorList$.subscribe((ids) => {
      const formArray = this.fb.array([]);
      ids.forEach((id) => formArray.push(this.fb.control(id)));
      this.addClientForm.setControl('subSectorIdList', formArray);
    });
    // Initialize your form here (or call a separate method)
    this.buildForm();
    // Check for an 'id' parameter to determine if we are in edit mode
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editMode = true;
      this.clientId = +idParam;
      // Dispatch an action to load the client data for editing
      this.store.dispatch(loadClient({ clientId: this.clientId }));

      // Subscribe to the store to patch the form when data is loaded
      this.selectedClient$ = this.store.select(selectSelectedClient);
      this.selectedClient$.subscribe((client) => {
        if (client) {
          this.patchForm(client);
        }
      });
    }
  }
  buildForm(): void {
    this.addClientForm = this.fb.group({
      name: ['', Validators.required],
      nameAR: ['', Validators.required],
      businessActivity: ['', Validators.required],
      taxId: ['', Validators.required],
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
        [Validators.required, Validators.pattern(/^(19|20)\d{2}$/)],
      ],
      website: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/
          ),
        ],
      ],
      marketShare: [null, Validators.required],
      marketSize: [null, Validators.required],
      employeesNo: [null, Validators.required],
    });
  }
  patchForm(client: any): void {
    console.log('client.subSectorIdList:', client.subSectorIdList);
    console.log('client.sectorId:', client.sectorId);
    console.log('client.legalFormId:', client.legalFormId);
    console.log('client.legalFormLawId:', client.legalFormLawId);
    // Patch the form with client data; adjust the mapping according to your Client interface
    this.addClientForm.patchValue({
      name: client.name,
      nameAR: client.nameAR,
      businessActivity: client.businessActivity,
      taxId: client.taxId,
      shortName: client.shortName,
      // sectorId: client.sectorId,
      subSectorIdList: client.subSectorIdList,
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
    this.selectedLegalFormId = client.legalFormId?.id || client.legalFormId;
    this.selectedLegalFormLawId =
      client.legalFormLawId?.id || client.legalFormLawId;
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

    if (this.editMode) {
      const updatedClient = {
        ...formValue,
        id: this.clientId,
        clientTypeId: this.selectedClientType,
        subSectorIdList: formValue.subSectorIdList.map((sub: any) => sub.id),
        legalFormLawId: formValue.legalFormLawId.id,
        legalFormId: formValue.legalFormId.id,
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
        subSectorIdList: formValue.subSectorIdList.map((sub: any) => sub.id),
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
      subSectorIdList: formValue.subSectorIdList.map(
        (item: any) => item.sectorId
      ),
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
    const subSectorArray = this.addClientForm.get('subSectorList') as FormArray;
    if (subSectorArray && subSectorArray.length) {
      while (subSectorArray.length !== 0) {
        subSectorArray.removeAt(0);
      }
    }
  }
}
