import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';
import { PhoneTypesFacade } from '../../../../../../../../lookups/store/phone-types/phone-types.facade';
import { ClientPhoneNumber } from '../../../../../../store/client-phone-numbers/client-phone-number.model';
import { ClientPhoneNumbersFacade } from '../../../../../../store/client-phone-numbers/client-phone-numbers.facade';

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
    private phoneTypesFacade: PhoneTypesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('[AddPhoneNumber] ngOnInit', this.route.snapshot);

    // Initialize form
    this.addClientPhoneNumberForm = this.fb.group({
      id: [null],
      clientId: [null, Validators.required],
      createClientPhoneNumbers: this.fb.array([this.createPhoneNumberGroup()]),
    });

    // Load lookup data
    this.phoneTypesFacade.loadAll();
    this.phoneTypes$ = this.phoneTypesFacade.all$;

    // Determine mode and clientId
    this.mode = (this.route.snapshot.queryParamMap.get('mode') as any) ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';
    const clientParam = this.route.snapshot.queryParamMap.get('clientId');
    const clientIdParam = this.route.snapshot.paramMap.get('clientId');
    this.parentClientId = clientParam ? clientParam : clientIdParam;
    const q = this.route.snapshot.queryParamMap;
    const p = this.route.snapshot.paramMap;

    this.parentClientId = +q.get('clientId')!;
    this.recordId = +p.get('clientId')!;

    if (this.mode === 'edit' || this.mode === 'view') {
      console.log('[AddPhoneNumber] ngOnInit → recordId =', this.mode);
      this.clientPhoneNumberFacade.loadOne(this.recordId);
      if (this.mode === 'view') this.addClientPhoneNumberForm.disable();

      this.clientPhoneNumberFacade.current$
        .pipe(
          takeUntil(this.destroy$),
          filter((rec) => !!rec)
        )
        .subscribe((rec) => {
          console.log('[AddPhoneNumber] loaded rec:', rec);
          // rec.phoneNumber is a single string; wrap into array
          const numbers = rec.phoneNumber ? [rec.phoneNumber] : [];
          // rebuild form array
          const groups = numbers.map((num) =>
            this.fb.group({
              phoneTypeId: [rec.phoneTypeId, Validators.required],
              phoneNumber: [num, Validators.required],
            })
          );
          const array = this.fb.array(
            groups.length ? groups : [this.createPhoneNumberGroup()]
          );
          this.addClientPhoneNumberForm.setControl(
            'createClientPhoneNumbers',
            array
          );

          // patch scalars
          this.addClientPhoneNumberForm.patchValue({
            id: rec.id,
            clientId: this.parentClientId,
          });
        });
    } else {
      this.addClientPhoneNumberForm.patchValue({
        clientId: this.parentClientId,
      });
    }
  }

  createPhoneNumberGroup(): FormGroup {
    this.parentClientId = this.route.snapshot.paramMap.get('clientId');
    return this.fb.group({
      clientId: [this.parentClientId, Validators.required], // ← use parentClientId
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
    if (this.createClientPhoneNumbers.length > 1 && !this.viewOnly) {
      this.createClientPhoneNumbers.removeAt(index);
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
