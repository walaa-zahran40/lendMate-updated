import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, forkJoin, filter, take, takeUntil } from 'rxjs';
import { ClientCRAuthorityOfficesFacade } from '../../../store/client-cr-authority-office/client-cr-authority-office.facade';
import { ClientCRAuthorityOffice } from '../../../store/client-cr-authority-office/client-cr-authority-office.model';
import { AuthorityOffice } from '../../../../../lookups/store/authority-offices/authority-office.model';
import { loadAll as loadAllAuthorityOffice} from '../../../../../lookups/store/authority-offices/authority-offices.actions';
import { selectAllAuthorityOffices } from '../../../../../lookups/store/authority-offices/authority-offices.selectors';

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

    this.addClientCRAuthorityOfficesLookupsForm = this.fb.group({
      id: [null],
      clientId: [null, [Validators.required]],
      crAuthorityOfficeId: [null, [Validators.required]],
      expiryDate: [null, [Validators.required]],
      crNumber: [null, [Validators.required]],
      isActive: [true],
    });
    console.log(
      '🛠️ Form initialized with defaults:',
      this.addClientCRAuthorityOfficesLookupsForm.value
    );
    // 2️⃣ Dispatch actions to load lookup data
    console.log('🚀 Dispatching lookup loads');
    this.store.dispatch(loadAllAuthorityOffice({}));

    this.authorityOfficesList$ = this.store.select(selectAllAuthorityOffices);

     // Patch for add mode
       if (this.mode === 'add') {
        this.addClientCRAuthorityOfficesLookupsForm.patchValue({
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
            this.addClientCRAuthorityOfficesLookupsForm.patchValue({
            id: ct?.id,
            clientId: this.clientId,
            expiryDate: new Date(ct.expiryDate),
            crAuthorityOfficeId : ct.crAuthorityOfficeId,
            crNumber: ct.crNumber,
            isActive: ct?.isActive,
            });
          });
      }
  }


  addOrEditClientCRAuthorityOffices() {
    const clientParamQP = this.route.snapshot.queryParamMap.get('clientId');

    console.log('💥 addClientCRAuthorityOffices() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addClientCRAuthorityOfficesLookupsForm.valid);
    console.log('  form touched:', this.addClientCRAuthorityOfficesLookupsForm.touched);
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
    // console.log('🧭 Navigating away to view-client-addresses');
    // this.router.navigate(['/organizations/view-client-addresses']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}