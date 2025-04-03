// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
// import { Store } from '@ngrx/store';
// import { createClient } from '../state/clients/clients.actions';
 
// @Component({
//   selector: 'app-add-client',
//   standalone: false,
//   templateUrl: './add-client.component.html',
//   styleUrls: ['./add-client.component.scss'],
// })
// export class AddClientComponent implements OnInit {
//   addClientForm!: FormGroup;
//   addClient = true;

//   constructor(private fb: FormBuilder, private store: Store) {}

//   ngOnInit() {
//     this.addClientForm = this.fb.group({
//       id: [null],
//       name: ['', Validators.required],
//       nameAR: ['', Validators.required],
//       employeesNo: [0, Validators.required],
//       businessActivity: ['', Validators.required],
//       code: ['', Validators.required],
//       isIscore: [false, Validators.required],
//       clientTypeCode: ['', Validators.required],
//       shortName: ['', Validators.required],
//       taxId: ['', Validators.required],
//       isActive: [true],
//       subSectorList: this.fb.array([]),
//     });

//     // Add one subSector initially (optional)
//     this.addSubSector();
//   }

//   get subSectorList(): FormArray {
//     return this.addClientForm.get('subSectorList') as FormArray;
//   }

//   addSubSector(subSector: any = null) {
//     const group = this.fb.group({
//       id: [subSector?.id || null],
//       name: [subSector?.name || '', Validators.required],
//       nameAR: [subSector?.nameAR || '', Validators.required],
//       sectorId: [subSector?.sectorId || null, Validators.required],
//     });
//     this.subSectorList.push(group);
//   }

//   saveInfo() {
//     const formValue = this.addClientForm.value;
  
//     const payload = {
//       name: formValue.name,
//       nameAR: formValue.nameAR,
//       shortName: formValue.shortName,
//       businessActivity: formValue.businessActivity,
//       isIscore: formValue.isIscore,
//       taxId: formValue.taxId,
//       clientTypeId: formValue.clientTypeCode, // assuming clientTypeCode = clientTypeId
//       subSectorIdList: formValue.subSectorList.map((s: any) => s.sectorId)
//     };
  
//     this.store.dispatch(createClient({ payload }));
//   }
  
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createClient } from '../state/clients/clients.actions';
import { selectAllSectors, selectSelectedSubSectorIds } from '../../../../../app/shared/components/dropdowns/store/sector.selectors';
import { Observable } from 'rxjs';

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


  constructor(private fb: FormBuilder, private store: Store) {
    this.selectedSubSectorIds$ = this.store.select(selectSelectedSubSectorIds);
  }

  ngOnInit() {
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
      clientTypeId: formValue.clientTypeCode,
      subSectorIdList: formValue.subSectorList.map((s: any) => s.sectorId),
    };
    this.store.dispatch(createClient({ payload }));
  }
  onSectorChanged(sectorId: number) {
    this.selectedSectorId = sectorId;
    console.log('Selected sectorId:', sectorId);
  }
}
