import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, filter, take } from 'rxjs';
import { ClientAddress } from '../../../../../crm/clients/store/client-addresses/client-address.model';
import { AgreementFilesFacade } from '../../../../store/agreement-files/agreement-files.facade';
import { DocType } from '../../../../../lookups/store/doc-types/doc-type.model';
import { DocTypesFacade } from '../../../../../lookups/store/doc-types/doc-types.facade';

@Component({
  selector: 'app-add-agreement-file',
  standalone: false,
  templateUrl: './add-agreement-file.component.html',
  styleUrl: './add-agreement-file.component.scss',
})
export class AddAgreementFileComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addAgreementFilesForm!: FormGroup;
  retrivedId: any;
  clientId: any;
  recordId!: number;
  private destroy$ = new Subject<void>();
  docTypes$!: Observable<DocType[]>;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: AgreementFilesFacade,
    private router: Router,
    private docTypesFacade: DocTypesFacade
  ) {}

  ngOnInit(): void {
    this.recordId = Number(this.route.snapshot.paramMap.get('id'));
    this.clientId = Number(this.route.snapshot.queryParams['clientId']);

    this.mode =
      (this.route.snapshot.queryParamMap.get('mode') as
        | 'add'
        | 'edit'
        | 'view') ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';
    console.log('🔍 Params:', {
      clientId: this.clientId,
      mode: this.mode,
      editMode: this.editMode,
      viewOnly: this.viewOnly,
    });
    //  Build the form
    this.docTypesFacade.loadAll();
    this.docTypes$ = this.docTypesFacade.all$;
    this.addAgreementFilesForm = this.fb.group({
      id: [null],
      agreementId: [this.recordId],
      fileId: [null, [Validators.required]],
      expiryDate: [null, [Validators.required]],
      documentTypeId: [null, [Validators.required]],
    });
    console.log(
      '🛠️ Form initialized with defaults:',
      this.addAgreementFilesForm.value
    );

    // 6️⃣ If add mode, seed clientId
    if (this.mode === 'add') {
      this.addAgreementFilesForm.patchValue({
        clientId: this.clientId,
      });
      console.log('✏️ Add mode → patched clientId:', this.clientId);
    }

    // 8️⃣ If editing or viewing, load & patch
    if (this.editMode || this.viewOnly) {
      console.log('edit ', this.editMode, 'route', this.route.snapshot);
      console.log('🔄 Loading existing record id=', this.recordId);
      this.facade.loadOne(this.recordId);

      this.facade.current$
        .pipe(
          filter((ct) => !!ct && ct.id === this.recordId),
          take(1)
        )
        .subscribe((ct) => {
          // patch form
          this.addAgreementFilesForm.patchValue({
            id: ct?.id,
          });
          console.log(
            '📝 Form after patchValue:',
            this.addAgreementFilesForm.value
          );

          if (this.viewOnly) {
            console.log('🔐 viewOnly → disabling form');
            this.addAgreementFilesForm.disable();
          }
        });
    } else if (this.viewOnly) {
      console.log('🔐 viewOnly (no id) → disabling form');
      this.addAgreementFilesForm.disable();
    }
  }

  addOrEditAgreementFiles() {
    const clientParamQP = this.route.snapshot.queryParamMap.get('clientId');

    console.log('💥 addClientAddresses() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addAgreementFilesForm.valid);
    console.log('  form touched:', this.addAgreementFilesForm.touched);
    console.log('  form raw value:', this.addAgreementFilesForm.getRawValue());

    if (this.addAgreementFilesForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addAgreementFilesForm.markAllAsTouched();
      return;
    }

    this.addAgreementFilesForm.patchValue({
      clientId: clientParamQP,
    });

    const { details, detailsAR, areaId, clientId, addressTypeId, isActive } =
      this.addAgreementFilesForm.value;
    const payload: Partial<ClientAddress> = {
      details,
      detailsAR,
      areaId,
      clientId,
      addressTypeId,
      isActive,
    };
    console.log('  → payload object:', payload);

    const data = this.addAgreementFilesForm.value as Partial<ClientAddress>;
    console.log('📦 Payload going to facade:', data);

    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(retrivedId):', routeId);

    if (this.mode === 'add') {
      console.log('➕ Dispatching CREATE');
      this.facade.create(payload);
    } else {
      console.log('✏️ Dispatching UPDATE id=', data.id);
      this.facade.update(data.id!, data);
    }
    if (this.addAgreementFilesForm.valid) {
      this.addAgreementFilesForm.markAsPristine();
    }

    if (clientParamQP) {
      console.log('➡️ Navigating back with PATH param:', clientParamQP);
      this.router.navigate([
        '/agreement/activities/wizard-agreement/view-agreement-files',
        clientParamQP,
      ]);
    } else if (clientParamQP) {
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        clientParamQP
      );
      this.router.navigate([
        `/agreement/activities/wizard-agreement/view-agreement-files/${clientParamQP}`,
      ]);
    } else {
      console.error('❌ Cannot navigate back: clientId is missing!');
    }
  }

  /** Called by the guard. */
  canDeactivate(): boolean {
    console.log('🛡️ canDeactivate called');
    return !this.addAgreementFilesForm.dirty;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
