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
import { MandateStatus } from '../../../store/mandate-statuses/mandate-statuses/mandate-status.model';
import { WorkflowActionType } from '../../../store/workflow-action-types/workflow-action-type.model';
import { loadMandateStatuses } from '../../../store/mandate-statuses/mandate-statuses/mandate-statuses.actions';
import { loadAll as loadWorkFlowActionTypes } from '../../../store/workflow-action-types/workflow-action-types.actions';
import { selectAllWorkflowActionTypes } from '../../../store/workflow-action-types/workflow-action-types.selectors';
import { MandateStatusActionsFacade } from '../../../store/mandate-statuses/mandate-statuses-actions/mandate-status-actions.facade';
import { MandateStatusAction } from '../../../store/mandate-statuses/mandate-statuses-actions/mandate-status-action.model';
import { selectMandateStatuses } from '../../../store/mandate-statuses/mandate-statuses/mandate-statuses.selectors';

@Component({
  selector: 'app-add-mandate-status-actions',
  standalone: false,
  templateUrl: './add-mandate-status-actions.component.html',
  styleUrl: './add-mandate-status-actions.component.scss',
})
export class AddMandateStatusActionsComponent {
  editMode: boolean = false;
  viewOnly = false;
  addMandateStatusActionsLookupsForm!: FormGroup;
  mandateId: any;
  statusList$!: Observable<MandateStatus[]>;
  workflowActionTypeList$!: Observable<WorkflowActionType[]>;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: MandateStatusActionsFacade,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    console.log('rrr', this.route.snapshot);
    // 1️⃣ Always dispatch the lookup load
    this.store.dispatch(loadMandateStatuses());
    this.store.dispatch(loadWorkFlowActionTypes({}));
    // 2️⃣ Initialize the select‐options observable
    this.statusList$ = this.store.select(selectMandateStatuses);
    this.workflowActionTypeList$ = this.store.select(
      selectAllWorkflowActionTypes
    );
    // 3️⃣ Build the reactive form
    this.addMandateStatusActionsLookupsForm = this.fb.group({
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
        this.addMandateStatusActionsLookupsForm.disable();
      }

      if (this.editMode) {
        // dispatch loadById
        this.mandateId = +idParam!;
        this.facade.loadById(this.mandateId);

        // 5️⃣ Wait for BOTH the record and the lookup list before patching
        combineLatest([
          this.facade.selected$.pipe(
            filter((ct) => !!ct && ct.id === this.mandateId),
            take(1)
          ),
          this.statusList$.pipe(
            filter((list) => list.length > 0),
            take(1)
          ),
        ])
          .pipe(takeUntil(this.destroy$))
          .subscribe(([ct]) => {
            this.addMandateStatusActionsLookupsForm.patchValue({
              id: ct?.id,
              name: ct?.name,
              nameAR: ct?.nameAR,
              statusInId: ct?.statusInId ?? ct?.statusIn.id,
              statusOutId: ct?.statusOutId?? ct?.statusOut.id,
              workflowActionTypeId: ct?.workflowActionTypeId?? ct?.workflowActionType.id,
            });
            console.log(
              '🔵 Form after patchValue:',
              this.addMandateStatusActionsLookupsForm.value
            );
          });
      }
    });
  }

  addOrEditMandateStatusActions() {
    console.log('💥 addOrEditMandateStatusActions() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addMandateStatusActionsLookupsForm.valid);
    console.log(
      '  form touched:',
      this.addMandateStatusActionsLookupsForm.touched
    );
    console.log(
      '  form raw value:',
      this.addMandateStatusActionsLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addMandateStatusActionsLookupsForm.get('name');
    const nameARCtrl = this.addMandateStatusActionsLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addMandateStatusActionsLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addMandateStatusActionsLookupsForm.markAllAsTouched();
      return;
    }

    const {
      name,
      nameAR,
      statusInId,
      statusOutId,
      workflowActionTypeId,
      isActive,
    } = this.addMandateStatusActionsLookupsForm.value;
    const payload: Partial<MandateStatusAction> = {
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
    console.log('  route.snapshot.paramMap.get(mandateId):', routeId);

    if (this.editMode) {
      const {
        id,
        name,
        nameAR,
        isActive,
        statusInId,
        statusOutId,
        workflowActionTypeId,
      } = this.addMandateStatusActionsLookupsForm.value;
      const payload: MandateStatusAction = {
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
        this.mandateId,
        ' payload=',
        payload
      );
      this.facade.update(id, payload);
    } else {
      console.log('➕ Dispatching CREATE payload=', payload);
      this.facade.create(payload);
    }

    console.log('🧭 Navigating away to view-actions');

    this.router.navigate(['/lookups/view-mandate-status-actions']);
  }
}
