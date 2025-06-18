import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  combineLatest,
  forkJoin,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
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
    // 1) grab and validate the param
    const raw = this.route.snapshot.paramMap.get('teamId');
    this.teamIdParam = raw !== null ? Number(raw) : undefined;
    console.log(
      '[ViewTeamOfficers] ngOnInit → teamIdParam =',
      this.teamIdParam
    );

    if (this.teamIdParam == null || isNaN(this.teamIdParam)) {
      console.error(
        '❌ Missing or invalid teamIdParam! Cannot load team officers.'
      );
      return;
    }

    // 2) kick off loads
    console.log('[ViewTeamOfficers] loading all officers from store');
    this.officersList$ = this.store.select(selectOfficers);
    this.officersFacade.loadAll();

    console.log(
      '[ViewTeamOfficers] loading team officers for teamId',
      this.teamIdParam
    );
    this.facade.loadTeamOfficersByTeamId(this.teamIdParam);
    this.teamOfficers$ = this.facade.items$;

    combineLatest([
      // 1) tap the raw wrapper
      this.teamOfficers$.pipe(
        tap((raw) => console.log('[teamOfficers wrapper]', raw)),
        // 2) pluck the items array
        map((raw) => {
          if (typeof raw === 'string') {
            console.warn('expected', raw);
            return [] as TeamOfficer[];
          }
          if (Array.isArray(raw)) {
            return raw;
          }
          if ('items' in raw && Array.isArray((raw as any).items)) {
            return (raw as any).items;
          }
          console.error('unexpected', raw);
          return [] as TeamOfficer[];
        })
      ),
      // 3) tap the officers list
      this.officersList$.pipe(
        tap((list) => console.log('[officersList]', list))
      ),
    ])
      .pipe(
        // 4) now both are arrays
        tap(([teamOfficersArr, officersArr]) =>
          console.log('[combineLatest] arrays →', {
            teamOfficersArr,
            officersArr,
          })
        ),

        // 5) enrich and sort
        map(([teamOfficersArr, officersArr]) =>
          teamOfficersArr
            .map((gov: { officerId: number }) => ({
              ...gov,
              officerName:
                officersArr.find((o) => o.id === gov.officerId)?.name || '-',
            }))
            .sort((a: { id: number }, b: { id: number }) => b.id - a.id)
        ),

        // 6) final log before subscribe
        tap((enriched) =>
          console.log('[after map+sort] enrichedTeamOfficers →', enriched)
        ),

        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        console.log('[subscribe] writing to component state', enriched);
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
    this.teamOfficers$ = this.facade.items$;
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
    this.selectedTeamOfficerId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredTeamOfficers = this.originalTeamOfficers.filter(
      (teamOfficer) =>
        Object.values(teamOfficer).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditTeamOfficer(teamOfficer: TeamOfficer) {
    console.log('edioyt', this.teamIdParam);
    this.router.navigate(['/organizations/edit-team-officer', teamOfficer.id], {
      queryParams: {
        mode: 'edit',
        teamId: this.teamIdParam, // <-- use "teamId" here
      },
    });
  }

  onViewTeamOfficer(teamOfficer: TeamOfficer) {
    this.router.navigate(['/organizations/edit-team-officer', teamOfficer.id], {
      queryParams: {
        mode: 'view',
        teamId: this.teamIdParam, // <-- and here
      },
    });
  }
}
