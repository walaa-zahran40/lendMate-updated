import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable,
  filter,
  take,
  combineLatest,
  takeUntil,
  Subject,
} from 'rxjs';
import { selectClientStatuses } from '../../../store/client-statuses/client-statuses.selectors';
import { ClientStatus } from '../../../store/client-statuses/client-status.model';
import { WorkflowActionType } from '../../../store/workflow-action-types/workflow-action-type.model';
import { loadClientStatuses } from '../../../store/client-statuses/client-statuses.actions';
import { loadAll as loadWorkFlowActionTypes } from '../../../store/workflow-action-types/workflow-action-types.actions';
import { selectAllWorkflowActionTypes } from '../../../store/workflow-action-types/workflow-action-types.selectors';
import { ClientStatusActionsFacade } from '../../../store/client-statuses-actions/client-status-actions.facade';
import { ClientStatusAction } from '../../../store/client-statuses-actions/client-status-action.model';

@Component({
  selector: 'app-add-client-status-actions',
  standalone: false,
  templateUrl: './add-client-status-actions.component.html',
  styleUrl: './add-client-status-actions.component.scss',
})
export class AddClientStatusActionsComponent {
  editMode: boolean = false;
  viewOnly = false;
  addClientStatusActionsLookupsForm!: FormGroup;
  clientId: any;
  statusList$!: Observable<ClientStatus[]>;
  workflowActionTypeList$!: Observable<WorkflowActionType[]>;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientStatusActionsFacade,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    console.log('rrr', this.route.snapshot);
    // 1️⃣ Always dispatch the lookup load
    this.store.dispatch(loadClientStatuses());
    this.store.dispatch(loadWorkFlowActionTypes({}));
    // 2️⃣ Initialize the select‐options observable
    this.statusList$ = this.store.select(selectClientStatuses);
    this.workflowActionTypeList$ = this.store.select(
      selectAllWorkflowActionTypes
    );
    // 3️⃣ Build the reactive form
    this.addClientStatusActionsLookupsForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      nameAR: [
        '',
        [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)],
      ],
      statusInId: [null, Validators.required],
      statusOutId: [null, Validators.required],
      workflowActionTypeId: [null, Validators.required],
      isActive: [true],
    });

    // 4️⃣ Read the :id param to enter edit mode (or remain in add mode)
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const idParam = params.get('id');
      this.editMode = !!idParam;
      this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';

      if (this.viewOnly) {
        this.addClientStatusActionsLookupsForm.disable();
      }

      if (this.editMode) {
        // dispatch loadById
        this.clientId = +idParam!;
        this.facade.loadById(this.clientId);

        // 5️⃣ Wait for BOTH the record and the lookup list before patching
        combineLatest([
          this.facade.selected$.pipe(
            filter((ct) => !!ct && ct.id === this.clientId),
            take(1)
          ),
          this.statusList$.pipe(
            filter((list) => list.length > 0),
            take(1)
          ),
        ])
          .pipe(takeUntil(this.destroy$))
          .subscribe(([ct]) => {
            this.addClientStatusActionsLookupsForm.patchValue({
              id: ct?.id,
              name: ct?.name,
              nameAR: ct?.nameAR,
              statusInId: ct?.statusInId,
              statusOutId: ct?.statusOutId,
              workflowActionTypeId: ct?.workflowActionTypeId,
              isActive: ct?.isActive,
            });
            console.log(
              '🔵 Form after patchValue:',
              this.addClientStatusActionsLookupsForm.value
            );
          });
      }
    });
  }

  addOrEditClientStatusActions() {
    console.log('💥 addOrEditClientStatusActions() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addClientStatusActionsLookupsForm.valid);
    console.log(
      '  form touched:',
      this.addClientStatusActionsLookupsForm.touched
    );
    console.log(
      '  form raw value:',
      this.addClientStatusActionsLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addClientStatusActionsLookupsForm.get('name');
    const nameARCtrl = this.addClientStatusActionsLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addClientStatusActionsLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addClientStatusActionsLookupsForm.markAllAsTouched();
      return;
    }

    const {
      name,
      nameAR,
      statusInId,
      statusOutId,
      workflowActionTypeId,
      isActive,
    } = this.addClientStatusActionsLookupsForm.value;
    const payload: Partial<ClientStatusAction> = {
      name,
      nameAR,
      statusInId,
      statusOutId,
      workflowActionTypeId,
      isActive,
    };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const {
        id,
        name,
        nameAR,
        isActive,
        statusInId,
        statusOutId,
        workflowActionTypeId,
      } = this.addClientStatusActionsLookupsForm.value;
      const payload: ClientStatusAction = {
        id,
        name,
        nameAR,
        statusInId,
        statusOutId,
        workflowActionTypeId,
        isActive,
      };
      console.log(
        '🔄 Dispatching UPDATE id=',
        this.clientId,
        ' payload=',
        payload
      );
      this.facade.update(id, payload);
    } else {
      console.log('➕ Dispatching CREATE payload=', payload);
      this.facade.create(payload);
    }
    if (this.addClientStatusActionsLookupsForm.valid) {
      this.addClientStatusActionsLookupsForm.markAsPristine();
    }

    console.log('🧭 Navigating away to view-actions');

    this.router.navigate(['/lookups/view-client-status-actions']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addClientStatusActionsLookupsForm.dirty;
  }
}
