import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  createClient,
  updateSubSectorList,
} from '../../state/clients/clients.actions';
import {
  selectAllSectors,
  selectSelectedSubSectorIds,
} from '../../../../../shared/components/dropdowns/store/sector.selectors';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ClientTypesFacade } from '../../state/client-types/client-types.facade';
import { selectSubSectorList } from '../../state/clients/clients.selectors';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { positiveNumberValidator } from '../../../../../shared/validators/positive-only.validator';
import { LegalFormService } from '../../../../../shared/services/legal-form.service';
import { Sector } from '../../../../../shared/interfaces/sector.interface';
import { LegalFormLawService } from '../../../../../shared/services/legal-form-law.service';

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
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private clientTypesFacade: ClientTypesFacade,
    private legalFormService: LegalFormService,
    private legalFormlawService: LegalFormLawService
  ) {}

  ngOnInit() {
    this.clientTypesFacade.loadClientTypes();
    this.clientTypesFacade.types$.subscribe((types) => {
      this.dropdownClientTypeItems = [
        { id: null, name: 'Select a Client Type', nameAR: 'اختر نوع العميل' },
        ...types,
      ];
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
      this.addClientForm.setControl('subSectorList', formArray);
    });
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

  saveInfo() {
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
      taxId: String(formValue.taxId),
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
