import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, filter } from 'rxjs';
import { CompanyType } from '../../../../../../../../lookups/store/company-types/company-type.model';
import { selectAllCompanyTypes } from '../../../../../../../../lookups/store/company-types/company-types.selectors';
import { SMEClientCode } from '../../../../../../../../lookups/store/sme-client-codes/sme-client-codes.model';
import { selectAllSMEClientCodes } from '../../../../../../../../lookups/store/sme-client-codes/sme-client-codes.selectors';
import { ClientCentralBankInfoFacade } from '../../../../../../store/client-central-bank-info/client-central-bank.facade';
import { ClientCentralBankInfo } from '../../../../../../store/client-central-bank-info/client-central-bank.model';
import { loadAll as loadSMEClientCodes } from '../../../../../../../../lookups/store/sme-client-codes/sme-client-codes.actions';
import { loadAll as loadCompanyTypes } from '../../../../../../../../lookups/store/address-types/address-types.actions';

@Component({
  selector: 'app-add-central-bank-info',
  standalone: false,
  templateUrl: './add-central-bank-info.component.html',
  styleUrl: './add-central-bank-info.component.scss',
})
export class AddClientCentralBankInfoComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addClientCentralBankInfoForm!: FormGroup;
  retrivedId: any;
  companyTypesList$!: Observable<CompanyType[]>;
  smeClientCodesList$!: Observable<SMEClientCode[]>;
  clientId: any;
  recordId!: number;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientCentralBankInfoFacade,
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

    this.addClientCentralBankInfoForm = this.fb.group({
      id: [null],
      clientId: [null, [Validators.required]],
      companyTypeId: [null, [Validators.required]],
      smeClientCodeId: [null, [Validators.required]],
      cbeCustomerCode: [null, [Validators.required]],
      balanceSheetdate: [null, [Validators.required]],
      iScoreSectore: [null, [Validators.required]],
      capital: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      isActive: [true],
    });
    console.log(
      '🛠️ Form initialized with defaults:',
      this.addClientCentralBankInfoForm.value
    );
    // 2️⃣ Dispatch actions to load lookup data
    console.log('🚀 Dispatching lookup loads');
    this.store.dispatch(loadCompanyTypes({}));
    this.store.dispatch(loadSMEClientCodes({}));
    // 3️⃣ Grab lookup streams
    this.companyTypesList$ = this.store.select(selectAllCompanyTypes);
    this.smeClientCodesList$ = this.store.select(selectAllSMEClientCodes);

    // Patch for add mode
    if (this.mode === 'add') {
      this.addClientCentralBankInfoForm.patchValue({
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
          this.addClientCentralBankInfoForm.patchValue({
            id: ct?.id,
            clientId: this.clientId,
            capital: ct?.capital,
            iScoreSectore: ct?.iScoreSectore,
            companyTypeId: ct.companyTypeId,
            balanceSheetdate: new Date(ct.balanceSheetdate),
            cbeCustomerCode: ct.cbeCustomerCode,
            smeClientCodeId: ct.smeClientCodeId,
            isActive: ct?.isActive,
          });
        });
    }
  }

  addOrEditClientCentralBankInfo() {
    const clientParamQP = this.route.snapshot.queryParamMap.get('clientId');

    console.log('💥 addClientCentralBankInfo() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addClientCentralBankInfoForm.valid);
    console.log('  form touched:', this.addClientCentralBankInfoForm.touched);
    console.log(
      '  form raw value:',
      this.addClientCentralBankInfoForm.getRawValue()
    );

    if (this.addClientCentralBankInfoForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addClientCentralBankInfoForm.markAllAsTouched();
      return;
    }

    this.addClientCentralBankInfoForm.patchValue({
      clientId: clientParamQP,
    });

    const {
      clientId,
      capital,
      iScoreSectore,
      companyTypeId,
      balanceSheetdate,
      cbeCustomerCode,
      smeClientCodeId,
      isActive,
    } = this.addClientCentralBankInfoForm.value;
    const payload: Partial<ClientCentralBankInfo> = {
      clientId,
      capital,
      iScoreSectore,
      companyTypeId,
      balanceSheetdate,
      cbeCustomerCode,
      smeClientCodeId,
      isActive,
    };
    console.log('  → payload object:', payload);

    const data = this.addClientCentralBankInfoForm
      .value as Partial<ClientCentralBankInfo>;
    console.log('📦 Payload going to facade:', data);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(retrivedId):', routeId);

    // 7) Create vs. update
    if (this.mode === 'add') {
      console.log('➕ Dispatching CREATE');
      this.facade.create(payload);
    } else {
      console.log('✏️ Dispatching UPDATE id=', data.id);
      this.facade.update(data.id!, data);
    }

    if (clientParamQP) {
      console.log('➡️ Navigating back with PATH param:', clientParamQP);
      this.router.navigate([
        '/crm/clients/view-client-central-bank-info',
        clientParamQP,
      ]);
    } else if (clientParamQP) {
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        clientParamQP
      );
      this.router.navigate([
        `/crm/clients/view-client-central-bank-info/${clientParamQP}`,
      ]);
    } else {
      console.error('❌ Cannot navigate back: clientId is missing!');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
