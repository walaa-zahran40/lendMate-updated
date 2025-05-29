import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs';
import { CallsFacade } from '../../store/calls/calls.facade';
import { Call } from '../../store/calls/call.model';

@Component({
  selector: 'app-add-calls',
  standalone: false,
  templateUrl: './add-calls.component.html',
  styleUrl: './add-calls.component.scss',
})
export class AddCallsComponent implements OnInit {
  editMode = false;
  viewOnly = false;
  addCallsForm!: FormGroup;
  clientId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: CallsFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addCallsForm = this.fb.group({
      id: [null],
      clientId: [null, Validators.required],
      communicationFlowId: ['', Validators.required],
      communicationTypeId: [1, Validators.required],
      date: [new Date().toISOString(), Validators.required],
      topic: ['', Validators.required],
      details: [''],
      comments: [''],
      communicationOfficers: this.fb.array([]),
      communicationContactPersons: this.fb.array([]),
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.clientId = +id;
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) this.addCallsForm.disable();

        this.facade.loadById(this.clientId);
        this.facade.selected$
          .pipe(
            filter((call) => !!call),
            distinctUntilChanged((prev, curr) => prev.id === curr.id)
          )
          .subscribe((call) => {
            this.patchForm(call!);
          });
      } else {
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) this.addCallsForm.disable();
      }
    });
  }

  get communicationOfficers(): FormArray {
    return this.addCallsForm.get('communicationOfficers') as FormArray;
  }

  get communicationContactPersons(): FormArray {
    return this.addCallsForm.get('communicationContactPersons') as FormArray;
  }

  patchForm(call: Call) {
    this.addCallsForm.patchValue({
      id: call.id,
      clientId: call.clientId,
      communicationFlowId: call.communicationFlowId,
      communicationTypeId: call.communicationTypeId,
      date: call.date,
      topic: call.topic,
      details: call.details,
      comments: call.comments,
    });

    this.communicationOfficers.clear();
    call.communicationOfficers.forEach((officer) => {
      this.communicationOfficers.push(
        this.fb.group({
          officerId: [officer.officerId, Validators.required],
          isAttend: [officer.isAttend],
          isResponsible: [officer.isResponsible],
        })
      );
    });

    this.communicationContactPersons.clear();
    call.communicationContactPersons.forEach((person) => {
      this.communicationContactPersons.push(
        this.fb.group({
          contactPersonId: [person.contactPersonId, Validators.required],
          isAttend: [person.isAttend],
        })
      );
    });
  }

  addOfficer() {
    this.communicationOfficers.push(
      this.fb.group({
        officerId: [null, Validators.required],
        isAttend: [true],
        isResponsible: [false],
      })
    );
  }

  addContactPerson() {
    this.communicationContactPersons.push(
      this.fb.group({
        contactPersonId: [null, Validators.required],
        isAttend: [true],
      })
    );
  }

  addOrEditCall() {
    if (this.viewOnly || this.addCallsForm.invalid) {
      this.addCallsForm.markAllAsTouched();
      return;
    }

    const payload: Call = this.addCallsForm.getRawValue();

    if (this.editMode) {
      this.facade.update(payload.id, payload);
    } else {
      this.facade.create(payload);
    }

    this.router.navigate(['/communication/view-calls']);
  }
}
