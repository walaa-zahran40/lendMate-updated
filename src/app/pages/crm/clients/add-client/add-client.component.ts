import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createClient } from '../state/clients/clients.actions';
 
@Component({
  selector: 'app-add-client',
  standalone: false,
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit {
  addClientForm!: FormGroup;
  addClient = true;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.addClientForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      nameAR: ['', Validators.required],
      employeesNo: [0, Validators.required],
      businessActivity: ['', Validators.required],
      code: ['', Validators.required],
      isIscore: [false, Validators.required],
      clientTypeCode: ['', Validators.required],
      shortName: ['', Validators.required],
      taxId: ['', Validators.required],
      isActive: [true],
      subSectorList: this.fb.array([]),
    });

    // Add one subSector initially (optional)
    this.addSubSector();
  }

  get subSectorList(): FormArray {
    return this.addClientForm.get('subSectorList') as FormArray;
  }

  addSubSector(subSector: any = null) {
    const group = this.fb.group({
      id: [subSector?.id || null],
      name: [subSector?.name || '', Validators.required],
      nameAR: [subSector?.nameAR || '', Validators.required],
      sectorId: [subSector?.sectorId || null, Validators.required],
    });
    this.subSectorList.push(group);
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
      clientTypeId: formValue.clientTypeCode, // assuming clientTypeCode = clientTypeId
      subSectorIdList: formValue.subSectorList.map((s: any) => s.sectorId)
    };
  
    this.store.dispatch(createClient({ payload }));
  }
  
}
