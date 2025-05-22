import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  // Flags driven by mode
  editMode = false;
  viewOnly = false;

  // Reactive form
  addClientPhoneNumberForm!: FormGroup;

  // Lists and IDs
  mode!: 'add' | 'edit' | 'view';
  parentClientId!: number;
  recordId!: number;
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
    this.phoneTypesFacade.loadAll();
    this.phoneTypes$ = this.phoneTypesFacade.all$;
    // Read mode and set flags
    this.mode = (this.route.snapshot.queryParamMap.get('mode') as any) ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    // Read IDs
    this.parentClientId = Number(
      this.route.snapshot.queryParamMap.get('clientId')
    );
    if (this.editMode || this.viewOnly) {
      console.log('route add', this.route.snapshot);
      this.recordId = Number(this.route.snapshot.params['clientId']);
      this.clientPhoneNumberFacade.loadOne(this.recordId);
    }

    // Build form with clientId
    this.addClientPhoneNumberForm = this.fb.group({
      phoneTypeId: [null, Validators.required],
      phoneNumber: [null, Validators.required],
    });

    this.addClientPhoneNumberForm.patchValue({
      clientId: this.route.snapshot.queryParamMap.get('clientId'),
    });

    // Patch for edit/view mode
    if (this.editMode || this.viewOnly) {
      this.clientPhoneNumberFacade.current$
        .pipe(
          takeUntil(this.destroy$),
          filter((rec) => !!rec)
        )
        .subscribe((rec) => {
          this.addClientPhoneNumberForm.patchValue({
            id: rec.id,
            clientId: this.route.snapshot.queryParamMap.get('clientId'),
            phoneTypeId: rec.phoneTypeId,
            phoneNumber: rec.phoneNumber,
          });
        });
    }
  }

  addOrEditClientPhoneNumber() {
    console.log('🛣️ Route snapshot:', this.route.snapshot);
    const clientIdParam = this.route.snapshot.queryParamMap.get('clientId');
    console.log(`🔍 QueryParams → clientId = ${clientIdParam}`);
    console.log(
      `⚙️ mode = ${this.mode}, editMode = ${this.editMode}, viewOnly = ${this.viewOnly}`
    );

    // 4) Early return in view-only
    if (this.viewOnly) {
      console.warn('🚫 viewOnly mode — aborting submit');
      return;
    }

    // 5) Form validity
    if (this.addClientPhoneNumberForm.invalid) {
      this.addClientPhoneNumberForm.markAllAsTouched();
      return;
    }

    // 6) The actual payload
    const formValue = this.addClientPhoneNumberForm.value;

    console.log('arwaa', formValue[0]);
    const data: Partial<ClientPhoneNumber> = {
      clientId: Number(this.route.snapshot.paramMap.get('clientId')),
      phoneTypeId: formValue.phoneTypeId,
      phoneNumber: formValue.phoneNumber,
      isActive: true,
    };

    console.log(
      '🔄 Dispatching UPDATE id=',
      this.recordId,
      ' created  payload=',
      data
    );

    if (this.mode === 'add') {
      this.clientPhoneNumberFacade.create(data);
    } else {
      const formValue = this.addClientPhoneNumberForm.value;

      const updateData: ClientPhoneNumber = {
        id: this.recordId,
        clientId: this.parentClientId,
        phoneTypeId: formValue.phoneTypeId,
        phoneNumber: formValue.phoneNumber,
        isActive: true,
      };

      console.log(
        '🔄 Dispatching UPDATE id=',
        this.recordId,
        ' UPDATED payload=',
        updateData
      );

      this.clientPhoneNumberFacade.update(this.recordId, updateData);
    }
    console.log('route', this.route.snapshot);

    if (clientIdParam) {
      console.log('➡️ Navigating back with PATH param:', clientIdParam);
      this.router.navigate(['/crm/clients/view-phone-numbers', clientIdParam]);
    } else {
      console.error('❌ Cannot navigate back: clientId is missing!');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
