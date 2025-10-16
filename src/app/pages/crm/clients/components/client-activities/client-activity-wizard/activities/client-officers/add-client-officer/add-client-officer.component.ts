import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, filter, of } from 'rxjs';
import { loadOfficers } from '../../../../../../../../organizations/store/officers/officers.actions';
import { selectOfficers } from '../../../../../../../../organizations/store/officers/officers.selectors';
import { ClientOfficer } from '../../../../../../store/client-officers/client-officer.model';
import { ClientOfficersFacade } from '../../../../../../store/client-officers/client-officers.facade';
import { Officer } from '../../../../../../../../organizations/store/officers/officer.model';
import { loadAll as LoadClientOfficerTypes } from '../../../../../../../../lookups/store/client-officer-types/client-officer-types.actions';
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
    const bundle = this.route.snapshot.data['bundle'] as {
      mode: 'add' | 'edit' | 'view';
      record?: ClientOfficer;
      officers: Officer[];
      clientOfficerTypes: ClientOfficerType[];
      clientIdFromQP?: number;
    };

    this.mode = bundle.mode;
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    this.clientId =
      bundle.clientIdFromQP ??
      Number(this.route.snapshot.paramMap.get('clientId'));

    this.addClientOfficersLookupsForm = this.fb.group({
      id: [null],
      detailes: ['', [Validators.required]],
      // 🔧 fix stray comma & keep Arabic pattern
      detailesAR: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\u0600-\u06FF\s0-9\u0660-\u0669]+$/),
        ],
      ],
      clientId: [null, [Validators.required]],
      officerId: [null, [Validators.required]],
      clientOfficerTypeId: [null, [Validators.required]],
      isActive: [true],
      isMain: [true],
    });

    // expose resolver lookups to template
    this.officersList$ = of(bundle.officers);
    this.clientOfficerTypesList$ = of(bundle.clientOfficerTypes);

    if (this.mode === 'add') {
      this.addClientOfficersLookupsForm.patchValue({ clientId: this.clientId });
    } else if (bundle.record) {
      const r = bundle.record;
      this.retrivedId = r.id;
      this.addClientOfficersLookupsForm.patchValue({
        id: r.id,
        detailes: r.detailes ?? '',
        detailesAR: r.detailesAR ?? '',
        clientId: this.clientId,
        officerId: r.officerId,
        clientOfficerTypeId: r.clientOfficerTypeId,
        isActive: r.isActive ?? true,
        isMain: r.isMain ?? true,
      });
      if (this.viewOnly) this.addClientOfficersLookupsForm.disable();
    }
  }

  addOrEditClientOfficers() {
    const clientParamQP = this.route.snapshot.queryParamMap.get('clientId');

    console.log('💥 addClientOfficers() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addClientOfficersLookupsForm.valid);
    console.log('  form touched:', this.addClientOfficersLookupsForm.touched);
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

    const {
      detailes,
      detailesAR,
      isMain,
      clientOfficerTypeId,
      officerId,
      clientId,
      isActive,
    } = this.addClientOfficersLookupsForm.value;
    const payload: Partial<ClientOfficer> = {
      detailes,
      detailesAR,
      clientOfficerTypeId,
      officerId,
      clientId,
      isActive,
      isMain,
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

    if (this.addClientOfficersLookupsForm.valid) {
      this.addClientOfficersLookupsForm.markAsPristine();
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
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addClientOfficersLookupsForm.dirty;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
