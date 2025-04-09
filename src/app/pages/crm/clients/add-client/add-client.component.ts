import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { createClient } from '../state/clients/clients.actions';
import {
  selectAllSectors,
  selectSelectedSubSectorIds,
} from '../../../../../app/shared/components/dropdowns/store/sector.selectors';
import { delay, Observable, of } from 'rxjs';
import { TypeService } from '../../../../shared/services/types.service';
import { Router } from '@angular/router';
interface Sector {
  loading?: boolean;
  nameAR?: any;
  subSectors?: any;
  selected?: any;
  id?: any;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
  isActive?: boolean;
}
@Component({
  selector: 'app-add-client',
  standalone: false,
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit {
  addClientForm!: FormGroup;
  addClient = true;
  selectedSubSectorIds$: Observable<number[]>;
  selectedSectorId: number = 0;
  allSectors: any[] = [];
  sectorsList: any[] = [];
  selectedClientType = null;
  dropdownClientTypeItems: Sector[] = [{}];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private typeService: TypeService,
    private router: Router
  ) {
    this.selectedSubSectorIds$ = this.store.select(selectSelectedSubSectorIds);
  }

  ngOnInit() {
    this.fetchClientTypes();

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
    this.selectedSubSectorIds$.subscribe((ids) => {
      this.setSubSectorList(ids);
    });
  }
  get sectorIdControl(): FormControl {
    return this.addClientForm.get('sectorId') as FormControl;
  }
  get subSectorList(): FormArray {
    return this.addClientForm.get('subSectorList') as FormArray;
  }

  setSubSectorList(ids: number[]) {
    const formArray = this.fb.array([]);
    ids.forEach((id) => {
      formArray.push(this.fb.control(id));
    });
    this.addClientForm.setControl('subSectorList', formArray);
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
      subSectorIdList: formValue.subSectorList.map((s: any) => s.id),
    };
    this.store.dispatch(createClient({ payload }));
    of(null)
      .pipe(delay(500))
      .subscribe(() => {
        this.router.navigate(['/crm/clients/view-clients']);
      });
  }
  onClientTypeChange(event: any) {
    if (event && event.value) {
      this.selectedClientType = event;
      // this.centralBankDetails.companyTypeId = event;
      // this.companyType = event;
    } else {
      console.error('Invalid Company Type selected:', event);
    }
  }
  onSectorChanged(sectorId: number) {
    this.selectedSectorId = sectorId;
    console.log('Selected sectorId:', sectorId);
  }
  fetchClientTypes(): void {
    this.typeService.getAllTypes().subscribe(
      (response: any) => {
        this.dropdownClientTypeItems = [
          { id: null, name: 'Select a Client Type', nameAR: 'اختر نوع العميل' },
          ...response.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            nameAR: item.nameAR,
          })),
        ];
        this.selectedClientType = this.dropdownClientTypeItems[1].id;
      },
      (error) => {
        const apiErrorMessage =
          error?.error?.message || 'An unexpected error occurred';
        console.error('Error fetching client types:', error);
      }
    );
  }
}
