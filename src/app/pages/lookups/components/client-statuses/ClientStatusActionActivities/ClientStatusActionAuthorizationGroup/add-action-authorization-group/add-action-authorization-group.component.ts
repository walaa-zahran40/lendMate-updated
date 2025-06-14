import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, filter } from 'rxjs';
import { loadOfficers } from '../../../../../../organizations/store/officers/officers.actions';
import { AuthorizationGroup } from '../../../../../store/authorization-groups/authorization-groups.model';
import { ActionAuthorizationGroup } from '../../../../../store/client-statuses-actions-activities/ClientStatusActionAuthorizationGroup/action-authorization-group.model';
import { ActionAuthorizationGroupsFacade } from '../../../../../store/client-statuses-actions-activities/ClientStatusActionAuthorizationGroup/action-authorization-groups.facade';
import { selectAllAuthorizationGroups } from '../../../../../store/authorization-groups/authorization-groups.selectors';
import { loadAll as loadAuthorizationGroups } from '../../../../../store/authorization-groups/authorization-groups.actions';

@Component({
  selector: 'app-add-action-authorization-group',
  standalone: false,
  templateUrl: './add-action-authorization-group.component.html',
  styleUrl: './add-action-authorization-group.component.scss',
})
export class AddActionAuthorizationGroupsComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addActionAuthorizationGroupsLookupsForm!: FormGroup;
  retrivedId: any;
  authorizationGroupsList$!: Observable<AuthorizationGroup[]>;
  clientStatusActionId: any;
  recordId!: number;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ActionAuthorizationGroupsFacade,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    console.log('🟢 ngOnInit start');
    // 1️⃣ Read route parameters
    console.log(this.route.snapshot, 'route');
    this.clientStatusActionId = Number(
      this.route.snapshot.queryParams['clientStatusActionId']
    );

    this.mode =
      (this.route.snapshot.queryParamMap.get('mode') as
        | 'add'
        | 'edit'
        | 'view') ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';
    console.log('🔍 Params:', {
      clientStatusActionId: this.clientStatusActionId,
      mode: this.mode,
      editMode: this.editMode,
      viewOnly: this.viewOnly,
    });

    this.addActionAuthorizationGroupsLookupsForm = this.fb.group({
      id: [null],
      clientStatusActionId: [null, [Validators.required]],
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
        clientStatusActionId: this.clientStatusActionId,
      });
      console.log(
        '✏️ Add mode → patched clientStatusActionId:',
        this.clientStatusActionId
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
            clientStatusActionId: this.clientStatusActionId,
            authorizationGroupId: ct?.authorizationGroupId,
            startDate: new Date(ct?.startDate),
            isActive: ct?.isActive,
          });
        });
    }
  }

  addOrEditActionAuthorizationGroups() {
    const clientParamQP = this.route.snapshot.queryParamMap.get(
      'clientStatusActionId'
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
      clientStatusActionId: clientParamQP,
    });

    const { authorizationGroupId, clientStatusActionId, startDate, isActive } =
      this.addActionAuthorizationGroupsLookupsForm.value;
    const payload: Partial<ActionAuthorizationGroup> = {
      authorizationGroupId,
      clientStatusActionId,
      startDate,
      isActive,
    };
    console.log('  → payload object:', payload);

    const data = this.addActionAuthorizationGroupsLookupsForm
      .value as Partial<ActionAuthorizationGroup>;
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
        '/lookups/view-action-authorizationGroups',
        clientParamQP,
      ]);
    } else if (clientParamQP) {
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        clientParamQP
      );
      this.router.navigate([
        `/lookups/view-action-authorizationGroups/${clientParamQP}`,
      ]);
    } else {
      console.error(
        '❌ Cannot navigate back: clientStatusActionId is missing!'
      );
    }
    if (this.addActionAuthorizationGroupsLookupsForm.valid) {
      this.addActionAuthorizationGroupsLookupsForm.markAsPristine();
    }
    // console.log('🧭 Navigating away to view-client-addresses');
    // this.router.navigate(['/organizations/view-client-addresses']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addActionAuthorizationGroupsLookupsForm.dirty;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
