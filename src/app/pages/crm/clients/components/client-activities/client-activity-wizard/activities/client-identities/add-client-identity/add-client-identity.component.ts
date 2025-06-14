import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';
import { ClientIdentitiesFacade } from '../../../../../../store/client-identities/client-identities.facade';
import { ClientIdentity } from '../../../../../../store/client-identities/client-identity.model';
import { IdentificationTypesFacade } from '../../../../../../../../lookups/store/identification-types/identification-types.facade';

@Component({
  selector: 'app-add-client-identity',
  standalone: false,
  templateUrl: './add-client-identity.component.html',
  styleUrl: './add-client-identity.component.scss',
})
export class AddClientIdentityComponent implements OnInit, OnDestroy {
  // Flags driven by mode
  editMode = false;
  viewOnly = false;

  // Reactive form
  addClientIdentityForm!: FormGroup;

  // Lists and IDs
  mode!: 'add' | 'edit' | 'view';
  parentClientId!: number;
  recordId!: number;
  identificationTypes$!: any;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private clientIdentityFacade: ClientIdentitiesFacade,
    private identificationTypesFacade: IdentificationTypesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.identificationTypesFacade.loadAll();
    this.identificationTypes$ = this.identificationTypesFacade.all$;
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
      this.recordId = Number(this.route.snapshot.params['id']);
      this.clientIdentityFacade.loadOne(this.recordId);
    }

    // Build form with clientId
    this.addClientIdentityForm = this.fb.group({
      identificationTypeId: [null, Validators.required],
      identificationNumber: [null, Validators.required],
      isMain: [false],
    });

    this.addClientIdentityForm.patchValue({
      clientId: this.route.snapshot.queryParamMap.get('clientId'),
    });

    // Patch for edit/view mode
    if (this.editMode || this.viewOnly) {
      this.clientIdentityFacade.current$
        .pipe(
          takeUntil(this.destroy$),
          filter((rec) => !!rec)
        )
        .subscribe((rec) => {
          this.addClientIdentityForm.patchValue({
            id: rec.id,
            clientId: this.route.snapshot.queryParamMap.get('clientId'),
            identificationTypeId: rec.identificationTypeId,
            identificationNumber: rec.identificationNumber,
            isMain: rec.isMain,
          });
        });
    }
  }

  addOrEditClientIdentity() {
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
    if (this.addClientIdentityForm.invalid) {
      this.addClientIdentityForm.markAllAsTouched();
      return;
    }

    // 6) The actual payload
    const formValue = this.addClientIdentityForm.value;

    console.log('arwaa', formValue[0]);
    const data: Partial<ClientIdentity> = {
      clientId: Number(this.route.snapshot.paramMap.get('clientId')),
      identificationTypeId: formValue.identificationTypeId,
      identificationNumber: formValue.identificationNumber,
      isMain: formValue.isMain,
      isActive: true,
    };

    console.log(
      '🔄 Dispatching UPDATE id=',
      this.recordId,
      ' created  payload=',
      data
    );

    if (this.mode === 'add') {
      this.clientIdentityFacade.create(data);
    } else {
      const formValue = this.addClientIdentityForm.value;

      const updateData: ClientIdentity = {
        id: this.recordId,
        clientId: this.parentClientId,
        identificationTypeId: formValue.identificationTypeId,
        identificationNumber: formValue.identificationNumber,
        isMain: formValue.isMain,
        isActive: true,
      };

      console.log(
        '🔄 Dispatching UPDATE id=',
        this.recordId,
        ' UPDATED payload=',
        updateData
      );

      console.log('arwaaaaaaaa ', this.recordId);
      this.clientIdentityFacade.update(this.recordId, updateData);
    }
    console.log('route', this.route.snapshot);
    if (this.addClientIdentityForm.valid) {
      this.addClientIdentityForm.markAsPristine();
    }
    if (clientIdParam) {
      console.log('➡️ Navigating back with PATH param:', clientIdParam);
      this.router.navigate([
        '/crm/clients/view-client-identity',
        clientIdParam,
      ]);
    } else {
      console.error('❌ Cannot navigate back: clientId is missing!');
    }
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addClientIdentityForm.dirty;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
