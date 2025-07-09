import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subject,
  takeUntil,
  filter,
  tap,
  combineLatest,
} from 'rxjs';
import { Client } from '../../../../../../store/_clients/allclients/client.model';
import { selectAllClients } from '../../../../../../store/_clients/allclients/clients.selectors';
import { ClientGuarantor } from '../../../../../../store/client-guarantors/client-guarantor.model';
import { ClientGuarantorsFacade } from '../../../../../../store/client-guarantors/client-guarantors.facade';
import * as clientsActions from '../../../../../../store/_clients/allclients/clients.actions';

@Component({
  selector: 'app-add-client-guarantor',
  standalone: false,
  templateUrl: './add-client-guarantor.component.html',
  styleUrl: './add-client-guarantor.component.scss',
})
export class AddClientGuarantorComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addClientGuarantorsLookupsForm!: FormGroup;
  retrivedId: any;
  clientsList$!: Observable<Client[]>;
  clientId: any;
  recordId!: number;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientGuarantorsFacade,
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

    this.addClientGuarantorsLookupsForm = this.fb.group({
      id: [null],
      clientId: [null],
      guarantorId: [null, [Validators.required]],
      isActive: [true],
    });
    console.log(
      '🛠️ Form initialized with defaults:',
      this.addClientGuarantorsLookupsForm.value
    );
    // 2️⃣ Dispatch actions to load lookup data
    console.log('🚀 Dispatching lookup loads');

    this.clientsList$ = this.store.select(selectAllClients);
    this.store.dispatch(clientsActions.loadAll({})); // ← NEW

    // Patch for add mode
    if (this.mode === 'add') {
      this.addClientGuarantorsLookupsForm.patchValue({
        clientId: this.clientId,
      });
      console.log('✏️ Add mode → patched clientId:', this.clientId);
    }

    // Patch for edit/view mode
    if (this.editMode || this.viewOnly) {
      // ←—— CHANGE paramMap → queryParamMap here
      const rawId = this.route.snapshot.params['id'];
      this.recordId = rawId ? +rawId : 0;
      console.log('📥 Loaded recordId from query params:', this.route.snapshot);

      this.facade.loadOne(this.recordId);

      this.facade.current$
        .pipe(
          filter((rec) => !!rec),
          tap((rec) => console.log('facade.current$ emitted:', rec)),
          takeUntil(this.destroy$)
        )
        .subscribe((rec) => {
          // You can also log here if you want:
          console.log('About to patchValue with:', {
            id: rec.id,
            clientId: this.clientId,
            guarantorId: rec.guarantorId,
            isActive: rec.isActive,
          });
          this.addClientGuarantorsLookupsForm.patchValue({
            id: rec.id,
            clientId: this.clientId,
            guarantorId: rec.guarantorId,
            isActive: rec.isActive,
          });
        });
    }
  }

  addOrEditClientGuarantors() {
    const clientParamQP = this.route.snapshot.queryParamMap.get('clientId');

    console.log('💥 addClientGuarantors() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addClientGuarantorsLookupsForm.valid);
    console.log('  form touched:', this.addClientGuarantorsLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addClientGuarantorsLookupsForm.getRawValue()
    );

    if (this.addClientGuarantorsLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addClientGuarantorsLookupsForm.markAllAsTouched();
      return;
    }

    this.addClientGuarantorsLookupsForm.patchValue({
      clientId: clientParamQP,
    });

    const { guarantorId, clientId, isActive } =
      this.addClientGuarantorsLookupsForm.value;
    const payload: Partial<ClientGuarantor> = {
      guarantorId,
      clientId,
      isActive,
    };
    console.log('  → payload object:', payload);

    const data = this.addClientGuarantorsLookupsForm
      .value as Partial<ClientGuarantor>;
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
    if (this.addClientGuarantorsLookupsForm.valid) {
      this.addClientGuarantorsLookupsForm.markAsPristine();
    }

    if (clientParamQP) {
      console.log('➡️ Navigating back with PATH param:', clientParamQP);
      this.router.navigate([
        '/crm/clients/view-client-guarantors',
        clientParamQP,
      ]);
    } else if (clientParamQP) {
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        clientParamQP
      );
      this.router.navigate([
        `/crm/clients/view-client-guarantors/${clientParamQP}`,
      ]);
    } else {
      console.error('❌ Cannot navigate back: clientId is missing!');
    }
    // console.log('🧭 Navigating away to view-client-addresses');
    // this.router.navigate(['/organizations/view-client-addresses']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addClientGuarantorsLookupsForm.dirty;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
