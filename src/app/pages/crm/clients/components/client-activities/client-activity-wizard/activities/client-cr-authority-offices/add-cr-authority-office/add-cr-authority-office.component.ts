import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthorityOffice } from '../../../../../../../../lookups/store/authority-offices/authority-office.model';
import { ClientCRAuthorityOfficesFacade } from '../../../../../../store/client-cr-authority-office/client-cr-authority-office.facade';
import { ClientCRAuthorityOffice } from '../../../../../../store/client-cr-authority-office/client-cr-authority-office.model';
import { ClientCRAuthorityOfficeBundle } from '../../../../../../resolvers/client-cr-authority-office-bundle.resolver';

@Component({
  selector: 'app-add-cr-authority-office',
  standalone: false,
  templateUrl: './add-cr-authority-office.component.html',
  styleUrl: './add-cr-authority-office.component.scss',
})
export class AddClientCRAuthorityOfficesComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addClientCRAuthorityOfficesLookupsForm!: FormGroup;
  retrivedId: any;
  authorityOfficesList$!: Observable<AuthorityOffice[]>;
  clientId: any;
  recordId!: number;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientCRAuthorityOfficesFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    const bundle = this.route.snapshot.data[
      'bundle'
    ] as ClientCRAuthorityOfficeBundle;
    this.mode = bundle.mode;
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';
    this.clientId =
      bundle.clientIdFromQP ??
      Number(this.route.snapshot.paramMap.get('clientId'));

    this.addClientCRAuthorityOfficesLookupsForm = this.fb.group({
      id: [null],
      clientId: [null, [Validators.required]],
      crAuthorityOfficeId: [null, [Validators.required]],
      expiryDate: [null, [Validators.required]],
      crNumber: [null, [Validators.required]],
      isActive: [true],
    });

    // pass lookups to the form component
    this.authorityOfficesList$ = new Observable((sub) =>
      sub.next(
        bundle.authorityOffices.map((office: any) => ({
          id: office.id,
          name: office.name,
          nameAR: office.nameAR ?? '',
          isActive: office.isActive ?? true,
        }))
      )
    );

    if (this.mode === 'add') {
      this.addClientCRAuthorityOfficesLookupsForm.patchValue({
        clientId: this.clientId,
      });
    } else if (bundle.record) {
      const r = bundle.record;
      this.recordId = r.id;
      this.addClientCRAuthorityOfficesLookupsForm.patchValue({
        id: r.id,
        clientId: this.clientId,
        crAuthorityOfficeId: r.crAuthorityOfficeId,
        crNumber: r.crNumber,
        expiryDate: r.expiryDate ? new Date(r.expiryDate) : null,
        isActive: r.isActive ?? true,
      });
      if (this.viewOnly) this.addClientCRAuthorityOfficesLookupsForm.disable();
    }
  }
  addOrEditClientCRAuthorityOffices() {
    const clientParamQP = this.route.snapshot.queryParamMap.get('clientId');

    console.log('💥 addClientCRAuthorityOffices() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log(
      '  form valid:',
      this.addClientCRAuthorityOfficesLookupsForm.valid
    );
    console.log(
      '  form touched:',
      this.addClientCRAuthorityOfficesLookupsForm.touched
    );
    console.log(
      '  form raw value:',
      this.addClientCRAuthorityOfficesLookupsForm.getRawValue()
    );

    if (this.addClientCRAuthorityOfficesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addClientCRAuthorityOfficesLookupsForm.markAllAsTouched();
      return;
    }

    this.addClientCRAuthorityOfficesLookupsForm.patchValue({
      clientId: clientParamQP,
    });

    const { crAuthorityOfficeId, crNumber, expiryDate, clientId, isActive } =
      this.addClientCRAuthorityOfficesLookupsForm.value;
    const payload: Partial<ClientCRAuthorityOffice> = {
      crAuthorityOfficeId,
      crNumber,
      expiryDate,
      clientId,
      isActive,
    };
    console.log('  → payload object:', payload);

    const data = this.addClientCRAuthorityOfficesLookupsForm
      .value as Partial<ClientCRAuthorityOffice>;
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
    if (this.addClientCRAuthorityOfficesLookupsForm.valid) {
      this.addClientCRAuthorityOfficesLookupsForm.markAsPristine();
    }

    if (clientParamQP) {
      console.log('➡️ Navigating back with PATH param:', clientParamQP);
      this.router.navigate([
        '/crm/clients/view-client-cr-authority-offices',
        clientParamQP,
      ]);
    } else if (clientParamQP) {
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        clientParamQP
      );
      this.router.navigate([
        `/crm/clients/view-client-cr-authority-offices/${clientParamQP}`,
      ]);
    } else {
      console.error('❌ Cannot navigate back: clientId is missing!');
    }
  }
  canDeactivate(): boolean {
    return !this.addClientCRAuthorityOfficesLookupsForm.dirty;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
