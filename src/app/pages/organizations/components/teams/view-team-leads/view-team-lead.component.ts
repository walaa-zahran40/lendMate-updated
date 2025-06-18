import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TeamLead } from '../../../../../shared/interfaces/team-lead.interface';
import { TeamLeadOfficer } from '../../../store/teams/team-lead-officers/team-lead-officer.model';
import {
  combineLatest,
  forkJoin,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { TeamLeadOfficersFacade } from '../../../store/teams/team-lead-officers/team-lead-officers.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficersFacade } from '../../../store/officers/officers.facade';
import { Store } from '@ngrx/store';
import { Officer } from '../../../store/officers/officer.model';
import { selectOfficers } from '../../../store/officers/officers.selectors';

@Component({
  selector: 'app-view-team-lead',
  standalone: false,
  templateUrl: './view-team-lead.component.html',
  styleUrl: './view-team-lead.component.scss',
})
export class ViewTeamLeadComponent implements OnInit, OnDestroy {
  tableDataInside: TeamLeadOfficer[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();
  teamIdParam!: any;

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'managerName', header: 'Manager' },
    { field: 'startDate', header: 'Start Date' },
    { field: 'isCurrent', header: 'Is Current' },
  ];

  showDeleteModal = false;
  selectedTeamLeadOfficerId: number | null = null;
  originalTeamLeadOfficers: TeamLeadOfficer[] = [];
  filteredTeamLeadOfficers: TeamLeadOfficer[] = [];
  teamLeadOfficers$!: Observable<TeamLeadOfficer[]>;
  officersList$!: Observable<Officer[]>;

  constructor(
    private router: Router,
    private facade: TeamLeadOfficersFacade,
    private route: ActivatedRoute,
    private officersFacade: OfficersFacade,
    private store: Store
  ) {}

  ngOnInit() {
    // 1) grab the param
    const raw = this.route.snapshot.paramMap.get('teamId');
    this.teamIdParam = raw !== null ? Number(raw) : undefined;
    console.log('[View] ngOnInit → teamIdParam =', this.teamIdParam);

    if (this.teamIdParam == null || isNaN(this.teamIdParam)) {
      console.error(
        '❌ Missing or invalid teamIdParam! Cannot load exchange rates.'
      );
      return;
    }
    this.officersList$ = this.store.select(selectOfficers);
    this.officersFacade.loadAll();
    this.teamLeadOfficers$ = this.facade.items$;

    this.facade.loadTeamLeadOfficersByTeamId(this.teamIdParam);

    combineLatest([this.teamLeadOfficers$, this.officersList$])
      .pipe(
        map(([teamLeadOfficers, officers]) =>
          teamLeadOfficers
            .map((gov) => ({
              ...gov,
              managerName: gov.officer?.name || '—',
            }))
            .sort((a, b) => b.id - a.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalTeamLeadOfficers = enriched;
        this.filteredTeamLeadOfficers = [...enriched];
      });
  }

  onAddTeamLeadOfficer() {
    const teamIdParam = this.route.snapshot.paramMap.get('teamId');

    this.router.navigate(['/organizations/add-team-lead-officer'], {
      queryParams: { mode: 'add', teamId: teamIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteTeamLeadOfficer(teamLeadOfficersId: number): void {
    console.log(
      '[View] onDeleteTeamLeadOfficer() – opening modal for id=',
      teamLeadOfficersId
    );
    this.selectedIds = [teamLeadOfficersId];
    this.showDeleteModal = true;
  }

  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) =>
      this.facade.delete(id, this.teamIdParam)
    );

    forkJoin(deleteCalls).subscribe({
      next: () => {
        this.selectedIds = [];
        this.showDeleteModal = false; // CLOSE MODAL HERE
        this.refreshCalls();
      },
      error: (err) => {
        this.showDeleteModal = false; // STILL CLOSE IT
      },
    });
  }

  refreshCalls() {
    this.facade.loadAll();
    this.teamLeadOfficers$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedTeamLeadOfficerId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredTeamLeadOfficers = this.originalTeamLeadOfficers.filter(
      (branchManager) =>
        Object.values(branchManager).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditTeamLeadOfficer(branchManager: TeamLeadOfficer) {
    console.log('edioyt', this.teamIdParam);
    this.router.navigate(
      ['/organizations/edit-team-lead-officer', branchManager.id],
      {
        queryParams: {
          mode: 'edit',
          teamId: this.teamIdParam, // <-- use "teamId" here
        },
      }
    );
  }

  onViewTeamLeadOfficer(branchManager: TeamLeadOfficer) {
    this.router.navigate(
      ['/organizations/edit-team-lead-officer', branchManager.id],
      {
        queryParams: {
          mode: 'view',
          teamId: this.teamIdParam, // <-- and here
        },
      }
    );
  }
}
