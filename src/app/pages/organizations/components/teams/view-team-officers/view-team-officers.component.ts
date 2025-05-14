
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficersFacade } from '../../../store/officers/officers.facade';
import { Store } from '@ngrx/store';
import { Officer } from '../../../store/officers/officer.model';
import { selectOfficers } from '../../../store/officers/officers.selectors';
import { TeamOfficersFacade } from '../../../store/teams/team-officers/team-officers.facade';
import { TeamOfficer } from '../../../store/teams/team-officers/team-officer.model';


@Component({
    selector: 'app-view-team-officers',
  standalone: false,
  templateUrl: './view-team-officers.component.html',
  styleUrl: './view-team-officers.component.scss',
})
export class ViewTeamOfficersComponent implements OnInit, OnDestroy {
  tableDataInside: TeamOfficer[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();
  teamIdParam!: any;

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'officerName', header: 'Member' },
    { field: 'startDate', header: 'Start Date' },
    { field: 'isCurrent', header: 'Is Current' },
  ];

  showDeleteModal = false;
  selectedTeamOfficerId: number | null = null;
  originalTeamOfficers: TeamOfficer[] = [];
  filteredTeamOfficers: TeamOfficer[] = [];
  teamOfficers$!: Observable<TeamOfficer[]>;
  officersList$!: Observable<Officer[]>;

  constructor(
    private router: Router,
    private facade: TeamOfficersFacade,
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
    this.teamOfficers$ = this.facade.items$;

    this.facade.loadTeamOfficersByTeamId(this.teamIdParam);

    combineLatest([this.teamOfficers$, this.officersList$])
      .pipe(
        map(([teamOfficers, officers]) =>
          teamOfficers
            .map((gov) => ({
  ...gov,
  officerName : gov.officer?.name || '—',
}))
            .sort((a, b) => b.id - a.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalTeamOfficers = enriched;
        this.filteredTeamOfficers = [...enriched];
      });
  }

  onAddTeamOfficer() {
    const teamIdParam = this.route.snapshot.paramMap.get('teamId');

    this.router.navigate(['/organizations/add-team-officer'], {
      queryParams: { mode: 'add', teamId: teamIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteTeamOfficer(teamOfficersId: number): void {
    console.log(
      '[View] onDeleteTeamOfficer() – opening modal for id=',
      teamOfficersId
    );
    this.selectedTeamOfficerId = teamOfficersId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.selectedTeamOfficerId != null) {
      this.facade.delete(this.selectedTeamOfficerId, this.teamIdParam);
    }
    this.resetDeleteModal();
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedTeamOfficerId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredTeamOfficers = this.originalTeamOfficers.filter(
      (branchManager) =>
        Object.values(branchManager).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditTeamOfficer(branchManager: TeamOfficer) {
    console.log('edioyt', this.teamIdParam);
    this.router.navigate(
      ['/organizations/edit-team-officer', branchManager.id],
      {
        queryParams: {
          mode: 'edit',
          teamId: this.teamIdParam, // <-- use "teamId" here
        },
      }
    );
  }

  onViewTeamOfficer(branchManager: TeamOfficer) {
    this.router.navigate(
      ['/organizations/edit-team-officer', branchManager.id],
      {
        queryParams: {
          mode: 'view',
          teamId: this.teamIdParam, // <-- and here
        },
      }
    );
  }
}
