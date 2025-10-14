import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { CompanyType } from '../../../../../../../../lookups/store/company-types/company-type.model';
import { SMEClientCode } from '../../../../../../../../lookups/store/sme-client-codes/sme-client-code.model';
import { ClientCentralBankInfoFacade } from '../../../../../../store/client-central-bank-info/client-central-banks.facade';
import { ClientCentralBankInfo } from '../../../../../../store/client-central-bank-info/client-central-bank.model';
import { ClientCentralBankInfoBundle } from '../../../../../../../resolvers/client-central-bank-info-bundle.resolver';

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
  smeClientCodes: Array<{
    id: number;
    name: string;
    nameAR: string;
    lowerLimit: number;
    upperLimit: number;
    isActive: boolean;
  }> = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientCentralBankInfoFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    const bundle = this.route.snapshot.data['bundle'] as
      | ClientCentralBankInfoBundle
      | undefined;
    console.log('🧩 bundle:', bundle);

    // Mode
    this.mode =
      bundle?.mode ??
      ((this.route.snapshot.queryParamMap.get('mode') as any) || 'add');
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    // Client id
    this.clientId =
      bundle?.clientIdFromQP ??
      Number(this.route.snapshot.paramMap.get('clientId'));

    // Form
    this.addClientCentralBankInfoForm = this.fb.group({
      id: [null],
      clientId: [null, Validators.required],
      companyTypeId: [null, Validators.required],
      smeClientCodeId: [null, Validators.required],
      cbeCustomerCode: [null, Validators.required],
      balanceSheetdate: [null, Validators.required],
      iScoreSectore: [null, Validators.required],
      capital: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      isActive: [true],
    });

    // Lookups (from resolver)
    this.companyTypesList$ = of(bundle?.companyTypes ?? []);
    const mappedCodes = (bundle?.smeClientCodes ?? []).map((code: any) => ({
      id: code.id,
      name: code.name,
      nameAR: code.nameAR ?? '',
      lowerLimit: code.lowerLimit ?? 0,
      upperLimit: code.upperLimit ?? 0,
      isActive: code.isActive ?? true,
    }));
    this.smeClientCodesList$ = of(mappedCodes);
    this.smeClientCodes = mappedCodes;

    // Capital validators wiring
    this.addClientCentralBankInfoForm
      .get('smeClientCodeId')!
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((id) => this.applyCapitalRangeValidators(id));
    this.applyCapitalRangeValidators(
      this.addClientCentralBankInfoForm.get('smeClientCodeId')!.value
    );

    // Patch add
    if (this.mode === 'add') {
      this.addClientCentralBankInfoForm.patchValue({ clientId: this.clientId });
    }

    // Patch edit/view from resolver if available
    if ((this.editMode || this.viewOnly) && bundle?.record) {
      this.patchFromRecord(bundle.record);
    }

    // ✅ Fallback: if edit/view and bundle.record is missing, load via facade and patch
    if ((this.editMode || this.viewOnly) && !bundle?.record) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      console.warn('⚠️ bundle.record missing; loading from store by id=', id);
      this.facade.loadOne(id);
      this.facade.current$
        .pipe(
          takeUntil(this.destroy$),
          tap((r) => console.log('store record:', r))
        )
        .subscribe((r) => r && this.patchFromRecord(r));
    }
  }

  private patchFromRecord(r: ClientCentralBankInfo) {
    this.retrivedId = r.id;
    this.addClientCentralBankInfoForm.patchValue({
      id: r.id,
      clientId: this.clientId,
      capital: r.capital,
      iScoreSectore: r.iScoreSectore,
      companyTypeId: r.companyTypeId,
      balanceSheetdate: r.balanceSheetdate
        ? new Date(r.balanceSheetdate)
        : null,
      cbeCustomerCode: r.cbeCustomerCode,
      smeClientCodeId: r.smeClientCodeId,
      isActive: r.isActive ?? true,
    });

    // Re-apply range validators after patch
    this.applyCapitalRangeValidators(
      this.addClientCentralBankInfoForm.get('smeClientCodeId')!.value
    );

    // Toggle capital enablement after we have the smeClientCodeId
    const capitalCtrl = this.addClientCentralBankInfoForm.get('capital')!;
    const idVal =
      this.addClientCentralBankInfoForm.get('smeClientCodeId')!.value;
    idVal
      ? capitalCtrl.enable({ emitEvent: false })
      : capitalCtrl.disable({ emitEvent: false });

    if (this.viewOnly)
      this.addClientCentralBankInfoForm.disable({ emitEvent: false });
  }
  private applyCapitalRangeValidators(
    selectedCodeId: number | null | undefined
  ): void {
    const capitalCtrl = this.addClientCentralBankInfoForm.get('capital');
    if (!capitalCtrl) return;

    // always keep required + numeric
    const base = [Validators.required, Validators.pattern(/^[0-9]*$/)];

    if (!selectedCodeId) {
      capitalCtrl.setValidators(base);
      capitalCtrl.updateValueAndValidity({ emitEvent: false });
      return;
    }

    const code = this.smeClientCodes.find(
      (c) => c.id === Number(selectedCodeId)
    );
    if (code) {
      capitalCtrl.setValidators([
        ...base,
        Validators.min(code.lowerLimit),
        Validators.max(code.upperLimit),
      ]);
    } else {
      capitalCtrl.setValidators(base);
    }
    capitalCtrl.updateValueAndValidity({ emitEvent: false });
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
    // 🔐 Extra safety: enforce capital within selected SME code limits
    const code = this.smeClientCodes.find(
      (c) => c.id === Number(smeClientCodeId)
    );
    if (code) {
      const cap = Number(capital);
      if (isFinite(cap) && (cap < code.lowerLimit || cap > code.upperLimit)) {
        this.addClientCentralBankInfoForm
          .get('capital')!
          .setErrors({ range: true });
        this.addClientCentralBankInfoForm.markAllAsTouched();
        return;
      }
    }
    const payload: Partial<ClientCentralBankInfo> = {
      clientId,
      capital:
        capital !== null && capital !== undefined ? Number(capital) : capital,
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

    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(retrivedId):', routeId);

    if (this.mode === 'add') {
      console.log('➕ Dispatching CREATE');
      this.facade.create(payload);
    } else {
      console.log('✏️ Dispatching UPDATE id=', data.id);
      this.facade.update(data.id!, data);
    }
    if (this.addClientCentralBankInfoForm.valid) {
      this.addClientCentralBankInfoForm.markAsPristine();
    }

    if (clientParamQP) {
      console.log('➡️ Navigating back with PATH param:', clientParamQP);
      this.router.navigate([
        '/crm/clients/view-client-central-bank-info',
        clientParamQP,
      ]);
    } else {
      console.error('❌ Cannot navigate back: clientId is missing!');
    }
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addClientCentralBankInfoForm.dirty;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
