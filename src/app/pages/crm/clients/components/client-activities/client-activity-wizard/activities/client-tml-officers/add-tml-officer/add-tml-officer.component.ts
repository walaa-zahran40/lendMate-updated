import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, filter, of } from 'rxjs';
import { TmlOfficerType } from '../../../../../../../../lookups/store/tml-officer-types/tml-officer-type.model';
import { selectAllTmlOfficerTypes } from '../../../../../../../../lookups/store/tml-officer-types/tml-officer-types.selectors';
import { loadOfficers } from '../../../../../../../../organizations/store/officers/officers.actions';
import { selectOfficers } from '../../../../../../../../organizations/store/officers/officers.selectors';
import { ClientTMLOfficer } from '../../../../../../store/client-tml-officers/client-tml-officer.model';
import { ClientTMLOfficersFacade } from '../../../../../../store/client-tml-officers/client-tml-officers.facade';
import { loadAll as loadAllTMLOfficerTypes } from '../../../../../../../../lookups/store/tml-officer-types/tml-officer-types.actions';
import { Officer } from '../../../../../../../../organizations/store/officers/officer.model';

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
    const bundle = this.route.snapshot.data['bundle'] as {
      mode: 'add' | 'edit' | 'view';
      record?: ClientTMLOfficer;
      officers: Officer[];
      tmlOfficerTypes: TmlOfficerType[];
      clientIdFromQP?: number;
    };

    this.mode = bundle.mode;
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    this.clientId =
      bundle.clientIdFromQP ??
      Number(this.route.snapshot.paramMap.get('clientId'));

    this.addClientTMLOfficersLookupsForm = this.fb.group({
      id: [null],
      clientId: [null, [Validators.required]],
      officerId: [null, [Validators.required]],
      tmlOfficerTypeId: [null, [Validators.required]],
      isActive: [true],
    });

    // expose lookups to template (async pipe)
    this.officersList$ = of(bundle.officers);
    this.tmlOfficerTypesList$ = of(bundle.tmlOfficerTypes);

    if (this.mode === 'add') {
      this.addClientTMLOfficersLookupsForm.patchValue({
        clientId: this.clientId,
      });
    } else if (bundle.record) {
      const r = bundle.record;
      this.retrivedId = r.id;
      this.addClientTMLOfficersLookupsForm.patchValue({
        id: r.id,
        clientId: this.clientId,
        officerId: r.officerId,
        tmlOfficerTypeId: r.tmlOfficerTypeId,
        isActive: r.isActive ?? true,
      });
      if (this.viewOnly) this.addClientTMLOfficersLookupsForm.disable();
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
    if (this.addClientTMLOfficersLookupsForm.valid) {
      this.addClientTMLOfficersLookupsForm.markAsPristine();
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
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addClientTMLOfficersLookupsForm.dirty;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
