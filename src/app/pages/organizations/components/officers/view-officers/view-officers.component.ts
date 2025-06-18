import { TableComponent } from '../../../../../shared/components/table/table.component';
import { forkJoin, Observable, Subject, takeUntil } from 'rxjs';
import { Officer } from '../../../store/officers/officer.model';
import { OfficersFacade } from '../../../store/officers/officers.facade';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-officers',
  standalone: false,
  templateUrl: './view-officers.component.html',
  styleUrl: './view-officers.component.scss',
})
export class ViewOfficersComponent {
  tableDataInside: Officer[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'title', header: 'Title' },
    { field: 'titleAr', header: 'Title AR' },
    { field: 'phoneNumber', header: 'Phone Number' },
  ];

  showDeleteModal = false;
  selectedOfficerId: number | null = null;
  originalOfficers: Officer[] = [];
  filteredOfficers: Officer[] = [];
  officers$!: Observable<Officer[]>;

  constructor(private router: Router, private facade: OfficersFacade) {}

  ngOnInit() {
    console.log('🟢 ngOnInit: start loading officers');
    this.facade.loadAll();
    this.officers$ = this.facade.items$;

    this.officers$.pipe(takeUntil(this.destroy$)).subscribe((officers) => {
      const sorted = [...officers].sort((a, b) => b.id - a.id);
      console.log('🟢 sorted officers:', sorted);
      this.originalOfficers = sorted;
      this.filteredOfficers = [...sorted];
    });
  }

  onAddOfficer() {
    this.router.navigate(['organizations/add-officer']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteOfficer(officerId: number): void {
    console.log('[View] onDeleteOfficer() – opening modal for id=', officerId);
    this.selectedOfficerId = officerId;
    this.showDeleteModal = true;
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
    this.officers$ = this.facade.items$;
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
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedOfficerId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredOfficers = this.originalOfficers.filter((officer) =>
      Object.values(officer).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditOfficer(officer: Officer) {
    this.router.navigate(['/organizations/edit-officer', officer.id], {
      queryParams: { mode: 'edit' },
    });
  }

  onViewOfficer(officer: Officer) {
    this.router.navigate(['/organizations/edit-officer', officer.id], {
      queryParams: { mode: 'view' },
    });
  }
}
