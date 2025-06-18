import { Router } from '@angular/router';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Team } from '../../../store/teams/team.model';
import { TeamsFacade } from '../../../store/teams/teams.facade';
import { DepartmentsFacade } from '../../../store/departments/departments.facade';
import { Component, ViewChild } from '@angular/core';
import { combineLatest, forkJoin, map, of, Subject, takeUntil } from 'rxjs';
import { selectDepartments } from '../../../store/departments/departments.selectors';

@Component({
  selector: 'app-view-teams',
  standalone: false,
  templateUrl: './view-teams.component.html',
  styleUrl: './view-teams.component.scss',
})
export class ViewTeamsComponent {
  tableDataInside: Team[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'department', header: 'Department' },
  ];

  showDeleteModal = false;
  selectedTeamId: number | null = null;
  originalTeams: Team[] = [];
  filteredTeams: Team[] = [];
  teams$!: any;
  departments$: any;
  store: any;
  constructor(
    private router: Router,
    private facade: TeamsFacade,
    private departmentFacade: DepartmentsFacade
  ) {}

  ngOnInit() {
    // Initialize observable
    this.departmentFacade.loadAll();
    this.departments$ = this.departmentFacade.items$;

    // Trigger loading
    this.facade.loadAll();
    this.teams$ = this.facade.all$;

    // Combine fee types with their corresponding calculation type names
    combineLatest<[Team[], any[]]>([
      this.teams$ ?? of([]),
      this.departments$ ?? of([]),
    ])
      .pipe(
        map(([teams, departments]) => {
          console.log('📦 Raw teams:', teams);
          console.log('📦 Raw departments:', departments);

          return teams
            .map((ss) => {
              console.log('ss', ss);
              const match = departments.find((s) => s.id === ss.departmentId);

              console.log(
                `🔍 Matching calc type for team ID ${ss.id} (departmentId: ${ss.departmentId}):`,
                match
              );

              return {
                ...ss,
                department:
                  departments.find((s) => s.id === ss.departmentId)?.name ||
                  '—',
              };
            })
            .filter((ft) => ft.isActive)
            .sort((a, b) => b.id - a.id);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        console.log('result', result);
        this.filteredTeams = result;
        this.originalTeams = result;
      });
  }

  onAddTeam() {
    this.router.navigate(['/organizations/add-team']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteTeam(teamsId: number): void {
    this.selectedIds = [teamsId];
    this.showDeleteModal = true;
  }

  onAddSide(teamId: any) {
    this.router.navigate(['/organizations/wizard-teams', teamId]);
  }

  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) => this.facade.delete(id));

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
    this.teams$ = this.facade.all$;
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
    this.selectedTeamId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredTeams = this.originalTeams.filter((teams) =>
      Object.values(teams).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditTeam(teams: Team) {
    this.router.navigate(['/organizations/edit-team', teams.id], {
      queryParams: { mode: 'edit' },
    });
  }

  onViewTeam(teams: Team) {
    this.router.navigate(['/organizations/edit-team', teams.id], {
      queryParams: { mode: 'view' },
    });
  }
}
