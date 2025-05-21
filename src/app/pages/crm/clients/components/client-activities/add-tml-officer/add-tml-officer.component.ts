import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { ClientTMLOfficersFacade } from '../../../store/client-tml-officers/client-tml-officers.facade';
import { ClientTMLOfficer } from '../../../store/client-tml-officers/client-tml-officer.model';
import { loadAll as loadAllTMLOfficerTypes } from '../../../../../lookups/store/tml-officer-types/tml-officer-types.actions';
import { Officer } from '../../../../../organizations/store/officers/officer.model';
import { loadOfficers } from '../../../../../organizations/store/officers/officers.actions';
import { selectOfficers } from '../../../../../organizations/store/officers/officers.selectors';
import { TmlOfficerType } from '../../../../../lookups/store/tml-officer-types/tml-officer-type.model';
import { selectAllTmlOfficerTypes } from '../../../../../lookups/store/tml-officer-types/tml-officer-types.selectors';

@Component({
  selector: 'app-add-tml-officer',
  standalone: false,
  templateUrl: './add-tml-officer.component.html',
  styleUrl: './add-tml-officer.component.scss',
})
export class AddClientTMLOfficersComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addClientTMLOfficersLookupsForm!: FormGroup;
  retrivedId: any;
  officersList$!: Observable<Officer[]>;
  tmlOfficerTypesList$!: Observable<TmlOfficerType[]>;
  clientId: any;
  recordId!: number;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientTMLOfficersFacade,
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

    this.addClientTMLOfficersLookupsForm = this.fb.group({
      id: [null],
      clientId: [null, [Validators.required]],
      officerId: [null, [Validators.required]],
      tmlOfficerTypeId: [null, [Validators.required]],
      isActive: [true],
    });
    console.log(
      '🛠️ Form initialized with defaults:',
      this.addClientTMLOfficersLookupsForm.value
    );
    // 2️⃣ Dispatch actions to load lookup data
    console.log('🚀 Dispatching lookup loads');
    this.store.dispatch(loadOfficers());
    this.store.dispatch(loadAllTMLOfficerTypes({}));

    this.officersList$ = this.store.select(selectOfficers);
    this.tmlOfficerTypesList$ = this.store.select(selectAllTmlOfficerTypes);

    // Patch for add mode
    if (this.mode === 'add') {
      this.addClientTMLOfficersLookupsForm.patchValue({
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
          this.addClientTMLOfficersLookupsForm.patchValue({
            id: ct?.id,
            clientId: this.clientId,
            officerId: ct?.officerId,
            tmlOfficerTypeId: ct?.tmlOfficerTypeId,
            isActive: ct?.isActive,
          });
        });
    }
  }

  addOrEditClientTMLOfficers() {
    const clientParamQP = this.route.snapshot.queryParamMap.get('clientId');

    console.log('💥 addClientTMLOfficers() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addClientTMLOfficersLookupsForm.valid);
    console.log(
      '  form touched:',
      this.addClientTMLOfficersLookupsForm.touched
    );
    console.log(
      '  form raw value:',
      this.addClientTMLOfficersLookupsForm.getRawValue()
    );

    if (this.addClientTMLOfficersLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addClientTMLOfficersLookupsForm.markAllAsTouched();
      return;
    }

    this.addClientTMLOfficersLookupsForm.patchValue({
      clientId: clientParamQP,
    });

    const { tmlOfficerTypeId, officerId, clientId, isActive } =
      this.addClientTMLOfficersLookupsForm.value;
    const payload: Partial<ClientTMLOfficer> = {
      tmlOfficerTypeId,
      officerId,
      clientId,
      isActive,
    };
    console.log('  → payload object:', payload);

    const data = this.addClientTMLOfficersLookupsForm
      .value as Partial<ClientTMLOfficer>;
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
        '/crm/clients/view-client-tml-officers',
        clientParamQP,
      ]);
    } else if (clientParamQP) {
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        clientParamQP
      );
      this.router.navigate([
        `/crm/clients/view-client-tml-officers/${clientParamQP}`,
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
