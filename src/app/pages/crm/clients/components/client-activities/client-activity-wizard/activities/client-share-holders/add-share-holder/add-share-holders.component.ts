import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, filter, of } from 'rxjs';
import { Client } from '../../../../../../store/_clients/allclients/client.model';
import { selectAllClients } from '../../../../../../store/_clients/allclients/clients.selectors';
import { loadAll } from '../../../../../../store/client-identity-types/client-identity-types.actions';
import { ClientShareHoldersFacade } from '../../../../../../store/client-share-holders/client-share-holders.facade';
import { ClientShareHolder } from '../../../../../../store/client-share-holders/client-share-holder.model';
import { ClientShareHoldersBundle } from '../../../../../../../resolvers/client-share-holders-bundle.resolver';

@Component({
  selector: 'app-add-share-holders',
  standalone: false,
  templateUrl: './add-share-holders.component.html',
  styleUrl: './add-share-holders.component.scss',
})
export class AddClientShareHoldersComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addClientShareHoldersLookupsForm!: FormGroup;
  retrivedId: any;
  clientsList$!: Observable<Client[]>;
  clientId: any;
  recordId!: number;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientShareHoldersFacade,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    const bundle = this.route.snapshot.data[
      'bundle'
    ] as ClientShareHoldersBundle;

    this.mode = bundle.mode;
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';
    this.clientId =
      bundle.clientIdFromQP ??
      Number(this.route.snapshot.paramMap.get('clientId'));

    this.addClientShareHoldersLookupsForm = this.fb.group({
      id: [null],
      clientId: [null, [Validators.required]],
      shareHolderId: [null, [Validators.required]],
      percentage: [
        null,
        [
          Validators.required,
          Validators.pattern(/^\d+(\.\d{1,2})?$/), // digits with up to 2 decimals
          Validators.min(1),
          Validators.max(100),
        ],
      ],
      isActive: [true],
    });
    // expose lookup list from resolver (no store dance)
    this.clientsList$ = of(bundle.clients);

    if (this.mode === 'add') {
      this.addClientShareHoldersLookupsForm.patchValue({
        clientId: this.clientId,
      });
    } else if (bundle.record) {
      const r = bundle.record;
      this.retrivedId = r.id;
      this.addClientShareHoldersLookupsForm.patchValue({
        id: r.id,
        clientId: this.clientId,
        shareHolderId: r.shareHolderId,
        percentage: r.percentage,
        isActive: r.isActive ?? true,
      });
      if (this.viewOnly) this.addClientShareHoldersLookupsForm.disable();
    }
  }

  addOrEditClientShareHolders() {
    const clientParamQP = this.route.snapshot.queryParamMap.get('clientId');

    console.log('💥 addClientShareHolders() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addClientShareHoldersLookupsForm.valid);
    console.log(
      '  form touched:',
      this.addClientShareHoldersLookupsForm.touched
    );
    console.log(
      '  form raw value:',
      this.addClientShareHoldersLookupsForm.getRawValue()
    );

    if (this.addClientShareHoldersLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addClientShareHoldersLookupsForm.markAllAsTouched();
      return;
    }

    this.addClientShareHoldersLookupsForm.patchValue({
      clientId: clientParamQP,
    });

    const { shareHolderId, percentage, clientId, isActive } =
      this.addClientShareHoldersLookupsForm.value;

    // extra safety guard
    const pct = Number(percentage);
    if (!isFinite(pct) || pct < 0 || pct > 100) {
      this.addClientShareHoldersLookupsForm.get('percentage')!.setErrors({
        ...(this.addClientShareHoldersLookupsForm.get('percentage')!.errors ??
          {}),
        range: true,
      });
      this.addClientShareHoldersLookupsForm.markAllAsTouched();
      return;
    }

    const payload: Partial<ClientShareHolder> = {
      shareHolderId,
      percentage: pct, // coerce to number for API
      clientId,
      isActive,
    };
    console.log('  → payload object:', payload);

    const data = this.addClientShareHoldersLookupsForm
      .value as Partial<ClientShareHolder>;
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
    if (this.addClientShareHoldersLookupsForm.valid) {
      this.addClientShareHoldersLookupsForm.markAsPristine();
    }

    if (clientParamQP) {
      console.log('➡️ Navigating back with PATH param:', clientParamQP);
      this.router.navigate([
        '/crm/clients/view-client-share-holders',
        clientParamQP,
      ]);
    } else if (clientParamQP) {
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        clientParamQP
      );
      this.router.navigate([
        `/crm/clients/view-client-share-holders/${clientParamQP}`,
      ]);
    } else {
      console.error('❌ Cannot navigate back: clientId is missing!');
    }
    // console.log('🧭 Navigating away to view-client-addresses');
    // this.router.navigate(['/organizations/view-client-addresses']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addClientShareHoldersLookupsForm.dirty;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
