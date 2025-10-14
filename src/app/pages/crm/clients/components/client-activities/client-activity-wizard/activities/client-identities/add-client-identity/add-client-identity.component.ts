import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, filter, of } from 'rxjs';
import { ClientIdentitiesFacade } from '../../../../../../store/client-identities/client-identities.facade';
import { ClientIdentity } from '../../../../../../store/client-identities/client-identity.model';
import { IdentificationTypesFacade } from '../../../../../../../../lookups/store/identification-types/identification-types.facade';
import { ClientIdentityBundle } from '../../../../../../../resolvers/client-identity-bundle.resolver';

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
    const bundle = this.route.snapshot.data['bundle'] as ClientIdentityBundle;

    this.mode = bundle.mode;
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    const parentClientId =
      bundle.clientIdFromQP ??
      Number(this.route.snapshot.paramMap.get('clientId'));
    this.parentClientId = parentClientId ?? undefined;

    this.identificationTypes$ = of(bundle.identificationTypes);

    this.addClientIdentityForm = this.fb.group({
      identificationTypeId: [null, Validators.required],
      identificationNumber: [null, Validators.required],
      isMain: [false],
    });

    if (this.mode === 'add' && this.parentClientId) {
      // (form has no clientId control; we’ll pass clientId in payload)
    }

    if ((this.editMode || this.viewOnly) && bundle.record) {
      const rec = bundle.record;
      this.addClientIdentityForm.patchValue({
        identificationTypeId: rec.identificationTypeId,
        identificationNumber: rec.identificationNumber,
        isMain: rec.isMain,
      });
      this.recordId = rec.id;
      if (this.viewOnly) this.addClientIdentityForm.disable();
    }
  }

  addOrEditClientIdentity() {
    if (this.viewOnly) return;
    if (this.addClientIdentityForm.invalid) {
      this.addClientIdentityForm.markAllAsTouched();
      return;
    }

    const v = this.addClientIdentityForm.value;

    if (this.mode === 'add') {
      const data: Partial<ClientIdentity> = {
        clientId: this.parentClientId,
        identificationTypeId: v.identificationTypeId,
        identificationNumber: v.identificationNumber,
        isMain: v.isMain,
        isActive: true,
      };
      this.clientIdentityFacade.create(data);
    } else {
      const update: ClientIdentity = {
        id: this.recordId,
        clientId: this.parentClientId,
        identificationTypeId: v.identificationTypeId,
        identificationNumber: v.identificationNumber,
        isMain: v.isMain,
        isActive: true,
      };
      this.clientIdentityFacade.update(this.recordId, update);
    }

    this.addClientIdentityForm.markAsPristine();
    this.router.navigate([
      '/crm/clients/view-client-identity',
      this.parentClientId,
    ]);
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
