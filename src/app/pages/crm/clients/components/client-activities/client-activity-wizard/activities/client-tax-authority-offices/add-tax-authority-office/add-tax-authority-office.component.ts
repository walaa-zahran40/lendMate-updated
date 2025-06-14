import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, filter } from 'rxjs';
import { TaxOffice } from '../../../../../../../../lookups/store/tax_offices/tax_office.model';
import { selectAllTaxOffices } from '../../../../../../../../lookups/store/tax_offices/tax_offices.selectors';
import { loadAll } from '../../../../../../store/client-identity-types/client-identity-types.actions';
import { ClientTaxOfficesFacade } from '../../../../../../store/client-tax-office/client-tax-office.facade';
import { ClientTaxOffice } from '../../../../../../store/client-tax-office/client-tax-office.model';

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
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    console.log('🟢 ngOnInit start');
    // 1️⃣ Read route parameters
    console.log(this.route.snapshot, 'route');
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

    this.addClientTaxAuthorityOfficesLookupsForm = this.fb.group({
      id: [null],
      clientId: [null, [Validators.required]],
      taxOfficeId: [null, [Validators.required]],
      expiryDate: [null, [Validators.required]],
      taxCardNumber: [null, [Validators.required]],
      isActive: [true],
    });
    console.log(
      '🛠️ Form initialized with defaults:',
      this.addClientTaxAuthorityOfficesLookupsForm.value
    );
    // 2️⃣ Dispatch actions to load lookup data
    console.log('🚀 Dispatching lookup loads');
    this.store.dispatch(loadAll({}));

    this.taxOfficesList$ = this.store.select(selectAllTaxOffices);

    // Patch for add mode
    if (this.mode === 'add') {
      this.addClientTaxAuthorityOfficesLookupsForm.patchValue({
        clientId: this.clientId,
      });
      console.log('✏️ Add mode → patched clientId:', this.clientId);
    }

    // Patch for edit/view mode
    if (this.editMode || this.viewOnly) {
      this.recordId = Number(this.route.snapshot.paramMap.get('id'));
      this.facade.loadOne(this.recordId);

      this.facade.current$
        .pipe(
          takeUntil(this.destroy$),
          filter((rec) => !!rec)
        )
        .subscribe((ct) => {
          console.log('red', ct);
          this.addClientTaxAuthorityOfficesLookupsForm.patchValue({
            id: ct?.id,
            clientId: this.clientId,
            expiryDate: new Date(ct.expiryDate),
            taxOfficeId: ct.taxOfficeId,
            taxCardNumber: ct.taxCardNumber,
            isActive: ct?.isActive,
          });
        });
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
