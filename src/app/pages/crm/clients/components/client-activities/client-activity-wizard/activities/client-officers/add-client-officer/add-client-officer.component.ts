import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, filter } from 'rxjs';
import { loadOfficers } from '../../../../../../../../organizations/store/officers/officers.actions';
import { selectOfficers } from '../../../../../../../../organizations/store/officers/officers.selectors';
import { ClientOfficer } from '../../../../../../store/client-officers/client-officer.model';
import { ClientOfficersFacade } from '../../../../../../store/client-officers/client-officers.facade';
import { Officer } from '../../../../../../../../organizations/store/officers/officer.model';
import { loadAll as LoadClientOfficerTypes} from '../../../../../../../../lookups/store/client-officer-types/client-officer-types.actions';
import { ClientOfficerType } from '../../../../../../../../lookups/store/client-officer-types/client-officer-type.model';
import { selectAllClientOfficerTypes } from '../../../../../../../../lookups/store/client-officer-types/client-officer-types.selectors';

@Component({
  selector: 'app-add-client-officer',
  standalone: false,
  templateUrl: './add-client-officer.component.html',
  styleUrl: './add-client-officer.component.scss',
})
export class AddClientOfficersComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addClientOfficersLookupsForm!: FormGroup;
  retrivedId: any;
  officersList$!: Observable<Officer[]>;
  clientOfficerTypesList$!: Observable<ClientOfficerType[]>;
  clientId: any;
  recordId!: number;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientOfficersFacade,
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

    this.addClientOfficersLookupsForm = this.fb.group({
      id: [null],
       detailes: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      detailesAR: [
        '',
        [Validators.required, , Validators.pattern(/^[\u0600-\u06FF\s]+$/)],
      ],
      clientId: [null, [Validators.required]],
      officerId: [null, [Validators.required]],
      clientOfficerTypeId: [null, [Validators.required]],
      isActive: [true],
      isMain: [true],
    });
    console.log(
      '🛠️ Form initialized with defaults:',
      this.addClientOfficersLookupsForm.value
    );
    // 2️⃣ Dispatch actions to load lookup data
    console.log('🚀 Dispatching lookup loads');
    this.store.dispatch(loadOfficers());
    this.store.dispatch(LoadClientOfficerTypes({}));

    this.officersList$ = this.store.select(selectOfficers);
    this.clientOfficerTypesList$ = this.store.select(selectAllClientOfficerTypes);

    // Patch for add mode
    if (this.mode === 'add') {
      this.addClientOfficersLookupsForm.patchValue({
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
          this.addClientOfficersLookupsForm.patchValue({
            id: ct?.id,
            detailes: ct?.detailes,
            detailesAR:ct?.detailesAR,
            clientId: this.clientId,
            officerId: ct?.officerId,
            clientOfficerTypeId: ct?.clientOfficerTypeId,
            isActive: ct?.isActive,
            isMain: ct?.isMain
          });
        });
    }
  }

  addOrEditClientOfficers() {
    const clientParamQP = this.route.snapshot.queryParamMap.get('clientId');

    console.log('💥 addClientOfficers() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addClientOfficersLookupsForm.valid);
    console.log(
      '  form touched:',
      this.addClientOfficersLookupsForm.touched
    );
    console.log(
      '  form raw value:',
      this.addClientOfficersLookupsForm.getRawValue()
    );

    if (this.addClientOfficersLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addClientOfficersLookupsForm.markAllAsTouched();
      return;
    }

    this.addClientOfficersLookupsForm.patchValue({
      clientId: clientParamQP,
    });

    const {detailes, detailesAR,isMain,clientOfficerTypeId,officerId, clientId, isActive } =
      this.addClientOfficersLookupsForm.value;
    const payload: Partial<ClientOfficer> = {
      detailes,
      detailesAR,
      clientOfficerTypeId,
      officerId,
      clientId,
      isActive,
      isMain
    };
    console.log('  → payload object:', payload);

    const data = this.addClientOfficersLookupsForm
      .value as Partial<ClientOfficer>;
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
        '/crm/clients/view-client-officers',
        clientParamQP,
      ]);
    } else if (clientParamQP) {
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        clientParamQP
      );
      this.router.navigate([
        `/crm/clients/view-client-officers/${clientParamQP}`,
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
