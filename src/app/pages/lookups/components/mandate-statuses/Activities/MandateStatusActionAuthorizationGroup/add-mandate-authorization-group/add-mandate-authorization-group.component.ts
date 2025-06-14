import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, filter } from 'rxjs';
import { loadOfficers } from '../../../../../../organizations/store/officers/officers.actions';
import { AuthorizationGroup } from '../../../../../store/authorization-groups/authorization-groups.model';
import { MandateActionAuthorizationGroup } from '../../../../../store/mandate-statuses-actions-activities/MandateStatusActionAuthorizationGroup/action-authorization-group.model';
import { MandateActionAuthorizationGroupsFacade } from '../../../../../store/mandate-statuses-actions-activities/MandateStatusActionAuthorizationGroup/action-authorization-groups.facade';
import { selectAllAuthorizationGroups } from '../../../../../store/authorization-groups/authorization-groups.selectors';
import { loadAll as loadAuthorizationGroups } from '../../../../../store/authorization-groups/authorization-groups.actions';

@Component({
  selector: 'app-add-mandate-authorization-group',
  standalone: false,
  templateUrl: './add-mandate-authorization-group.component.html',
  styleUrl: './add-mandate-authorization-group.component.scss',
})
export class AddMandateActionAuthorizationGroupsComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addActionAuthorizationGroupsLookupsForm!: FormGroup;
  retrivedId: any;
  authorizationGroupsList$!: Observable<AuthorizationGroup[]>;
  mandateStatusActionId: any;
  recordId!: number;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: MandateActionAuthorizationGroupsFacade,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    console.log('🟢 ngOnInit start');
    // 1️⃣ Read route parameters
    console.log(this.route.snapshot, 'route');
    this.mandateStatusActionId = Number(
      this.route.snapshot.queryParams['mandateStatusActionId']
    );

    this.mode =
      (this.route.snapshot.queryParamMap.get('mode') as
        | 'add'
        | 'edit'
        | 'view') ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';
    console.log('🔍 Params:', {
      mandateStatusActionId: this.mandateStatusActionId,
      mode: this.mode,
      editMode: this.editMode,
      viewOnly: this.viewOnly,
    });

    this.addActionAuthorizationGroupsLookupsForm = this.fb.group({
      id: [null],
      mandateStatusActionId: [null, [Validators.required]],
      authorizationGroupId: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      isActive: [true],
    });
    console.log(
      '🛠️ Form initialized with defaults:',
      this.addActionAuthorizationGroupsLookupsForm.value
    );
    // 2️⃣ Dispatch actions to load lookup data
    console.log('🚀 Dispatching lookup loads');
    this.store.dispatch(loadAuthorizationGroups({}));

    this.authorizationGroupsList$ = this.store.select(
      selectAllAuthorizationGroups
    );

    // Patch for add mode
    if (this.mode === 'add') {
      this.addActionAuthorizationGroupsLookupsForm.patchValue({
        mandateStatusActionId: this.mandateStatusActionId,
      });
      console.log(
        '✏️ Add mode → patched mandateStatusActionId:',
        this.mandateStatusActionId
      );
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
          this.addActionAuthorizationGroupsLookupsForm.patchValue({
            id: ct?.id,
            mandateStatusActionId: this.mandateStatusActionId,
            authorizationGroupId: ct?.authorizationGroupId,
            startDate: new Date(ct?.startDate),
            isActive: ct?.isActive,
          });
        });
    }
  }

  addOrEditMandateActionAuthorizationGroups() {
    const mandateParamQP = this.route.snapshot.queryParamMap.get(
      'mandateStatusActionId'
    );

    console.log('💥 addActionAuthorizationGroups() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log(
      '  form valid:',
      this.addActionAuthorizationGroupsLookupsForm.valid
    );
    console.log(
      '  form touched:',
      this.addActionAuthorizationGroupsLookupsForm.touched
    );
    console.log(
      '  form raw value:',
      this.addActionAuthorizationGroupsLookupsForm.getRawValue()
    );

    if (this.addActionAuthorizationGroupsLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addActionAuthorizationGroupsLookupsForm.markAllAsTouched();
      return;
    }

    this.addActionAuthorizationGroupsLookupsForm.patchValue({
      mandateStatusActionId: mandateParamQP,
    });

    const { authorizationGroupId, mandateStatusActionId, startDate, isActive } =
      this.addActionAuthorizationGroupsLookupsForm.value;
    const payload: Partial<MandateActionAuthorizationGroup> = {
      authorizationGroupId,
      mandateStatusActionId,
      startDate,
      isActive,
    };
    console.log('  → payload object:', payload);

    const data = this.addActionAuthorizationGroupsLookupsForm
      .value as Partial<MandateActionAuthorizationGroup>;
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

    if (mandateParamQP) {
      console.log('➡️ Navigating back with PATH param:', mandateParamQP);
      this.router.navigate([
        '/lookups/view-mandate-action-authorizationGroups',
        mandateParamQP,
      ]);
    } else if (mandateParamQP) {
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        mandateParamQP
      );
      this.router.navigate([
        `/lookups/view-mandate-action-authorizationGroups/${mandateParamQP}`,
      ]);
    } else {
      console.error(
        '❌ Cannot navigate back: mandateStatusActionId is missing!'
      );
    }
    if (this.addActionAuthorizationGroupsLookupsForm.valid) {
      this.addActionAuthorizationGroupsLookupsForm.markAsPristine();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addActionAuthorizationGroupsLookupsForm.dirty;
  }
}
