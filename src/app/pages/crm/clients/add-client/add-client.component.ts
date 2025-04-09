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
} from '../state/clients/clients.actions';
import {
  selectAllSectors,
  selectSelectedSubSectorIds,
} from '../../../../../app/shared/components/dropdowns/store/sector.selectors';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ClientTypesFacade } from '../state/client-types/client-types.facade';
import { selectSubSectorList } from '../state/clients/clients.selectors';
import { arabicOnlyValidator } from '../../../../shared/validators/arabic-only.validator';
import { positiveNumberValidator } from '../../../../shared/validators/positive-only.validator';
import { LegalFormService } from '../../../../shared/services/legal-form.service';
import { Sector } from '../../../../shared/interfaces/sector.interface';
import { LegalFormLawService } from '../../../../shared/services/legal-form-law.service';

@Component({
  selector: 'app-add-client',
  standalone: false,
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit {
  addClientForm!: FormGroup;
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
      sectorId: this.fb.control<number[]>([], Validators.required),
      subSectorIdList: [[], Validators.required],
      isIscore: [false, Validators.required],
      clientTypeCode: ['', Validators.required],
      code: ['', Validators.required],
      employeesNo: [0, Validators.required],
      legalFormLawId: [null],
      legalFormId: [null],
      isStampDuty: [false],
      isActive: [true],
      subSectorList: this.fb.array<number>([]),
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
    const formValue = this.addClientForm.value;

    const payload = {
      name: formValue.name,
      nameAR: formValue.nameAR,
      shortName: formValue.shortName,
      businessActivity: formValue.businessActivity,
      isIscore: formValue.isIscore,
      taxId: formValue.taxId,
      legalFormId: formValue.legalFormId,
      legalFormLawId: formValue.legalFormLawId,
      isStampDuty: formValue.isStampDuty,
      clientTypeId: this.selectedClientType,
      subSectorIdList: formValue.subSectorIdList,
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

    // ✅ Optionally reset subSectorIdList too, if used for flat values
    this.addClientForm.patchValue({
      subSectorIdList: [],
    });
  }
}
