import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { Officer } from '../../../store/officers/officer.model';
import { OfficersFacade } from '../../../store/officers/officers.facade';
import { DepartmentManager } from '../../../store/department-managers/department-manager.model';
import { DepartmentManagersFacade } from '../../../store/department-managers/department-managers.facade';
import { Department } from '../../../store/departments/department.model';
import { DepartmentsFacade } from '../../../store/departments/departments.facade';

@Component({
  selector: 'app-add-department-manager',
  standalone: false,
  templateUrl: './add-department-manager.component.html',
  styleUrl: './add-department-manager.component.scss',
})
export class AddDepartmentManagerComponent implements OnInit, OnDestroy {
  // Flags driven by mode
  editMode = false;
  viewOnly = false;

  // Reactive form
  addDepartmentManagerForm!: FormGroup;

  // Lists and IDs
  departmentes: Department[] = [];
  mode!: 'add' | 'edit' | 'view';
  parentDepartmentId!: number;
  recordId!: number;
  officers: Officer[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private exchangeFacade: DepartmentManagersFacade,
    private officersFacade: OfficersFacade,
    private departmentFacade: DepartmentsFacade,
    private router: Router
  ) {}

  ngOnInit() {
    // Read mode and set flags
    this.mode = (this.route.snapshot.queryParamMap.get('mode') as any) ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    // Read IDs
    this.parentDepartmentId = Number(
      this.route.snapshot.queryParamMap.get('departmentId')
    );
    if (this.editMode || this.viewOnly) {
      this.recordId = Number(this.route.snapshot.paramMap.get('id'));
      this.exchangeFacade.loadOne(this.recordId);
    }

    // Build form with departmentId
    this.addDepartmentManagerForm = this.fb.group({
      id: [null],
      departmentId: [null, Validators.required],
      officerId: [null, Validators.required],
      startDate: [null, Validators.required],
      isCurrent: [true],
    });
    if (this.editMode) {
      console.log('ttt', this.editMode);
      this.addDepartmentManagerForm.get('officerId')?.disable();
    }
    // Load department dropdown
    this.officersFacade.loadAll();
    this.officersFacade.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe((list) => (this.officers = list));

    // Patch for add mode
    if (this.mode === 'add') {
      this.addDepartmentManagerForm.patchValue({
        departmentId: this.parentDepartmentId,
      });
    }

    // Patch for edit/view mode
    if (this.editMode || this.viewOnly) {
      this.exchangeFacade.current$
        .pipe(
          takeUntil(this.destroy$),
          filter((rec) => !!rec)
        )
        .subscribe((rec) => {
          console.log('red', rec);
          this.addDepartmentManagerForm.patchValue({
            id: rec.id,
            departmentId: this.parentDepartmentId,
            officerId: rec.officerId,
            startDate: new Date(rec.startDate),
            isCurrent: rec!.isCurrent,
          });
        });
    }
  }

  addOrEditDepartmentManager() {
    // 1) Log the full ActivatedRoute snapshot
    console.log('🛣️ Route snapshot:', this.route.snapshot);

    // 2) Extract both paramMap and queryParamMap in parallel
    const idParam = this.route.snapshot.paramMap.get('id');
    const departmentParamQP =
      this.route.snapshot.queryParamMap.get('departmentId');

    console.log(`🔍 QueryParams → departmentId = ${departmentParamQP}`);

    // 3) Log the component’s mode flags
    console.log(
      `⚙️ mode = ${this.mode}, editMode = ${this.editMode}, viewOnly = ${this.viewOnly}`
    );

    // 4) Early return in view-only
    if (this.viewOnly) {
      console.warn('🚫 viewOnly mode — aborting submit');
      return;
    }

    // 5) Form validity
    if (this.addDepartmentManagerForm.invalid) {
      console.warn('❌ Form is invalid → marking all touched');
      this.addDepartmentManagerForm.markAllAsTouched();
      return;
    }

    // 6) The actual payload
    const data = this.addDepartmentManagerForm
      .value as Partial<DepartmentManager>;
    console.log('📦 Payload going to facade:', data);

    // 7) Create vs. update
    if (this.mode === 'add') {
      console.log('➕ Dispatching CREATE');
      this.exchangeFacade.create(data);
    } else {
      console.log('✏️ Dispatching UPDATE id=', data.id);
      this.exchangeFacade.update(data.id!, data);
    }

    // 8) Navigate back: try both query-param and path-param approaches
    if (departmentParamQP) {
      console.log('➡️ Navigating back with PATH param:', departmentParamQP);
      this.router.navigate([
        '/organizations/view-department-managers',
        departmentParamQP,
      ]);
    } else if (departmentParamQP) {
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        departmentParamQP
      );
      this.router.navigate([
        `/organizations/view-department-managers/${departmentParamQP}`,
      ]);
    } else {
      console.error('❌ Cannot navigate back: departmentId is missing!');
    }
    if (this.addDepartmentManagerForm.valid) {
      this.addDepartmentManagerForm.markAsPristine();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addDepartmentManagerForm.dirty;
  }
}
