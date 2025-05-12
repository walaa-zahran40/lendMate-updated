import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { Branch } from '../../../store/branches/branch.model';
import { BranchesFacade } from '../../../store/branches/branches.facade';
import { Officer } from '../../../store/officers/officer.model';
import { OfficersFacade } from '../../../store/officers/officers.facade';
import { BranchOfficersFacade } from '../../../store/branch-officers/branch-officers.facade';
import { BranchOfficer } from '../../../store/branch-officers/branch-officer.model';

@Component({
  selector: 'app-add-branch-officers',
  standalone: false,
  templateUrl: './add-branch-officers.component.html',
  styleUrl: './add-branch-officers.component.scss',
})
export class AddBranchOfficersComponent implements OnInit, OnDestroy {
  // Flags driven by mode
  editMode = false;
  viewOnly = false;

  // Reactive form
  addBranchOfficerForm!: FormGroup;

  // Lists and IDs
  branches: Branch[] = [];
  mode!: 'add' | 'edit' | 'view';
  parentBranchId!: number;
  recordId!: number;
  officers:Officer[]=[];

  private destroy$ = new Subject<void>();
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private branchOfficerFacade: BranchOfficersFacade,
    private officersFacade: OfficersFacade,
    private branchFacade: BranchesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    // Read mode and set flags
    this.mode = (this.route.snapshot.queryParamMap.get('mode') as any) ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    // Read IDs
    this.parentBranchId = Number(
      this.route.snapshot.queryParamMap.get('branchId')
    );
    if (this.editMode || this.viewOnly) {
      this.recordId = Number(this.route.snapshot.paramMap.get('id'));
      this.branchOfficerFacade.loadOne(this.recordId);
    }

    // Build form with branchId
    this.addBranchOfficerForm = this.fb.group({
      id: [null],
      branchId: [null, Validators.required],
      officerId: [null, Validators.required],
      isCurrent: [true],
    });

    // Load officer dropdown
    this.officersFacade.loadAll();
    this.officersFacade.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe((list) => (this.officers = list));

    // Patch for add mode
    if (this.mode === 'add') {
      this.addBranchOfficerForm.patchValue({
        branchId: this.parentBranchId,
      });
    }

    // Patch for edit/view mode
    if (this.editMode || this.viewOnly) {
      this.branchOfficerFacade.current$
        .pipe(
          takeUntil(this.destroy$),
          filter((rec) => !!rec)
        )
        .subscribe((rec) => {
          console.log('red', rec);
          this.addBranchOfficerForm.patchValue({
            id: rec.id,
            branchId: this.parentBranchId,
            officerId: rec.officerId,
            isCurrent: rec!.isCurrent,
          });
        });
    }
  }

  addOrEditBranchOfficer() {
    // 1) Log the full ActivatedRoute snapshot
    console.log('🛣️ Route snapshot:', this.route.snapshot);

    // 2) Extract both paramMap and queryParamMap in parallel
    const idParam = this.route.snapshot.paramMap.get('id');
    const branchParamQP = this.route.snapshot.queryParamMap.get('branchId');

    console.log(`🔍 QueryParams → branchId = ${branchParamQP}`);

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
    if (this.addBranchOfficerForm.invalid) {
      console.warn('❌ Form is invalid → marking all touched');
      this.addBranchOfficerForm.markAllAsTouched();
      return;
    }

    // 6) The actual payload
    const data = this.addBranchOfficerForm
      .value as Partial<BranchOfficer>;
    console.log('📦 Payload going to facade:', data);

    // 7) Create vs. update
    if (this.mode === 'add') {
      console.log('➕ Dispatching CREATE');
      this.branchOfficerFacade.create(data);
    } else {
      console.log('✏️ Dispatching UPDATE id=', data.id);
      this.branchOfficerFacade.update(data.id!, data);
    }

    // 8) Navigate back: try both query-param and path-param approaches
    if (branchParamQP) {
      console.log('➡️ Navigating back with PATH param:', branchParamQP);
      this.router.navigate([
        '/organizations/view-branch-officers',
        branchParamQP,
      ]);
    } else if (branchParamQP) {
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        branchParamQP
      );
      this.router.navigate([
        `/organizations/view-branch-officers/${branchParamQP}`,
      ]);
    } else {
      console.error('❌ Cannot navigate back: branchId is missing!');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
