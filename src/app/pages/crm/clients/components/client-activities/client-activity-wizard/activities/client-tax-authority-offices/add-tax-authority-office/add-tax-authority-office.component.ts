import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, filter } from 'rxjs';
import { TaxOffice } from '../../../../../../../../lookups/store/tax-offices/tax-office.model';
import { selectAllTaxOffices } from '../../../../../../../../lookups/store/tax-offices/tax-offices.selectors';
import { loadAll } from '../../../../../../store/client-identity-types/client-identity-types.actions';
import { ClientTaxOfficesFacade } from '../../../../../../store/client-tax-office/client-tax-offices.facade';
import { ClientTaxOffice } from '../../../../../../store/client-tax-office/client-tax-office.model';
import { TaxOfficesFacade } from '../../../../../../../../lookups/store/tax-offices/tax-offices.facade';
import { ClientTaxOfficeBundle } from '../../../../../../../resolvers/client-tax-office-bundle.resolver';

@Component({
  selector: 'app-add-tax-authority-office',
  standalone: false,
  templateUrl: './add-tax-authority-office.component.html',
  styleUrl: './add-tax-authority-office.component.scss',
})
export class AddClientTaxAuthorityOfficesComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addClientTaxAuthorityOfficesLookupsForm!: FormGroup;
  retrivedId: any;
  taxOfficesList$!: Observable<TaxOffice[]>;
  clientId: any;
  recordId!: number;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientTaxOfficesFacade,
    private taxOfficesFacade: TaxOfficesFacade,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    const bundle = this.route.snapshot.data['bundle'] as ClientTaxOfficeBundle;

    this.mode = bundle.mode;
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    // clientId: query param first, else optional :clientId path
    this.clientId =
      bundle.clientIdFromQP ??
      Number(this.route.snapshot.paramMap.get('clientId'));

    this.addClientTaxAuthorityOfficesLookupsForm = this.fb.group({
      id: [null],
      clientId: [null, [Validators.required]],
      taxOfficeId: [null, [Validators.required]],
      expiryDate: [null, [Validators.required]],
      taxCardNumber: [null, [Validators.required]],
      isActive: [true],
    });

    // expose resolver lookup directly to the template
    this.taxOfficesList$ = new Observable((sub) =>
      sub.next(
        bundle.taxOffices.map((office: any) => ({
          id: office.id,
          name: office.name,
          nameAR: office.nameAR ?? '',
          isActive: office.isActive ?? true,
        }))
      )
    );

    if (this.mode === 'add') {
      this.addClientTaxAuthorityOfficesLookupsForm.patchValue({
        clientId: this.clientId,
      });
    } else if (bundle.record) {
      const r = bundle.record;
      this.recordId = r.id;
      this.addClientTaxAuthorityOfficesLookupsForm.patchValue({
        id: r.id,
        clientId: this.clientId,
        taxOfficeId: r.taxOfficeId,
        taxCardNumber: r.taxCardNumber,
        expiryDate: r.expiryDate ? new Date(r.expiryDate) : null,
        isActive: r.isActive ?? true,
      });
      if (this.viewOnly) this.addClientTaxAuthorityOfficesLookupsForm.disable();
    }
  }

  addOrEditClientTaxAuthorityOffices() {
    const clientParamQP = this.route.snapshot.queryParamMap.get('clientId');

    console.log('💥 addClientTaxAuthorityOffices() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log(
      '  form valid:',
      this.addClientTaxAuthorityOfficesLookupsForm.valid
    );
    console.log(
      '  form touched:',
      this.addClientTaxAuthorityOfficesLookupsForm.touched
    );
    console.log(
      '  form raw value:',
      this.addClientTaxAuthorityOfficesLookupsForm.getRawValue()
    );

    if (this.addClientTaxAuthorityOfficesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addClientTaxAuthorityOfficesLookupsForm.markAllAsTouched();
      return;
    }

    this.addClientTaxAuthorityOfficesLookupsForm.patchValue({
      clientId: clientParamQP,
    });

    const { taxOfficeId, taxCardNumber, expiryDate, clientId, isActive } =
      this.addClientTaxAuthorityOfficesLookupsForm.value;
    const payload: Partial<ClientTaxOffice> = {
      taxOfficeId,
      taxCardNumber,
      expiryDate,
      clientId,
      isActive,
    };
    console.log('  → payload object:', payload);

    const data = this.addClientTaxAuthorityOfficesLookupsForm
      .value as Partial<ClientTaxOffice>;
    console.log('📦 Payload going to facade:', data);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(retrivedId):', routeId);

    // 7) Create vs. update
    if (this.mode === 'add') {
      console.log('➕ Dispatching TaxEATE');
      this.facade.create(payload);
    } else {
      console.log('✏️ Dispatching UPDATE id=', data.id);
      this.facade.update(data.id!, data);
    }
    if (this.addClientTaxAuthorityOfficesLookupsForm.valid) {
      this.addClientTaxAuthorityOfficesLookupsForm.markAsPristine();
    }

    if (clientParamQP) {
      console.log('➡️ Navigating back with PATH param:', clientParamQP);
      this.router.navigate([
        '/crm/clients/view-client-tax-authority-offices',
        clientParamQP,
      ]);
    } else if (clientParamQP) {
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        clientParamQP
      );
      this.router.navigate([
        `/crm/clients/view-client-tax-authority-offices/${clientParamQP}`,
      ]);
    } else {
      console.error('❌ Cannot navigate back: clientId is missing!');
    }
    // console.log('🧭 Navigating away to view-client-addresses');
    // this.router.navigate(['/organizations/view-client-addresses']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addClientTaxAuthorityOfficesLookupsForm.dirty;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
