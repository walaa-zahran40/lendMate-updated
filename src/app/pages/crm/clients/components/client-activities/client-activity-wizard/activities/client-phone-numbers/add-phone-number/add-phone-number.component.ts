import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, of } from 'rxjs';
import { ClientPhoneNumbersFacade } from '../../../../../../store/client-phone-numbers/client-phone-numbers.facade';
import { ClientPhoneNumberBundle } from '../../../../../../../resolvers/client-phone-number-bundle.resolver';

@Component({
  selector: 'app-add-phone-number',
  standalone: false,
  templateUrl: './add-phone-number.component.html',
  styleUrl: './add-phone-number.component.scss',
})
export class AddPhoneNumberComponent implements OnInit, OnDestroy {
  editMode = false;
  viewOnly = false;

  addClientPhoneNumberForm!: FormGroup;

  mode!: 'add' | 'edit' | 'view';
  parentClientId!: any;
  recordId!: any;
  phoneTypes$!: any;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private clientPhoneNumberFacade: ClientPhoneNumbersFacade,
    private router: Router
  ) {}

  ngOnInit() {
    const bundle = this.route.snapshot.data[
      'bundle'
    ] as ClientPhoneNumberBundle;

    this.mode = bundle.mode;
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    const parentClientId =
      bundle.clientIdFromQP ??
      Number(this.route.snapshot.paramMap.get('clientId'));
    this.parentClientId = parentClientId ?? undefined;

    this.addClientPhoneNumberForm = this.fb.group({
      id: [null],
      clientId: [null, Validators.required],
      createClientPhoneNumbers: this.fb.array([this.createPhoneNumberGroup()]),
    });

    this.phoneTypes$ = of(bundle.phoneTypes);

    if (this.mode === 'add' && this.parentClientId) {
      this.addClientPhoneNumberForm.patchValue({
        clientId: this.parentClientId,
      });
      this.createClientPhoneNumbers.controls.forEach((c) =>
        c.patchValue({ clientId: this.parentClientId })
      );
    }

    if ((this.editMode || this.viewOnly) && bundle.record) {
      const rec = bundle.record;
      const groups = [
        this.fb.group({
          clientId: [this.parentClientId, Validators.required],
          phoneTypeId: [rec.phoneTypeId, Validators.required],
          phoneNumber: [rec.phoneNumber, Validators.required],
        }),
      ];

      this.addClientPhoneNumberForm.setControl(
        'createClientPhoneNumbers',
        this.fb.array(groups)
      );
      this.addClientPhoneNumberForm.patchValue({
        id: rec.id,
        clientId: this.parentClientId,
      });
      if (this.viewOnly) this.addClientPhoneNumberForm.disable();
    }
  }

  createPhoneNumberGroup(): FormGroup {
    const parentId = Number(this.route.snapshot.paramMap.get('clientId'));
    return this.fb.group({
      clientId: [parentId, Validators.required],
      phoneTypeId: [null, Validators.required],
      phoneNumber: [null, Validators.required],
    });
  }

  get createClientPhoneNumbers(): FormArray {
    return this.addClientPhoneNumberForm.get(
      'createClientPhoneNumbers'
    ) as FormArray;
  }

  addPhoneNumber() {
    if (!this.viewOnly) {
      this.createClientPhoneNumbers.push(this.createPhoneNumberGroup());
    }
  }

  removePhoneNumber(index: number) {
    const fa = this.createClientPhoneNumbers;
    if (fa.length > 1 && !this.viewOnly) {
      fa.removeAt(index);
      this.addClientPhoneNumberForm.markAsDirty();
      this.addClientPhoneNumberForm.updateValueAndValidity();
    }
  }

  addOrEditClientPhoneNumber() {
    if (this.viewOnly) return;

    if (this.addClientPhoneNumberForm.invalid) {
      this.addClientPhoneNumberForm.markAllAsTouched();
      return;
    }

    const phoneNumbers = this.createClientPhoneNumbers.value as Array<{
      clientId: any;
      phoneTypeId: number;
      phoneNumber: string;
    }>;

    if (this.mode === 'add') {
      this.clientPhoneNumberFacade.create({
        createClientPhoneNumbers: phoneNumbers, // ← no extra [ ]
        isActive: true,
      });
    } else {
      // if your API expects a single object when editing:
      const [first] = phoneNumbers;
      console.log('[AddPhoneNumber] update payload:', this.route.snapshot);
      const clientIdParam = this.route.snapshot.queryParamMap.get('clientId');
      this.recordId = +this.route.snapshot.paramMap.get('clientId')!;
      const updatePayload = {
        id: this.recordId,
        ...first,
        clientId: clientIdParam ? +clientIdParam : undefined, // ensure number or undefined
      };
      this.clientPhoneNumberFacade.update(this.recordId, updatePayload);
    }
    const clientIdParam = this.route.snapshot.queryParamMap.get('clientId');

    // Reset form state and go back
    this.addClientPhoneNumberForm.markAsPristine();
    this.router.navigate(['/crm/clients/view-phone-numbers', clientIdParam]);
  }

  canDeactivate(): boolean {
    return !this.addClientPhoneNumberForm.dirty;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
