import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { Officer } from '../../../store/officers/officer.model';
import { OfficersFacade } from '../../../store/officers/officers.facade';
import { TeamOfficersFacade } from '../../../store/teams/team-officers/team-officers.facade';
import { Team } from '../../../store/teams/team.model';
import { TeamOfficer } from '../../../store/teams/team-officers/team-officer.model';

@Component({
  selector: 'app-add-team-officer',
  standalone: false,
  templateUrl: './add-team-officer.component.html',
  styleUrl: './add-team-officer.component.scss',
})
export class AddTeamOfficerComponent implements OnInit, OnDestroy {
  // Flags driven by mode
  editMode = false;
  viewOnly = false;

  // Reactive form
  addTeamORGForm!: FormGroup;

  // Lists and IDs
  teams: Team[] = [];
  mode!: 'add' | 'edit' | 'view';
  parentTeamId!: number;
  recordId!: number;
  officers: Officer[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private teamFacade: TeamOfficersFacade,
    private officersFacade: OfficersFacade,
    private router: Router
  ) {}

  ngOnInit() {
    // Read mode and set flags
    this.mode = (this.route.snapshot.queryParamMap.get('mode') as any) ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    // Read IDs
    this.parentTeamId = Number(this.route.snapshot.queryParamMap.get('teamId'));
    if (this.editMode || this.viewOnly) {
      this.recordId = Number(this.route.snapshot.paramMap.get('id'));
      this.teamFacade.loadOne(this.recordId);
    }

    // Build form with teamId
    this.addTeamORGForm = this.fb.group({
      teamId: [null, Validators.required],
      officerId: [null, Validators.required],
      startDate: [null, Validators.required],
    });

    // Load branch dropdown
    this.officersFacade.loadAll();
    this.officersFacade.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe((list) => (this.officers = list));

    this.addTeamORGForm.patchValue({
      teamId: this.parentTeamId,
    });

    // Patch for edit/view mode
    if (this.editMode || this.viewOnly) {
      this.teamFacade.current$
        .pipe(
          filter((rec) => !!rec),
          take(1)
        )
        .subscribe((rec) => {
          console.log('red', rec);
          console.log(this.route.snapshot.queryParamMap.get('teamId'));
          this.addTeamORGForm.patchValue({
            id: rec.id,
            teamId: this.parentTeamId,
            officerId: rec.officerId,
            startDate: new Date(rec.startDate),
          });
        });
    }
  }

  addOrEditTeamOfficer() {
    // 1) Log the full ActivatedRoute snapshot
    console.log('🛣️ Route snapshot:', this.route.snapshot);

    // 2) Extract both paramMap and queryParamMap in parallel
    const teamIdParam = this.route.snapshot.queryParamMap.get('teamId');

    console.log(`🔍 QueryParams → teamId = ${teamIdParam}`);

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
    if (this.addTeamORGForm.invalid) {
      this.addTeamORGForm.markAllAsTouched();
      return;
    }

    // 6) The actual payload
    const data = this.addTeamORGForm.value as Partial<TeamOfficer>;

    if (this.mode === 'add') {
      this.teamFacade.create(data);
    } else {
      const formValue = this.addTeamORGForm.value;

      const updateData: TeamOfficer = {
        id: this.recordId,
        teamId: formValue.teamId,
        officerId: formValue.officerId,
        startDate: formValue.startDate,
      };

      console.log(
        '🔄 Dispatching UPDATE id=',
        this.recordId,
        ' UPDATED payload=',
        updateData
      );

      this.teamFacade.update(this.recordId, updateData);
    }

    // 8) Navigate back: try both query-param and path-param approaches
    if (teamIdParam) {
      console.log('➡️ Navigating back with PATH param:', teamIdParam);
      this.router.navigate(['/organizations/view-team-officers', teamIdParam]);
    } else if (teamIdParam) {
      console.log('➡️ Navigating back with QUERY param fallback:', teamIdParam);
      this.router.navigate([
        `/organizations/view-team-officers/${teamIdParam}`,
      ]);
    } else {
      console.error('❌ Cannot navigate back: teamId is missing!');
    }
    if (this.addTeamORGForm.valid) {
      this.addTeamORGForm.markAsPristine();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addTeamORGForm.dirty;
  }
}
