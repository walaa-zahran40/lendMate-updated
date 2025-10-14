import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, filter, tap, of } from 'rxjs';
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
    this.clientId = Number(this.route.snapshot.queryParamMap.get('clientId'));
    this.mode =
      (this.route.snapshot.queryParamMap.get('mode') as
        | 'add'
        | 'edit'
        | 'view') ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    this.addClientGuarantorsLookupsForm = this.fb.group({
      id: [null],
      clientId: [null],
      guarantorId: [null, [Validators.required]],
      isActive: [true],
    });

    // clients for dropdown
    const clients = this.route.snapshot.data['clients'] as Client[];
    this.clientsList$ = of(clients);

    if (this.viewOnly) this.addClientGuarantorsLookupsForm.disable();

    // add mode → prefill clientId
    if (this.mode === 'add') {
      this.addClientGuarantorsLookupsForm.patchValue({
        clientId: this.clientId,
      });
    }

    // edit/view mode → use resolved guarantor
    const resolved = this.route.snapshot.data[
      'guarantor'
    ] as ClientGuarantor | null;
    if (resolved && (this.editMode || this.viewOnly)) {
      this.recordId = resolved.id;
      this.addClientGuarantorsLookupsForm.patchValue({
        id: resolved.id,
        clientId: this.clientId,
        guarantorId: resolved.guarantorId,
        isActive: resolved.isActive,
      });
    }
  }

  addOrEditClientGuarantors() {
    if (this.viewOnly) return;

    if (this.addClientGuarantorsLookupsForm.invalid) {
      this.addClientGuarantorsLookupsForm.markAllAsTouched();
      return;
    }

    // ensure clientId is set (from QP)
    this.addClientGuarantorsLookupsForm.patchValue({ clientId: this.clientId });

    const data = this.addClientGuarantorsLookupsForm
      .value as Partial<ClientGuarantor>;

    if (this.mode === 'add') {
      this.facade.create(data);
    } else {
      this.facade.update(data.id!, data);
    }

    this.addClientGuarantorsLookupsForm.markAsPristine();

    if (Number.isFinite(this.clientId)) {
      this.router.navigate([
        '/crm/clients/view-client-guarantors',
        this.clientId,
      ]);
    } else {
      console.error('clientId missing; cannot navigate back');
    }
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
