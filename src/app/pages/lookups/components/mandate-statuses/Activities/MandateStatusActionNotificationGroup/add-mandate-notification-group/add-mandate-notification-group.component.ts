import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, filter } from 'rxjs';
import { loadOfficers } from '../../../../../../organizations/store/officers/officers.actions';
import { NotificationGroup } from '../../../../../store/notification-groups/notification-groups.model';
import { selectAllNotificationGroups } from '../../../../../store/notification-groups/notification-groups.selectors';
import { loadAll as loadNotificationGroups } from '../../../../../store/notification-groups/notification-groups.actions';
import { MandateActionNotificationGroupsFacade } from '../../../../../store/mandate-statuses-actions-activities/MandateStatusActionNotificationGroup/action-notification-groups.facade';
import { MandateActionNotificationGroup } from '../../../../../store/mandate-statuses-actions-activities/MandateStatusActionNotificationGroup/action-notification-group.model';

@Component({
  selector: 'app-add-mandate-notification-group',
  standalone: false,
  templateUrl: './add-mandate-notification-group.component.html',
  styleUrl: './add-mandate-notification-group.component.scss',
})
export class AddMandateActionNotificationGroupsComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addActionNotificationGroupsLookupsForm!: FormGroup;
  retrivedId: any;
  notificationGroupsList$!: Observable<NotificationGroup[]>;
  mandateStatusActionId: any;
  recordId!: number;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: MandateActionNotificationGroupsFacade,
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

    this.addActionNotificationGroupsLookupsForm = this.fb.group({
      id: [null],
      mandateStatusActionId: [null, [Validators.required]],
      notificationGroupId: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      isActive: [true],
    });
    console.log(
      '🛠️ Form initialized with defaults:',
      this.addActionNotificationGroupsLookupsForm.value
    );
    // 2️⃣ Dispatch actions to load lookup data
    console.log('🚀 Dispatching lookup loads');
    this.store.dispatch(loadNotificationGroups({}));

    this.notificationGroupsList$ = this.store.select(
      selectAllNotificationGroups
    );

    // Patch for add mode
    if (this.mode === 'add') {
      this.addActionNotificationGroupsLookupsForm.patchValue({
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
          this.addActionNotificationGroupsLookupsForm.patchValue({
            id: ct?.id,
            mandateStatusActionId: this.mandateStatusActionId,
            notificationGroupId: ct?.notificationGroupId,
            startDate: new Date(ct?.startDate),
            isActive: ct?.isActive,
          });
        });
    }
  }

  addOrEditMandateActionNotificationGroups() {
    const mandateParamQP = this.route.snapshot.queryParamMap.get(
      'mandateStatusActionId'
    );

    console.log('💥 addActionNotificationGroups() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log(
      '  form valid:',
      this.addActionNotificationGroupsLookupsForm.valid
    );
    console.log(
      '  form touched:',
      this.addActionNotificationGroupsLookupsForm.touched
    );
    console.log(
      '  form raw value:',
      this.addActionNotificationGroupsLookupsForm.getRawValue()
    );

    if (this.addActionNotificationGroupsLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addActionNotificationGroupsLookupsForm.markAllAsTouched();
      return;
    }

    this.addActionNotificationGroupsLookupsForm.patchValue({
      mandateStatusActionId: mandateParamQP,
    });

    const { notificationGroupId, mandateStatusActionId, startDate, isActive } =
      this.addActionNotificationGroupsLookupsForm.value;
    const payload: Partial<MandateActionNotificationGroup> = {
      notificationGroupId,
      mandateStatusActionId,
      startDate,
      isActive,
    };
    console.log('  → payload object:', payload);

    const data = this.addActionNotificationGroupsLookupsForm
      .value as Partial<MandateActionNotificationGroup>;
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
        '/lookups/view-mandate-action-notificationGroups',
        mandateParamQP,
      ]);
    } else if (mandateParamQP) {
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        mandateParamQP
      );
      this.router.navigate([
        `/lookups/view-mandate-action-notificationGroups/${mandateParamQP}`,
      ]);
    } else {
      console.error(
        '❌ Cannot navigate back: mandateStatusActionId is missing!'
      );
    }
    if (this.addActionNotificationGroupsLookupsForm.valid) {
      this.addActionNotificationGroupsLookupsForm.markAsPristine();
    }

    // console.log('🧭 Navigating away to view-mandate-addresses');
    // this.router.navigate(['/organizations/view-mandate-addresses']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addActionNotificationGroupsLookupsForm.dirty;
  }
}
