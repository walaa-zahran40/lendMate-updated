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

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private clientTypesFacade: ClientTypesFacade
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
      sectorId: this.fb.control<number[]>([], Validators.required),
      subSectorIdList: [[], Validators.required],
      name: ['', Validators.required],
      nameAR: ['', Validators.required],
      shortName: ['', Validators.required],
      businessActivity: ['', Validators.required],
      isIscore: [false, Validators.required],
      taxId: ['', Validators.required],
      clientTypeCode: ['', Validators.required],
      code: ['', Validators.required],
      employeesNo: [0, Validators.required],
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

  get sectorIdControl(): FormControl {
    return this.addClientForm.get('sectorId') as FormControl;
  }

  get subSectorList(): FormArray {
    return this.addClientForm.get('subSectorList') as FormArray;
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
      clientTypeId: this.selectedClientType,
      subSectorIdList: formValue.subSectorList.map((id: any) => id),
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
  }
}
