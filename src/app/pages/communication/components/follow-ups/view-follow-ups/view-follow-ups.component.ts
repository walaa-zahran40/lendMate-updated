import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Subject,
  Observable,
  combineLatest,
  of,
  map,
  takeUntil,
  forkJoin,
} from 'rxjs';
import { Followup } from '../../../store/followups/followup.model';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { FollowupsFacade } from '../../../store/followups/followups.facade';

@Component({
  selector: 'app-view-follow-ups',
  standalone: false,
  templateUrl: './view-follow-ups.component.html',
  styleUrl: './view-follow-ups.component.scss',
})
export class ViewFollowupsComponent implements OnInit, OnDestroy {
  tableDataInside: Followup[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();
  communicationIdParam!: any;

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'topic', header: 'Topic' },
    { field: 'details', header: 'Details' },
    { field: 'date', header: 'Date' },
  ];

  showDeleteModal = false;
  selectedFollowupId: number | null = null;
  originalFollowups: Followup[] = [];
  filteredFollowups: Followup[] = [];

  followups$!: Observable<Followup[]>;

  constructor(
    private router: Router,
    private facade: FollowupsFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // 1) grab the param
    console.log('rrr', this.route.snapshot);
    const raw = this.route.snapshot.params['communicationId'];
    this.communicationIdParam = raw !== null ? Number(raw) : undefined;
    console.log(
      '[View] ngOnInit → communicationIdParam =',
      this.communicationIdParam
    );

    this.facade.loadByCommunicationId(this.communicationIdParam);
    this.followups$ = this.facade.items$;

    if (this.communicationIdParam == null || isNaN(this.communicationIdParam)) {
      console.error(
        '❌ Missing or invalid communicationIdParam! Cannot load exchange rates.'
      );
      return;
    }

    combineLatest([this.followups$ ?? of([])])
      .pipe(
        map(([followups]) => {
          console.log('📦 Raw followups:', followups);

          return followups; //.sort((a) => a.id);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        console.log('✅ Final result:', result);
        this.filteredFollowups = result;
        this.originalFollowups = result;
      });
  }

  onAddFollowup() {
    console.log('edioyt', this.communicationIdParam);
    const communicationId = this.route.snapshot.paramMap.get('communicationId');
    const routeId = this.route.snapshot.paramMap.get('id');

    console.log(`route : ${routeId}`);
    this.router.navigate(['communication/add-follow-ups/', communicationId], {
      queryParams: {
        mode: 'add',
        communicationId: this.communicationIdParam, // <-- use "communicationId" here
      },
    });
  }

  //   private selectedFollowupFromTable(): Followup | null {
  //   if (!this.selectedFollowup) {
  //     console.error('❌ No followup selected for wizard view.');
  //     return null;
  //   }
  //   return this.selectedFollowup;
  // }

  onAddSide(followupId: any) {
    const communicationId = this.route.snapshot.paramMap.get('communicationId');
    console.log('arwaaa', followupId);
    const routeId = this.route.snapshot.paramMap.get('id');
    this.router.navigate([
      '/communication/wizard-followups',
      followupId,
      communicationId,
    ]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteFollowup(clientPhoneNumberId: number): void {
    console.log(
      '[View] onDeleteFollowup() – opening modal for id=',
      clientPhoneNumberId
    );
    this.selectedIds = [clientPhoneNumberId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedFollowupId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredFollowups = this.originalFollowups.filter((clientSales) =>
      Object.values(clientSales).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditFollowup(followup: Followup) {
    this.router.navigate(
      ['communication/edit-follow-ups', followup.id, followup.communicationId],
      {
        queryParams: {
          mode: 'edit',
        },
      }
    );
  }

  onViewFollowup(followup: Followup) {
    console.log('route', this.route.snapshot);
    this.router.navigate(
      ['communication/edit-follow-ups', followup.id, followup.communicationId],
      {
        queryParams: {
          mode: 'view',
          communicationId: this.communicationIdParam, // <-- and here
        },
      }
    );
  }
  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) =>
      this.facade.delete(id, this.communicationIdParam)
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
    this.followups$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
